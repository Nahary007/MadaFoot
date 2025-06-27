export interface Field {
  id: string;
  name: string;
  address: string;
  city: string;
  price: number;
  rating: number;
  image: string;
  images: string[];
  description: string;
  coordinates: [number, number];
  amenities: string[];
  availability: AvailabilitySlot[];
  ownerId: string;
  ownerName: string;
  isApproved: boolean;
  createdAt: string;
}

export interface AvailabilitySlot {
  date: string;
  slots: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

export type UserRole = "admin" | "owner" | "visitor";
export type SubscriptionPlan = "basic" | "premium" | "pro";
export type SubscriptionStatus = "active" | "expired" | "cancelled";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  subscription?: Subscription;
  createdAt: string;
  lastLogin?: string;
}

export interface Subscription {
  id: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  maxFields: number;
  currentFields: number;
  price: number;
}

export interface FieldOwner {
  id: string;
  name: string;
  email: string;
  phone: string;
  subscription: Subscription;
  fields: Field[];
  totalReservations: number;
  monthlyRevenue: number;
}

export interface VisitorBooking {
  id: string;
  fieldId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: "confirmed" | "pending" | "cancelled";
  createdAt: string;
}

export interface Reservation {
  id: string;
  fieldId: string;
  fieldName: string;
  fieldImage: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "confirmed" | "pending" | "cancelled";
  totalPrice: number;
  createdAt: string;
  userId?: string; // Optional for visitor bookings
  customerInfo?: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface MonthlyStats {
  month: string;
  reservations: number;
  revenue: number;
  occupancyRate: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
