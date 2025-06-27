import React, { useState } from "react";
import {
  Building,
  Plus,
  TrendingUp,
  Users,
  Calendar,
  BarChart3,
  Settings,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getSubscriptionPlan } from "../../data/subscriptions";

// Mock data - in real app this would come from API
const mockFields = [
  {
    id: "1",
    name: "Terrain City Stade",
    address: "Ankorondrano, Antananarivo",
    status: "active",
    reservations: 24,
    revenue: 480000,
    occupancyRate: 85,
  },
  {
    id: "2",
    name: "Foot Academy",
    address: "Ivandry, Antananarivo",
    status: "pending",
    reservations: 0,
    revenue: 0,
    occupancyRate: 0,
  },
];

const mockMonthlyStats = [
  { month: "Jan", reservations: 45, revenue: 900000 },
  { month: "Fév", reservations: 52, revenue: 1040000 },
  { month: "Mar", reservations: 48, revenue: 960000 },
  { month: "Avr", reservations: 61, revenue: 1220000 },
  { month: "Mai", reservations: 58, revenue: 1160000 },
  { month: "Juin", reservations: 67, revenue: 1340000 },
];

const OwnerDashboard: React.FC = () => {
  const { authState } = useAuth();
  const [activeTab, setActiveTab] = useState<
    "overview" | "fields" | "reservations" | "analytics" | "subscription"
  >("overview");

  const user = authState.user;
  const subscription = user?.subscription;
  const subscriptionPlan = subscription
    ? getSubscriptionPlan(subscription.plan)
    : null;

  const canAddField =
    subscription && subscription.currentFields < subscription.maxFields;

  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Tableau de bord propriétaire
        </h1>
        <p className="text-gray-600">
          Gérez vos terrains et suivez vos performances
        </p>
      </div>

      {/* Subscription Status */}
      {subscription && (
        <div className="card p-4 mb-6 bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-primary-800">
                Abonnement {subscriptionPlan?.name}
              </h3>
              <p className="text-sm text-primary-600">
                {subscription.currentFields} / {subscription.maxFields} terrains
                utilisés
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-primary-600">Expire le</p>
              <p className="font-semibold text-primary-800">
                {new Date(subscription.endDate).toLocaleDateString("fr-FR")}
              </p>
            </div>
          </div>
          {!canAddField && (
            <div className="mt-3 p-2 bg-yellow-100 rounded-md">
              <p className="text-sm text-yellow-800">
                Vous avez atteint la limite de terrains pour votre abonnement.
                <button className="ml-1 text-yellow-900 underline">
                  Mettre à niveau
                </button>
              </p>
            </div>
          )}
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: "overview", label: "Vue d'ensemble", icon: TrendingUp },
            { key: "fields", label: "Mes terrains", icon: Building },
            { key: "reservations", label: "Réservations", icon: Calendar },
            { key: "analytics", label: "Analyses", icon: BarChart3 },
            { key: "subscription", label: "Abonnement", icon: Settings },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as any)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === key
                  ? "border-primary-500 text-primary-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                    <Building className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Terrains
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900">
                    {subscription?.currentFields || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Réservations (ce mois)
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900">67</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-yellow-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Revenus (ce mois)
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900">
                    1,340,000 Ar
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Taux d'occupation
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900">78%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">Activité récente</h2>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Nouvelle réservation</p>
                    <p className="text-xs text-gray-500">
                      Terrain City Stade - 27 juin 18h00
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Paiement reçu</p>
                    <p className="text-xs text-gray-500">
                      20,000 Ar - Terrain City Stade
                    </p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Terrain en attente</p>
                    <p className="text-xs text-gray-500">
                      Foot Academy - En cours de validation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">
                Performance mensuelle
              </h2>
              <div className="space-y-4">
                {mockMonthlyStats.slice(-3).map((stat) => (
                  <div
                    key={stat.month}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{stat.month} 2024</p>
                      <p className="text-sm text-gray-500">
                        {stat.reservations} réservations
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary-600">
                        {stat.revenue.toLocaleString()} Ar
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fields Tab */}
      {activeTab === "fields" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Mes terrains</h2>
            <button
              className={`btn-primary flex items-center ${!canAddField ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={!canAddField}
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un terrain
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockFields.map((field) => (
              <div key={field.id} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{field.name}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      field.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {field.status === "active" ? "Actif" : "En attente"}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{field.address}</p>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Réservations</span>
                    <span className="text-sm font-medium">
                      {field.reservations}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Revenus</span>
                    <span className="text-sm font-medium">
                      {field.revenue.toLocaleString()} Ar
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">
                      Taux d'occupation
                    </span>
                    <span className="text-sm font-medium">
                      {field.occupancyRate}%
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  <button className="btn-secondary flex-1">Modifier</button>
                  <button className="btn-primary flex-1">Gérer</button>
                </div>
              </div>
            ))}

            {canAddField && (
              <div className="card p-6 border-dashed border-2 border-gray-300 flex items-center justify-center">
                <div className="text-center">
                  <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Ajouter un terrain
                  </h3>
                  <p className="text-gray-500 mb-4">
                    {subscription?.maxFields &&
                      subscription.maxFields - subscription.currentFields}{" "}
                    emplacement
                    {(subscription?.maxFields &&
                      subscription.maxFields - subscription.currentFields) > 1
                      ? "s"
                      : ""}{" "}
                    restant
                    {(subscription?.maxFields &&
                      subscription.maxFields - subscription.currentFields) > 1
                      ? "s"
                      : ""}
                  </p>
                  <button className="btn-primary">Commencer</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Reservations Tab */}
      {activeTab === "reservations" && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            Gestion des réservations
          </h2>

          <div className="card p-6">
            <p className="text-gray-600 text-center py-12">
              Interface de gestion des réservations en cours de développement...
            </p>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            Analyses et statistiques
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Revenus mensuels</h3>
              <div className="space-y-2">
                {mockMonthlyStats.map((stat, index) => (
                  <div
                    key={stat.month}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-md flex items-center justify-center text-sm font-medium mr-3">
                        {stat.month}
                      </div>
                      <div>
                        <p className="font-medium">
                          {stat.reservations} réservations
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        {stat.revenue.toLocaleString()} Ar
                      </p>
                      {index > 0 && (
                        <p className="text-xs text-green-600">
                          +
                          {Math.round(
                            ((stat.revenue -
                              mockMonthlyStats[index - 1].revenue) /
                              mockMonthlyStats[index - 1].revenue) *
                              100,
                          )}
                          %
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">
                Performance par terrain
              </h3>
              <div className="space-y-4">
                {mockFields.map((field) => (
                  <div
                    key={field.id}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{field.name}</h4>
                      <span className="text-sm text-gray-500">
                        {field.occupancyRate}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${field.occupancyRate}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>{field.reservations} réservations</span>
                      <span>{field.revenue.toLocaleString()} Ar</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Tab */}
      {activeTab === "subscription" && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            Gestion de l'abonnement
          </h2>

          <div className="card p-6">
            <p className="text-gray-600 text-center py-12">
              Interface de gestion des abonnements en cours de développement...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
