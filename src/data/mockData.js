export const routes = [
  { id: 1, name: 'Mjini to Suza', from: 'Mjini', to: 'Suza' },
  { id: 2, name: 'Suza to Mjini', from: 'Suza', to: 'Mjini' }
];



export const stations = [
  { 
    id: 1, 
    name: "Tobo la pili",
    routeId: 1, 
    order: 1,
    location:{latitude:-6.19486, longitude:39.29894},
   }, 

  {
     id: 2,
      name: "Kisonge", 
      routeId: 1, 
      order: 2 ,
      location:{latitude:-6.19591, longitude:39.27255},
    },

  { 
    id: 3,
     name: "Kijangwani", 
     routeId: 1,
     order: 3,
     location:{latitude:-6.19497, longitude:39.28591},
    },

  { 
    id: 4, 
    name: "Mharitan", 
    routeId: 1, 
    order: 4,
    location:{latitude:-6.19469, longitude:39.269228},
   },

  {
     id: 5, 
     name: "Sogea", 
     routeId: 1,
     order: 5,
     location:{latitude:-6.19588, longitude:39.25591},
    },

  {
     id: 6, 
     name: "Jitini", 
     routeId: 1, 
     order: 6 ,
     location:{latitude:-6.19547, longitude:39.28152},
   },

  {
     id: 7, 
     name: "Kwanajim", 
     routeId:1,
      order: 7,
      location:{latitude:-6.19497, longitude:39.28588},
    },

  {
     id: 8, 
     name: "Kwerekwe kabla", 
     routeId:1, 
     order: 8,
     location:{latitude:-6.19602, longitude:39.29725},
    },

  {
    id: 9, 
    name:  "Kwerekwe kivulin", 
    routeId: 1, 
    order:9,
    location:{latitude:-6.18172, longitude:39.23075},
  },

  {
    id: 10, 
    name: "Melinne", 
    routeId: 1, 
    order: 10 ,
    location:{latitude:-6.18332, longitude:39.23252},
  },

  {
    id: 11,
     name: "Taveta", 
     routeId: 1, 
     order:11,
     location:{latitude:-6.18527, longitude:39.23625},
     },

  {
    id: 12, 
    name: "Mashine", 
    routeId: 1,
     order:12,
     location:{latitude:-6.1868, longitude:39.23922},
    },

  {
    id: 13, 
    name: "Melitano", 
    routeId: 1, 
    order: 14 ,
    location:{latitude:-6.17811, longitude:39.22744},
  },

  {
    id: 14, 
    name: "Jitimai", 
    routeId: 1, 
    order: 15,
    location:{latitude:-6.18302, longitude:39.23255},
    },

  {
    id: 15, 
    name: "Mtundani", 
    routeId: 2, 
    order: 9 ,
    location:{latitude:-6.17811, longitude:39.22741},
   },

  {
    id: 16, 
    name: "Fuoni skul", 
    routeId: 2, 
    order:8 ,
    location:{latitude:-6.18527, longitude:39.25286},
   },

  {
    id: 17,
     name: "Kisiman",
      routeId: 2, 
      order: 7,
       location:{latitude:-6.19591, longitude:39.2725},
     },

  {
    id: 18,
     name: "Sokoni jumbi",
      routeId:2,
       order: 6, 
       location:{latitude:-6.19552, longitude:39.28183},
      },

  {
    id: 19,
     name: "Bango la mkoa", 
     routeId: 2, 
     order: 5,
     location:{latitude:-6.19497, longitude:39.28588},
    },

  {
    id: 20,
     name: "Juu ya kilima",
     routeId: 2, 
     order: 4,
     location:{latitude:-6.19602, longitude:39.27725},
   },

  {
    id: 21,
     name: "Kontena",
      routeId: 2,
      order: 3, 
      location:{latitude:-6.19602, longitude:39.31058},
    },

  {
    id: 22,
     name: "Kwabimdau", 
     routeId: 2,
     order:2 ,
     location:{latitude:-6.19527, longitude:39.30369},
    
    },

  {
    id: 23,
     name: "Suza", 
     routeId: 2, 
     order: 1, 
     location:{latitude:-6.19552, longitude:39.28183},

    }
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
