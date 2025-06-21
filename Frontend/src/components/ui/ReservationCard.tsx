import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar, Clock } from 'lucide-react';
import { Reservation } from '../../types';

interface ReservationCardProps {
  reservation: Reservation;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation }) => {
  // Parse the date string
  const reservationDate = new Date(reservation.date);
  
  // Format date in French
  const formattedDate = format(reservationDate, 'EEEE d MMMM yyyy', { locale: fr });
  
  // Get status badge style
  const getStatusBadge = () => {
    switch (reservation.status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status text in French
  const getStatusText = () => {
    switch (reservation.status) {
      case 'confirmed':
        return 'Confirmée';
      case 'pending':
        return 'En attente';
      case 'cancelled':
        return 'Annulée';
      default:
        return reservation.status;
    }
  };

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex flex-col md:flex-row">
        {/* Field image */}
        <div className="w-full md:w-1/3 h-40 md:h-auto">
          <img 
            src={reservation.fieldImage} 
            alt={reservation.fieldName} 
            className="w-full h-full object-cover md:rounded-l-lg"
          />
        </div>
        
        {/* Reservation details */}
        <div className="w-full md:w-2/3 p-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start">
            <div>
              <h3 className="text-lg font-semibold mb-1">{reservation.fieldName}</h3>
              
              <div className="flex items-center text-gray-500 mb-2">
                <Calendar className="w-4 h-4 mr-1" />
                <span className="text-sm capitalize">{formattedDate}</span>
              </div>
              
              <div className="flex items-center text-gray-500 mb-4">
                <Clock className="w-4 h-4 mr-1" />
                <span className="text-sm">{reservation.startTime} - {reservation.endTime}</span>
              </div>
            </div>
            
            <div className="mt-2 md:mt-0 md:text-right">
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge()}`}>
                {getStatusText()}
              </span>
              <p className="mt-2 text-lg font-semibold">
                {reservation.totalPrice.toLocaleString()} Ar
              </p>
            </div>
          </div>
          
          <div className="flex space-x-2 mt-4">
            {reservation.status === 'confirmed' && (
              <button className="btn-secondary">
                Annuler
              </button>
            )}
            <button className="btn-primary">
              Détails
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;