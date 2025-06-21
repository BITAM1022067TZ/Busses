export const routes = [
  { id: 1, name: 'Mji to Suza', from: 'Mji', to: 'Suza' },
  { id: 2, name: 'Suza to Mji', from: 'Suza', to: 'Mji' }
];

export const stations = [
  { id: 1, name: 'Mji Central', routeId: 1, order: 1 },
  { id: 2, name: 'Kivukoni', routeId: 1, order: 2 },
  { id: 3, name: 'Posta', routeId: 1, order: 3 },
  { id: 4, name: 'Suza Terminal', routeId: 1, order: 4 },
  { id: 5, name: 'Suza Terminal', routeId: 2, order: 1 },
  { id: 6, name: 'Posta', routeId: 2, order: 2 },
  { id: 7, name: 'Kivukoni', routeId: 2, order: 3 },
  { id: 8, name: 'Mji Central', routeId: 2, order: 4 }
];

export const buses = [
  {
    id: 1,
    plateNumber: 'T123ABC',
    routeId: 1,
    currentStation: 'Mji Central',
    totalSeats: 50,
    bookedSeats: 35,
    status: 'active',
    estimatedArrival: '14:30',
    currentLocation: { lat: -6.8235, lng: 39.2695 },
    passengerCount: 35
  },
  {
    id: 2,
    plateNumber: 'T456DEF',
    routeId: 1,
    currentStation: 'Kivukoni',
    totalSeats: 45,
    bookedSeats: 20,
    status: 'active',
    estimatedArrival: '15:00',
    currentLocation: { lat: -6.8167, lng: 39.2833 },
    passengerCount: 20
  }
];

export const userTypes = [
  { id: 'traveler', name: 'Traveler', icon: 'Users', color: 'bg-blue-500' },
  { id: 'conductor', name: 'Conductor/Bus Operator', icon: 'Bus', color: 'bg-green-500' },
  { id: 'admin', name: 'Admin', icon: 'Settings', color: 'bg-purple-500' }
];
