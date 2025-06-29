export const routes = [
  { id: 1, name: 'Mjini to Suza', from: 'Mjini', to: 'Suza' },
  { id: 2, name: 'Suza to Mjini', from: 'Suza', to: 'Mjini' }
];

export const stations = [
  { id: 1, name: 'Tobo la pili', routeId: 1, order: 1, location: { lat: 1, lng: 2 }},
  { id: 2, name: 'Kisonge', routeId: 1, order: 2 },
  { id: 3, name: 'Posta', routeId: 1, order: 3 },
  { id: 4, name: 'Mharitan', routeId: 1, order: 4 },
  { id: 5, name: 'Sogea ', routeId: 2, order: 1 },
  { id: 6, name: 'Jitini', routeId: 2, order: 2 },
  { id: 7, name: 'Kwanajim', routeId: 2, order: 3 },
  { id: 8, name: 'Kwerekwe kabla', routeId:2, order: 4 },
  {id: 9, name:  'Kwerekwe kivulin', routeId: 1, order:1 },
  {id: 10, name: 'Melinne', routeId: 1, order: 2 },
  {id: 11, name: 'Taveta', routeId: 1, order: 3 },
  {id: 12, name: 'Mashine', routeId: 1, order: 4 },
  {id: 13, name: 'Melitano', routeId: 2, order: 1 },
  {id: 14, name: 'Jitimai', routeId: 2, order: 2 },
  {id: 15, name: 'Mtundani', routeId: 2, order: 3 },
  {id: 16, name: 'Fuoni skul', routeId: 2, order: 4 },
  {id: 17, name: 'Kisiman', routeId: 1, order: 1 },
  {id: 18, name: 'Sokoni jumbi', routeId: 1, order: 2 },
  {id: 19, name: 'Bango la mkoa', routeId: 1, order: 3 },
  {id: 20, name: 'Juu ya kilima', routeId: 1, order: 4 },
  {id: 21, name: 'Kontena', routeId: 2, order: 1 },
  {id: 22, name: 'Kwabimdau', routeId: 2, order:2 },
  {id: 23, name: 'Suza', routeId: 2, order: 3 }
];

export const buses = [
  {
    id: 1,
    plateNumber: 'T123ABC',
    routeId: 1,
    currentStation: 'Tobo la pili',
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
    currentStation: 'Mharitani',
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
