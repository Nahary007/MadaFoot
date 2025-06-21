import { Field } from '../types';

export const fields: Field[] = [
  {
    id: '1',
    name: 'Stade Mahamasina',
    address: '101 Rue Mahamasina',
    city: 'Antananarivo',
    price: 35000,
    rating: 4.5,
    image: 'https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg',
    images: [
      'https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg',
      'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg',
      'https://images.pexels.com/photos/270085/pexels-photo-270085.jpeg',
    ],
    description: 'Le stade Mahamasina est un stade de football professionnel avec une pelouse synthétique de haute qualité. Idéal pour les matchs amicaux et les tournois.',
    coordinates: [-18.9105, 47.5214],
    amenities: ['Vestiaires', 'Douches', 'Éclairage', 'Parking', 'Buvette'],
    availability: [
      {
        date: '2024-06-01',
        slots: [
          { id: '1-1', startTime: '08:00', endTime: '10:00', available: true },
          { id: '1-2', startTime: '10:00', endTime: '12:00', available: false },
          { id: '1-3', startTime: '14:00', endTime: '16:00', available: true },
          { id: '1-4', startTime: '16:00', endTime: '18:00', available: true },
          { id: '1-5', startTime: '18:00', endTime: '20:00', available: false },
        ],
      },
      {
        date: '2024-06-02',
        slots: [
          { id: '1-6', startTime: '08:00', endTime: '10:00', available: true },
          { id: '1-7', startTime: '10:00', endTime: '12:00', available: true },
          { id: '1-8', startTime: '14:00', endTime: '16:00', available: false },
          { id: '1-9', startTime: '16:00', endTime: '18:00', available: true },
          { id: '1-10', startTime: '18:00', endTime: '20:00', available: true },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'Terrain Ambatobe',
    address: '25 Avenue Ambatobe',
    city: 'Antananarivo',
    price: 25000,
    rating: 4.2,
    image: 'https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg',
    images: [
      'https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg',
      'https://images.pexels.com/photos/3628912/pexels-photo-3628912.jpeg',
      'https://images.pexels.com/photos/47354/the-ball-stadion-football-the-pitch-47354.jpeg',
    ],
    description: 'Terrain de football à 5 avec pelouse synthétique de dernière génération. Parfait pour les matchs entre amis ou les entraînements.',
    coordinates: [-18.8830, 47.5210],
    amenities: ['Vestiaires', 'Éclairage', 'Parking'],
    availability: [
      {
        date: '2024-06-01',
        slots: [
          { id: '2-1', startTime: '08:00', endTime: '10:00', available: false },
          { id: '2-2', startTime: '10:00', endTime: '12:00', available: true },
          { id: '2-3', startTime: '14:00', endTime: '16:00', available: true },
          { id: '2-4', startTime: '16:00', endTime: '18:00', available: false },
          { id: '2-5', startTime: '18:00', endTime: '20:00', available: true },
        ],
      },
      {
        date: '2024-06-02',
        slots: [
          { id: '2-6', startTime: '08:00', endTime: '10:00', available: true },
          { id: '2-7', startTime: '10:00', endTime: '12:00', available: false },
          { id: '2-8', startTime: '14:00', endTime: '16:00', available: true },
          { id: '2-9', startTime: '16:00', endTime: '18:00', available: true },
          { id: '2-10', startTime: '18:00', endTime: '20:00', available: false },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Complexe Sportif Andoharanofotsy',
    address: '42 Rue Andoharanofotsy',
    city: 'Antananarivo',
    price: 30000,
    rating: 4.7,
    image: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg',
    images: [
      'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg',
      'https://images.pexels.com/photos/685382/pexels-photo-685382.jpeg',
      'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg',
    ],
    description: 'Complexe sportif moderne avec plusieurs terrains de football. Pelouse naturelle bien entretenue et installations de qualité.',
    coordinates: [-18.9511, 47.5123],
    amenities: ['Vestiaires', 'Douches', 'Éclairage', 'Parking', 'Buvette', 'Wifi'],
    availability: [
      {
        date: '2024-06-01',
        slots: [
          { id: '3-1', startTime: '08:00', endTime: '10:00', available: true },
          { id: '3-2', startTime: '10:00', endTime: '12:00', available: true },
          { id: '3-3', startTime: '14:00', endTime: '16:00', available: false },
          { id: '3-4', startTime: '16:00', endTime: '18:00', available: true },
          { id: '3-5', startTime: '18:00', endTime: '20:00', available: true },
        ],
      },
      {
        date: '2024-06-02',
        slots: [
          { id: '3-6', startTime: '08:00', endTime: '10:00', available: false },
          { id: '3-7', startTime: '10:00', endTime: '12:00', available: true },
          { id: '3-8', startTime: '14:00', endTime: '16:00', available: true },
          { id: '3-9', startTime: '16:00', endTime: '18:00', available: false },
          { id: '3-10', startTime: '18:00', endTime: '20:00', available: true },
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'Five Futsal Tamatave',
    address: '15 Boulevard Joffre',
    city: 'Toamasina',
    price: 20000,
    rating: 4.0,
    image: 'https://images.pexels.com/photos/3659683/pexels-photo-3659683.jpeg',
    images: [
      'https://images.pexels.com/photos/3659683/pexels-photo-3659683.jpeg',
      'https://images.pexels.com/photos/186239/pexels-photo-186239.jpeg',
      'https://images.pexels.com/photos/47342/the-ball-stadion-football-the-pitch-47342.jpeg',
    ],
    description: 'Terrain de futsal couvert avec surface synthétique de haute qualité. Idéal pour jouer en toute saison.',
    coordinates: [-18.1498, 49.4028],
    amenities: ['Vestiaires', 'Éclairage', 'Parking', 'Buvette'],
    availability: [
      {
        date: '2024-06-01',
        slots: [
          { id: '4-1', startTime: '08:00', endTime: '10:00', available: true },
          { id: '4-2', startTime: '10:00', endTime: '12:00', available: false },
          { id: '4-3', startTime: '14:00', endTime: '16:00', available: true },
          { id: '4-4', startTime: '16:00', endTime: '18:00', available: true },
          { id: '4-5', startTime: '18:00', endTime: '20:00', available: false },
        ],
      },
      {
        date: '2024-06-02',
        slots: [
          { id: '4-6', startTime: '08:00', endTime: '10:00', available: false },
          { id: '4-7', startTime: '10:00', endTime: '12:00', available: true },
          { id: '4-8', startTime: '14:00', endTime: '16:00', available: false },
          { id: '4-9', startTime: '16:00', endTime: '18:00', available: true },
          { id: '4-10', startTime: '18:00', endTime: '20:00', available: true },
        ],
      },
    ],
  },
];