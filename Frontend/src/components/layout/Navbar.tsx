import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Percent as Soccer, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { authState, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Soccer className="w-8 h-8 text-primary-600" />
            <span className="text-xl font-display font-bold text-black">
              Mada<span className="text-primary-600">Foot</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-black hover:text-primary-600 font-medium transition-colors"
            >
              Accueil
            </Link>
            <Link
              to="/search"
              className="text-black hover:text-primary-600 font-medium transition-colors"
            >
              Terrains
            </Link>
            {authState.isAuthenticated ? (
              <>
                {authState.user?.role === "admin" && (
                  <Link
                    to="/admin/dashboard"
                    className="text-black hover:text-primary-600 font-medium transition-colors"
                  >
                    Administration
                  </Link>
                )}
                {authState.user?.role === "owner" && (
                  <Link
                    to="/owner/dashboard"
                    className="text-black hover:text-primary-600 font-medium transition-colors"
                  >
                    Mes terrains
                  </Link>
                )}
                {authState.user?.role === "visitor" && (
                  <Link
                    to="/dashboard"
                    className="text-black hover:text-primary-600 font-medium transition-colors"
                  >
                    Mes réservations
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {authState.user?.name}
                  </span>
                  <button onClick={handleLogout} className="btn-secondary">
                    Déconnexion
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-black hover:text-primary-600 font-medium transition-colors"
                >
                  Connexion
                </Link>
                <Link to="/register" className="btn-primary">
                  S'inscrire
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-black hover:text-primary-600 transition-colors"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t mt-3">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-black hover:text-primary-600 font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link
                to="/search"
                className="text-black hover:text-primary-600 font-medium transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Terrains
              </Link>
              {authState.isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-black hover:text-primary-600 font-medium transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Mes réservations
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="btn-secondary text-left"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-black hover:text-primary-600 font-medium transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    S'inscrire
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
