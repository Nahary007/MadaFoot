import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Clock, CreditCard, CheckCircle, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { fields } from '../data/fields';
import { useAuth } from '../context/AuthContext';

interface BookingState {
  fieldId: string;
  fieldName: string;
  date: string;
  slotId: string;
  price: number;
}

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authState } = useAuth();
  
  const [bookingData, setBookingData] = useState<BookingState | null>(null);
  const [field, setField] = useState<any>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [bookingComplete, setBookingComplete] = useState(false);
  
  // Check if user is authenticated
  useEffect(() => {
    if (!authState.isAuthenticated) {
      navigate('/login', { state: { redirect: '/booking' } });
    }
  }, [authState.isAuthenticated, navigate]);
  
  // Load booking data from location state
  useEffect(() => {
    const state = location.state as BookingState;
    
    if (!state || !state.fieldId || !state.date || !state.slotId) {
      navigate('/search');
      return;
    }
    
    setBookingData(state);
    
    // Get field details
    const fieldDetails = fields.find(f => f.id === state.fieldId);
    setField(fieldDetails);
    
    // Get time slot details
    if (fieldDetails) {
      const availabilityDay = fieldDetails.availability.find(a => a.date === state.date);
      if (availabilityDay) {
        const slot = availabilityDay.slots.find(s => s.id === state.slotId);
        setSelectedTimeSlot(slot);
      }
    }
    
    setLoading(false);
  }, [location.state, navigate]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bookingData) return;
    
    setProcessing(true);
    
    // Simulate API call for booking
    setTimeout(() => {
      setBookingComplete(true);
      setProcessing(false);
    }, 1500);
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
        <h1 className="text-2xl font-bold mb-4">Données de réservation invalides</h1>
        <button
          onClick={() => navigate('/search')}
          className="btn-primary"
        >
          Rechercher un terrain
        </button>
      </div>
    );
  }
  
  // Format date
  const reservationDate = new Date(bookingData.date);
  const formattedDate = format(reservationDate, 'EEEE d MMMM yyyy', { locale: fr });
  
  if (bookingComplete) {
    return (
      <div className="container-custom max-w-2xl mx-auto py-12">
        <div className="text-center mb-8">
          <CheckCircle className="w-16 h-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Réservation confirmée !</h1>
          <p className="text-gray-600">
            Votre réservation a été confirmée. Vous recevrez un email de confirmation.
          </p>
        </div>
        
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Détails de la réservation</h2>
          
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
                  <p>{selectedTimeSlot.startTime} - {selectedTimeSlot.endTime}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Montant payé</h3>
              <p className="text-lg font-semibold text-primary-700">
                {bookingData.price.toLocaleString()} Ar
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-primary"
          >
            Voir mes réservations
          </button>
          <button
            onClick={() => navigate('/')}
            className="btn-secondary"
          >
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
      
      <h1 className="text-3xl font-bold mb-8">Finaliser votre réservation</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            {/* User Information */}
            <div className="card p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Informations personnelles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="input"
                    defaultValue={authState.user?.name || ''}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="input"
                    defaultValue={authState.user?.email || ''}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="input"
                  defaultValue={authState.user?.phone || ''}
                  required
                />
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="card p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Mode de paiement</h2>
              
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                  />
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-gray-500" />
                    <span>Carte bancaire</span>
                  </div>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="mobile"
                    checked={paymentMethod === 'mobile'}
                    onChange={() => setPaymentMethod('mobile')}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                  />
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-gray-500" />
                    <span>Mobile Money</span>
                  </div>
                </label>
              </div>
              
              {paymentMethod === 'card' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Numéro de carte
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        className="input"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Date d'expiration
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          className="input"
                          placeholder="MM/AA"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          className="input"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {paymentMethod === 'mobile' && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Numéro de téléphone
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        className="input"
                        placeholder="+261 34 123 45 67"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={processing}
            >
              {processing ? 'Traitement en cours...' : 'Confirmer et payer'}
            </button>
          </form>
        </div>
        
        {/* Booking Summary */}
        <div>
          <div className="card p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Résumé de la réservation</h2>
            
            <div className="mb-6">
              <h3 className="font-semibold mb-2">{field.name}</h3>
              <div className="flex items-center text-gray-600 mb-1">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                <span>{selectedTimeSlot.startTime} - {selectedTimeSlot.endTime}</span>
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
                <span>Total</span>
                <span className="text-primary-700">{bookingData.price.toLocaleString()} Ar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;