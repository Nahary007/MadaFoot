import { SubscriptionPlan } from "../types";

export interface SubscriptionPlanDetails {
  id: SubscriptionPlan;
  name: string;
  price: number;
  maxFields: number;
  features: string[];
  popular?: boolean;
}

export const subscriptionPlans: SubscriptionPlanDetails[] = [
  {
    id: "basic",
    name: "Basic",
    price: 50000,
    maxFields: 2,
    features: [
      "Jusqu'à 2 terrains",
      "Gestion des réservations",
      "Statistiques de base",
      "Support email",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 120000,
    maxFields: 5,
    features: [
      "Jusqu'à 5 terrains",
      "Gestion des réservations",
      "Statistiques avancées",
      "Support prioritaire",
      "Notifications SMS",
    ],
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: 250000,
    maxFields: 999,
    features: [
      "Terrains illimités",
      "Gestion des réservations",
      "Statistiques complètes",
      "Support dédié",
      "Notifications SMS",
      "API personnalisée",
    ],
  },
];

export const getSubscriptionPlan = (
  planId: SubscriptionPlan,
): SubscriptionPlanDetails | undefined => {
  return subscriptionPlans.find((plan) => plan.id === planId);
};
