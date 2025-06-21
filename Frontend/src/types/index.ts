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

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface Reservation {
  id: string;
  fieldId: string;
  fieldName: string;
  fieldImage: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  totalPrice: number;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}