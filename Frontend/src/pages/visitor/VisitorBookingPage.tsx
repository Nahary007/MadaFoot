import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  CheckCircle,
  ArrowLeft,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import toast from "react-hot-toast";
import { fields } from "../../data/fields";
import { useAuth } from "../../context/AuthContext";

interface BookingState {
  fieldId: string;
  fieldName: string;
  date: string;
  slotId: string;
  price: number;
}

const VisitorBookingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { createVisitorBooking } = useAuth();

  const [bookingData, setBookingData] = useState<BookingState | null>(null);
  const [field, setField] = useState<any>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingId, setBookingId] = useState<string>("");

  // Form data
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // Load booking data from location state
  useEffect(() => {
    const state = location.state as BookingState;

    if (!state || !state.fieldId || !state.date || !state.slotId) {
      navigate("/search");
      return;
    }

    setBookingData(state);

    // Get field details
    const fieldDetails = fields.find((f) => f.id === state.fieldId);
    setField(fieldDetails);

    // Get time slot details
    if (fieldDetails) {
      const availabilityDay = fieldDetails.availability.find(
        (a) => a.date === state.date,
      );
      if (availabilityDay) {
        const slot = availabilityDay.slots.find((s) => s.id === state.slotId);
        setSelectedTimeSlot(slot);
      }
    }

    setLoading(false);
  }, [location.state, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookingData || !customerName || !customerEmail || !customerPhone) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    setProcessing(true);

    try {
      const newBookingId = await createVisitorBooking({
        fieldId: bookingData.fieldId,
        customerName,
        customerEmail,
        customerPhone,
        date: bookingData.date,
        startTime: selectedTimeSlot.startTime,
        endTime: selectedTimeSlot.endTime,
        totalPrice: bookingData.price,
        status: "confirmed",
      });

      setBookingId(newBookingId);
      setBookingComplete(true);
      toast.success("Réservation confirmée !");
    } catch (error) {
      toast.error("Erreur lors de la réservation");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="container-custom py-12 flex justify-center">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="h-40 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    );
  }

  if (!bookingData || !field || !selectedTimeSlot) {
    return (
      <div className="container-custom py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">
          Données de réservation invalides
        </h1>
        <button onClick={() => navigate("/search")} className="btn-primary">
          Rechercher un terrain
        </button>
      </div>
    );
  }

  // Format date
  const reservationDate = new Date(bookingData.date);
  const formattedDate = format(reservationDate, "EEEE d MMMM yyyy", {
    locale: fr,
  });

  if (bookingComplete) {
    return (
      <div className="container-custom max-w-2xl mx-auto py-12">
        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Réservation confirmée !</h1>
          <p className="text-gray-600">
            Votre réservation a été confirmée. Vous recevrez un email de
            confirmation à {customerEmail}.
          </p>
        </div>

        <div className="card p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Détails de la réservation
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Numéro de réservation: {bookingId}
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Terrain</h3>
              <p className="text-lg">{field.name}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date</h3>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-primary-600" />
                  <p>{formattedDate}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Heure</h3>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-primary-600" />
                  <p>
                    {selectedTimeSlot.startTime} - {selectedTimeSlot.endTime}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Contact</h3>
              <p>{customerName}</p>
              <p className="text-sm text-gray-600">{customerEmail}</p>
              <p className="text-sm text-gray-600">{customerPhone}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Montant (payable sur place)
              </h3>
              <p className="text-lg font-semibold text-primary-700">
                {bookingData.price.toLocaleString()} Ar
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <button onClick={() => navigate("/search")} className="btn-primary">
            Réserver un autre terrain
          </button>
          <button onClick={() => navigate("/")} className="btn-secondary">
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-primary-600 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Retour
      </button>

      <h1 className="text-3xl font-bold mb-8">Réserver sans compte</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card p-6 mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-primary-100 text-primary-600 rounded-full mb-4">
              <User className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Réservation rapide</h2>
            <p className="text-gray-600 mb-6">
              Pas besoin de créer un compte ! Entrez simplement vos informations
              et réservez instantanément. Le paiement se fera directement sur le
              terrain.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="card p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Vos informations</h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <User className="w-4 h-4 inline mr-1" />
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="input"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Votre nom complet"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="input"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Vous recevrez une confirmation par email
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <Phone className="w-4 h-4 inline mr-1" />
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="input"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+261 34 123 45 67"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Pour vous contacter si nécessaire
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">
                Informations importantes
              </h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-medium text-yellow-800 mb-2">
                  Paiement sur place
                </h3>
                <p className="text-yellow-700 text-sm">
                  Aucun paiement en ligne requis. Vous paierez directement au
                  propriétaire du terrain le jour de votre réservation.
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full"
              disabled={processing}
            >
              {processing
                ? "Confirmation en cours..."
                : "Confirmer la réservation"}
            </button>
          </form>
        </div>

        {/* Booking Summary */}
        <div>
          <div className="card p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">
              Résumé de la réservation
            </h2>

            <div className="mb-6">
              <img
                src={field.image}
                alt={field.name}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold mb-2">{field.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{field.address}</p>

              <div className="flex items-center text-gray-600 mb-1">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                <span>
                  {selectedTimeSlot.startTime} - {selectedTimeSlot.endTime}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Prix de la réservation</span>
                <span>{bookingData.price.toLocaleString()} Ar</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Frais de service</span>
                <span>0 Ar</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total (payable sur place)</span>
                <span className="text-primary-700">
                  {bookingData.price.toLocaleString()} Ar
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitorBookingPage;
