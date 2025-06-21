import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, Calendar, Clock, Coins, Shield, AlertCircle } from 'lucide-react';
import ImageGallery from '../components/ui/ImageGallery';
import Map from '../components/ui/Map';
import TimeSlotPicker from '../components/ui/TimeSlotPicker';
import { fields } from '../data/fields';
import { Field, AvailabilitySlot } from '../types';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const FieldDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { authState } = useAuth();
  
  const [field, setField] = useState<Field | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<AvailabilitySlot | null>(null);
  
  // Fetch field data
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      const foundField = fields.find(f => f.id === id);
      setField(foundField || null);
      
      if (foundField && foundField.availability.length > 0) {
        setSelectedDate(foundField.availability[0].date);
        setAvailableSlots(foundField.availability[0]);
      }
      
      setLoading(false);
    }, 500);
  }, [id]);
  
  // Update available slots when date changes
  useEffect(() => {
    if (field && selectedDate) {
      const slots = field.availability.find(a => a.date === selectedDate);
      setAvailableSlots(slots || null);
      setSelectedSlot(null);
    }
  }, [selectedDate, field]);
  
  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(e.target.value);
  };
  
  const handleBooking = () => {
    if (!authState.isAuthenticated) {
      // Redirect to login if not authenticated
      navigate('/login', { state: { redirect: `/field/${id}` } });
      return;
    }
    
    if (selectedSlot && field) {
      navigate(`/booking`, {
        state: {
          fieldId: field.id,
          fieldName: field.name,
          date: selectedDate,
          slotId: selectedSlot,
          price: field.price
        }
      });
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
  
  if (!field) {
    return (
      <div className="container-custom py-12 text-center">
        <AlertCircle className="w-16 h-16 text-accent-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Terrain non trouvé</h1>
        <p className="text-gray-600 mb-6">
          Le terrain que vous recherchez n'existe pas ou a été supprimé.
        </p>
        <button
          onClick={() => navigate('/search')}
          className="btn-primary"
        >
          Voir tous les terrains
        </button>
      </div>
    );
  }
  
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-4">{field.name}</h1>
      
      <div className="flex items-center mb-6">
        <div className="flex items-center mr-4">
          <MapPin className="w-5 h-5 text-gray-500 mr-1" />
          <span className="text-gray-700">{field.address}, {field.city}</span>
        </div>
        <div className="flex items-center">
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-1" />
          <span className="text-gray-700">{field.rating.toFixed(1)}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Field images */}
          <ImageGallery images={field.images} alt={field.name} />
          
          {/* Field details */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">À propos de ce terrain</h2>
            <p className="text-gray-700 mb-6">{field.description}</p>
            
            <h3 className="text-xl font-semibold mb-3">Équipements</h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {field.amenities.map((amenity, index) => (
                <span 
                  key={index} 
                  className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm"
                >
                  {amenity}
                </span>
              ))}
            </div>
            
            <h3 className="text-xl font-semibold mb-3">Emplacement</h3>
            <Map fields={[field]} center={field.coordinates} zoom={15} height="400px" />
          </div>
        </div>
        
        {/* Booking sidebar */}
        <div>
          <div className="card p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Réserver ce terrain</h2>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-700">Prix</span>
                <span className="text-xl font-semibold text-primary-700">
                  {field.price.toLocaleString()} Ar
                  <span className="text-sm font-normal text-gray-500">/2h</span>
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Sélectionnez une date
              </label>
              <select
                id="date"
                className="input"
                value={selectedDate}
                onChange={handleDateChange}
              >
                {field.availability.map((slot) => {
                  // Format date to be more readable
                  const date = new Date(slot.date);
                  const formattedDate = format(date, 'EEEE d MMMM', { locale: fr });
                  
                  return (
                    <option key={slot.date} value={slot.date}>
                      {formattedDate}
                    </option>
                  );
                })}
              </select>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Sélectionnez un créneau horaire
              </h3>
              {availableSlots && availableSlots.slots.length > 0 ? (
                <TimeSlotPicker
                  slots={availableSlots.slots}
                  selectedSlot={selectedSlot}
                  setSelectedSlot={setSelectedSlot}
                />
              ) : (
                <p className="text-accent-600">
                  Aucun créneau disponible pour cette date.
                </p>
              )}
            </div>
            
            <button
              onClick={handleBooking}
              disabled={!selectedSlot}
              className="btn-primary w-full mb-4"
            >
              Réserver maintenant
            </button>
            
            <div className="text-sm text-gray-500">
              <div className="flex items-start mb-2">
                <Shield className="w-4 h-4 mt-0.5 mr-2 text-primary-600" />
                <span>Réservation sécurisée</span>
              </div>
              <div className="flex items-start">
                <Coins className="w-4 h-4 mt-0.5 mr-2 text-primary-600" />
                <span>Annulation gratuite jusqu'à 24h avant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldDetailPage;