import React, { useState } from "react";
import {
  Users,
  Building,
  TrendingUp,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

// Mock data - in real app this would come from API
const mockStats = {
  totalOwners: 24,
  totalFields: 67,
  totalRevenue: 2450000,
  pendingApprovals: 5,
};

const mockOwners = [
  {
    id: "1",
    name: "Jean Rakoto",
    email: "jean@example.com",
    subscription: "premium",
    status: "active",
    fieldsCount: 3,
    joinDate: "2024-01-15",
    lastLogin: "2024-06-25",
  },
  {
    id: "2",
    name: "Marie Ratsimba",
    email: "marie@example.com",
    subscription: "basic",
    status: "pending",
    fieldsCount: 1,
    joinDate: "2024-06-20",
    lastLogin: "2024-06-26",
  },
  {
    id: "3",
    name: "Paul Andrianasolo",
    email: "paul@example.com",
    subscription: "pro",
    status: "active",
    fieldsCount: 8,
    joinDate: "2024-02-01",
    lastLogin: "2024-06-24",
  },
];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "owners" | "fields" | "analytics"
  >("overview");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Actif
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            En attente
          </span>
        );
      case "suspended":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Suspendu
          </span>
        );
      default:
        return null;
    }
  };

  const getSubscriptionBadge = (subscription: string) => {
    const colors = {
      basic: "bg-gray-100 text-gray-800",
      premium: "bg-blue-100 text-blue-800",
      pro: "bg-purple-100 text-purple-800",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[subscription as keyof typeof colors]}`}
      >
        {subscription.charAt(0).toUpperCase() + subscription.slice(1)}
      </span>
    );
  };

  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Administration</h1>
        <p className="text-gray-600">
          Gestion des utilisateurs et de la plateforme
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: "overview", label: "Vue d'ensemble", icon: TrendingUp },
            { key: "owners", label: "Propriétaires", icon: Users },
            { key: "fields", label: "Terrains", icon: Building },
            { key: "analytics", label: "Analyses", icon: DollarSign },
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
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Propriétaires
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900">
                    {mockStats.totalOwners}
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                    <Building className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Terrains
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900">
                    {mockStats.totalFields}
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                    <DollarSign className="w-5 h-5 text-yellow-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    Revenus totaux
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900">
                    {mockStats.totalRevenue.toLocaleString()} Ar
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                    <Clock className="w-5 h-5 text-red-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">
                    En attente
                  </h3>
                  <p className="text-2xl font-semibold text-gray-900">
                    {mockStats.pendingApprovals}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Activité récente</h2>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Nouveau propriétaire inscrit
                  </p>
                  <p className="text-xs text-gray-500">
                    Marie Ratsimba s'est inscrite il y a 2 heures
                  </p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Terrain approuvé</p>
                  <p className="text-xs text-gray-500">
                    Terrain de Paul à Ankorondrano approuvé
                  </p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Abonnement expiré</p>
                  <p className="text-xs text-gray-500">
                    L'abonnement de Jean Rakoto expire dans 7 jours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Owners Tab */}
      {activeTab === "owners" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              Gestion des propriétaires
            </h2>
            <div className="flex space-x-2">
              <button className="btn-secondary">Exporter</button>
              <button className="btn-primary">Nouveau propriétaire</button>
            </div>
          </div>

          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Propriétaire
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Abonnement
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Terrains
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dernière connexion
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockOwners.map((owner) => (
                    <tr key={owner.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {owner.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {owner.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getSubscriptionBadge(owner.subscription)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(owner.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {owner.fieldsCount} terrain
                        {owner.fieldsCount > 1 ? "s" : ""}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(owner.lastLogin).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {owner.status === "pending" && (
                            <>
                              <button className="text-green-600 hover:text-green-900">
                                Approuver
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                Refuser
                              </button>
                            </>
                          )}
                          {owner.status === "active" && (
                            <button className="text-yellow-600 hover:text-yellow-900">
                              Suspendre
                            </button>
                          )}
                          <button className="text-primary-600 hover:text-primary-900">
                            Détails
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Fields Tab */}
      {activeTab === "fields" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Gestion des terrains</h2>
            <div className="flex space-x-2">
              <select className="input max-w-xs">
                <option>Tous les statuts</option>
                <option>En attente</option>
                <option>Approuvés</option>
                <option>Rejetés</option>
              </select>
            </div>
          </div>

          <div className="card p-6">
            <p className="text-gray-600 text-center py-12">
              Interface de gestion des terrains en cours de développement...
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">
                Croissance des inscriptions
              </h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-500">
                  Graphique en cours de développement
                </p>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold mb-4">Revenus par mois</h3>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-500">
                  Graphique en cours de développement
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
