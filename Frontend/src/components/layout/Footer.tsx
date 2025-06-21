import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Percent as Soccer } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Soccer className="w-8 h-8 text-primary-500" />
              <span className="text-xl font-display font-bold">
                Mada<span className="text-primary-500">Foot</span>
              </span>
            </div>
            <p className="text-gray-300 mb-4">
              MadaFoot est la première plateforme de réservation de terrains de football à Madagascar, 
              facilitant l'accès au sport pour tous.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary-500 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-300 hover:text-primary-500 transition-colors">
                  Terrains
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-primary-500 transition-colors">
                  Connexion
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-primary-500 transition-colors">
                  Inscription
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informations légales</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-500 transition-colors">
                  Conditions d'utilisation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-500 transition-colors">
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-500 transition-colors">
                  Politique de remboursement
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-500 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-500 mt-0.5" />
                <span className="text-gray-300">
                  15 Rue Rainandriamampandry, Antananarivo 101
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-500" />
                <span className="text-gray-300">+261 34 123 45 67</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-500" />
                <span className="text-gray-300">contact@madafoot.mg</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} MadaFoot. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;