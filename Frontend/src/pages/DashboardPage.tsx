import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, LogOut } from 'lucide-react';
import ReservationCard from '../components/ui/ReservationCard';
import { userReservations } from '../data/reservations';
import { Reservation } from '../types';
import { useAuth } from '../context/AuthContext';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { authState, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  
  // Check if user is authenticated
  React.useEffect(() => {
    if (!authState.isAuthenticated) {
      navigate('/login', { state: { redirect: '/dashboard' } });
    }
  }, [authState.isAuthenticated, navigate]);
  
  // Filter reservations
  const now = new Date();
  const upcomingReservations = userReservations.filter(res => {
    const resDate = new Date(res.date);
    return resDate >= now;
  });
  
  const pastReservations = userReservations.filter(res => {
    const resDate = new Date(res.date);
    return resDate < now;
  });
  
  const currentReservations = activeTab === 'upcoming' ? upcomingReservations : pastReservations;
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  if (!authState.isAuthenticated) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">Mon tableau de bord</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card p-6 mb-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-primary-100 text-primary-600 w-12 h-12 rounded-full flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-semibold">{authState.user?.name}</h2>
                <p className="text-sm text-gray-500">{authState.user?.email}</p>
              </div>
            </div>
            
            <nav>
              <ul className="space-y-2">
                <li>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                      activeTab === 'upcoming' 
                        ? 'bg-primary-50 text-primary-700' 
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('upcoming')}
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Réservations à venir
                  </button>
                </li>
                <li>
                  <button 
                    className={`w-full text-left px-4 py-2 rounded-md flex items-center ${
                      activeTab === 'past' 
                        ? 'bg-primary-50 text-primary-700' 
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab('past')}
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Réservations passées
                  </button>
                </li>
                <li>
                  <button 
                    className="w-full text-left px-4 py-2 rounded-md flex items-center hover:bg-gray-100 text-accent-600"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Déconnexion
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Main content */}
        <div className="lg:col-span-3">
          <h2 className="text-2xl font-semibold mb-6">
            {activeTab === 'upcoming' ? 'Réservations à venir' : 'Réservations passées'}
          </h2>
          
          {currentReservations.length > 0 ? (
            <div className="space-y-4">
              {currentReservations.map((reservation) => (
                <ReservationCard key={reservation.id} reservation={reservation} />
              ))}
            </div>
          ) : (
            <div className="card p-8 text-center">
              <h3 className="text-xl font-semibold mb-2">
                Aucune réservation {activeTab === 'upcoming' ? 'à venir' : 'passée'}
              </h3>
              <p className="text-gray-600 mb-6">
                {activeTab === 'upcoming' 
                  ? "Vous n'avez pas encore de réservations à venir."
                  : "Vous n'avez pas encore de réservations passées."
                }
              </p>
              {activeTab === 'upcoming' && (
                <button
                  onClick={() => navigate('/search')}
                  className="btn-primary"
                >
                  Réserver un terrain
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;