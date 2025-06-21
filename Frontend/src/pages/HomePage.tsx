import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Shield, Award, ArrowRight } from 'lucide-react';
import FieldCard from '../components/ui/FieldCard';
import { fields } from '../data/fields';

const HomePage: React.FC = () => {
  // Featured fields - just the first 3 for this example
  const featuredFields = fields.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-black text-white">
        <div className="absolute inset-0 overflow-hidden z-0">
          <img
            src="https://images.pexels.com/photos/47354/the-ball-stadion-football-the-pitch-47354.jpeg"
            alt="Football field"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="container-custom relative z-10 py-20 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Réservez votre terrain de football en quelques clics
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              MadaFoot vous propose les meilleurs terrains de football à Madagascar. 
              Trouvez, réservez et jouez facilement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/search" className="btn-primary text-center">
                Trouver un terrain
              </Link>
              <Link to="/register" className="btn-secondary text-center">
                Créer un compte
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comment ça marche</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Réserver un terrain de football n'a jamais été aussi simple. Suivez ces étapes et commencez à jouer !
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6 text-center">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Trouvez un terrain</h3>
              <p className="text-gray-600">
                Parcourez notre sélection de terrains ou utilisez la carte pour trouver le terrain idéal près de chez vous.
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Choisissez une date</h3>
              <p className="text-gray-600">
                Sélectionnez la date et l'heure qui vous conviennent parmi les créneaux disponibles.
              </p>
            </div>

            <div className="card p-6 text-center">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Confirmez et jouez</h3>
              <p className="text-gray-600">
                Finalisez votre réservation en toute sécurité et recevez une confirmation instantanée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Fields */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Terrains populaires</h2>
            <Link to="/search" className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
              Voir tous <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredFields.map((field) => (
              <FieldCard key={field.id} field={field} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pourquoi choisir MadaFoot</h2>
            <p className="text-gray-100 max-w-2xl mx-auto">
              Nous offrons une expérience de réservation exceptionnelle pour tous les amateurs de football.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Terrains de qualité</h3>
              <p className="text-gray-100">
                Tous nos terrains sont vérifiés et entretenus régulièrement.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Paiement sécurisé</h3>
              <p className="text-gray-100">
                Vos transactions sont 100% sécurisées et protégées.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Réservation facile</h3>
              <p className="text-gray-100">
                Processus de réservation simple et rapide en quelques clics.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Large couverture</h3>
              <p className="text-gray-100">
                Des terrains dans toutes les grandes villes de Madagascar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="bg-gray-100 rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                Prêt à jouer au football ?
              </h2>
              <p className="text-gray-600 max-w-lg">
                Rejoignez MadaFoot aujourd'hui et commencez à réserver les meilleurs terrains de football à Madagascar.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/search" className="btn-primary text-center whitespace-nowrap">
                Trouver un terrain
              </Link>
              <Link to="/register" className="btn-secondary text-center whitespace-nowrap">
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;