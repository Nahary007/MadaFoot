import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Percent as Soccer, AlertCircle, User, Building } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { UserRole } from "../../types";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { authState, register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("visitor");
  const [error, setError] = useState<string | null>(null);

  // Redirect if already logged in
  React.useEffect(() => {
    if (authState.isAuthenticated) {
      navigate("/");
    }
  }, [authState.isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate form
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (!phone && role !== "visitor") {
      setError("Le numéro de téléphone est requis pour les propriétaires.");
      return;
    }

    try {
      await register(name, email, password, phone, role);
      // Navigation will happen in the useEffect
    } catch (error) {
      setError("Une erreur est survenue lors de l'inscription.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <Soccer className="w-12 h-12 text-primary-600" />
          </div>
          <h2 className="text-3xl font-bold">Créer un compte</h2>
          <p className="mt-2 text-gray-600">
            Rejoignez MadaFoot pour réserver ou gérer des terrains de football
          </p>
        </div>

        <div className="card p-8">
          {error && (
            <div className="mb-4 p-3 bg-accent-50 text-accent-700 rounded-md flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Type de compte
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`relative cursor-pointer rounded-lg border p-4 focus:outline-none ${
                    role === "visitor"
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-300 bg-white hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="visitor"
                    checked={role === "visitor"}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-2 text-gray-600" />
                    <div>
                      <div className="text-sm font-medium">Visiteur</div>
                      <div className="text-xs text-gray-500">
                        Réserver des terrains
                      </div>
                    </div>
                  </div>
                </label>

                <label
                  className={`relative cursor-pointer rounded-lg border p-4 focus:outline-none ${
                    role === "owner"
                      ? "border-primary-500 bg-primary-50"
                      : "border-gray-300 bg-white hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="owner"
                    checked={role === "owner"}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <Building className="w-5 h-5 mr-2 text-gray-600" />
                    <div>
                      <div className="text-sm font-medium">Propriétaire</div>
                      <div className="text-xs text-gray-500">
                        Gérer mes terrains
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nom complet
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Téléphone{" "}
                {role === "owner" && <span className="text-red-500">*</span>}
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required={role === "owner"}
                className="input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+261 34 123 45 67"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="mt-1 text-xs text-gray-500">8 caractères minimum</p>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirmer le mot de passe
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {role === "owner" && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-800 mb-2">
                  Compte propriétaire
                </h3>
                <p className="text-blue-700 text-sm">
                  En tant que propriétaire, vous pourrez ajouter et gérer vos
                  terrains de football. Votre compte sera vérifié avant
                  activation.
                </p>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="btn-primary w-full"
                disabled={authState.loading}
              >
                {authState.loading ? "Inscription en cours..." : "S'inscrire"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Déjà un compte ?{" "}
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
