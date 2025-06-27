import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Percent as Soccer, AlertCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface LocationState {
  redirect?: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authState, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const locationState = location.state as LocationState;
  const redirectPath = locationState?.redirect || "/";

  // Redirect if already logged in
  React.useEffect(() => {
    if (authState.isAuthenticated) {
      navigate(redirectPath);
    }
  }, [authState.isAuthenticated, navigate, redirectPath]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(false);

    try {
      await login(email, password);
      // Navigation will happen in the useEffect
    } catch (error) {
      setShowError(true);
    }
  };

  // Demo credentials
  const fillDemoCredentials = () => {
    setEmail("user@example.com");
    setPassword("password123");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <Soccer className="w-12 h-12 text-primary-600" />
          </div>
          <h2 className="text-3xl font-bold">Connexion</h2>
          <p className="mt-2 text-gray-600">Accédez à votre compte MadaFoot</p>
        </div>

        <div className="card p-8">
          {showError && (
            <div className="mb-4 p-3 bg-accent-50 text-accent-700 rounded-md flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
              <p className="text-sm">Email ou mot de passe incorrect.</p>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
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
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mot de passe
                </label>
                <button
                  type="button"
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Mot de passe oublié ?
                </button>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                className="btn-primary w-full"
                disabled={authState.loading}
              >
                {authState.loading ? "Connexion en cours..." : "Se connecter"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="text-center text-sm text-gray-600 mb-3">
              Comptes de démonstration :
            </div>
            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => {
                  setEmail("admin@madafoot.com");
                  setPassword("admin123");
                }}
                className="w-full text-center text-sm text-blue-600 hover:text-blue-700 py-2 px-3 border border-blue-200 rounded"
              >
                Admin (admin@madafoot.com / admin123)
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail("owner@example.com");
                  setPassword("owner123");
                }}
                className="w-full text-center text-sm text-green-600 hover:text-green-700 py-2 px-3 border border-green-200 rounded"
              >
                Propriétaire (owner@example.com / owner123)
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail("user@example.com");
                  setPassword("password123");
                }}
                className="w-full text-center text-sm text-primary-600 hover:text-primary-700 py-2 px-3 border border-primary-200 rounded"
              >
                Visiteur (user@example.com / password123)
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Pas encore de compte ?{" "}
              <Link
                to="/register"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                S'inscrire
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
