export const ISSUE_CATEGORIES = [
  {
    id: 'water-supply',
    name: 'Water Supply',
    iconName: 'Droplets',
    description: 'Leakages, low pressure, dirty water, or no supply in bathrooms & coolers.',
    avgTime: '4-8 hrs',
    activeCount: 14
  },
  {
    id: 'wifi',
    name: 'Wi-Fi',
    iconName: 'Wifi',
    description: 'Hostel router outages, high latency, signal dead zones, or authentication issues.',
    avgTime: '2-6 hrs',
    activeCount: 28
  },
  {
    id: 'electricity',
    name: 'Electricity',
    iconName: 'Zap',
    description: 'Power cut in wing, faulty switches, tube lights, fans, or main circuit trips.',
    avgTime: '2-4 hrs',
    activeCount: 19
  },
  {
    id: 'cleanliness',
    name: 'Cleanliness',
    iconName: 'Sparkles',
    description: 'Corridor litter, washroom sanitization, dustbin clearance, or common hall cleaning.',
    avgTime: '6-12 hrs',
    activeCount: 9
  },
  {
    id: 'mess-services',
    name: 'Mess Services',
    iconName: 'Utensils',
    description: 'Food hygiene, drinking water dispensers, plate availability, or dining hall seats.',
    avgTime: '12-24 hrs',
    activeCount: 7
  },
  {
    id: 'room-maintenance',
    name: 'Room Maintenance',
    iconName: 'Home',
    description: 'Door locks, window latches, wall dampness, ceiling seepage, or pest control.',
    avgTime: '24-48 hrs',
    activeCount: 22
  },
  {
    id: 'furniture',
    name: 'Furniture',
    iconName: 'Armchair',
    description: 'Broken study tables, squeaky beds, defective cupboard hinges, or missing chairs.',
    avgTime: '24-36 hrs',
    activeCount: 11
  },
  {
    id: 'other',
    name: 'Other',
    iconName: 'MoreHorizontal',
    description: 'Gym equipment, laundry machines, sports area, night security, or miscellaneous.',
    avgTime: '24-48 hrs',
    activeCount: 6
  }
];

export const INITIAL_COMPLAINTS = [
  {
    id: 'CF-2026-00124',
    title: 'Low water pressure & tap leakage in 3rd floor washroom',
    category: 'Water Supply',
    categorySlug: 'water-supply',
    hostel: 'Boys Hostel 2 (Satpura)',
    room: 'Wing B, Washroom 302',
    studentName: 'Aarav Sharma',
    studentId: '2023CSB1042',
    priority: 'High',
    status: 'In Progress',
    currentStepIndex: 3, // 0: Reported, 1: Under Review, 2: Assigned, 3: In Progress, 4: Resolved
    createdAt: '2026-10-05 09:30 AM',
    updatedAt: '2026-10-06 02:15 PM',
    description: 'Main tap in bathroom stall 2 has a continuous spray leakage causing slippery floor. Pressure across 3rd floor taps is severely reduced since morning.',
    assignedTo: 'Ramesh Kumar (Chief Plumber)',
    expectedResolution: 'Today, 06:00 PM',
    timeline: [
      { step: 'Reported', date: 'Oct 05, 09:30 AM', note: 'Ticket logged by Aarav S.' },
      { step: 'Under Review', date: 'Oct 05, 11:00 AM', note: 'Verified by Hostel Warden Dr. K. Mehta' },
      { step: 'Assigned', date: 'Oct 05, 02:30 PM', note: 'Assigned to Central Campus Plumbing Team' },
      { step: 'In Progress', date: 'Oct 06, 10:00 AM', note: 'Replacement valve parts dispatched to Wing B' },
      { step: 'Resolved', date: 'Pending', note: 'Final inspection remaining' }
    ]
  },
  {
    id: 'CF-2026-00125',
    title: 'Wi-Fi access point in corridor 4 offline since thunderstorm',
    category: 'Wi-Fi',
    categorySlug: 'wifi',
    hostel: 'Girls Hostel 1 (Aravali)',
    room: '4th Floor West Wing',
    studentName: 'Priya Patel',
    studentId: '2024ECE1108',
    priority: 'Medium',
    status: 'Assigned',
    currentStepIndex: 2,
    createdAt: '2026-10-05 06:20 PM',
    updatedAt: '2026-10-06 10:45 AM',
    description: 'The Cisco AP LED is blinking amber and not broadcasting CampusSecure SSID. Over 40 students cannot access lecture portals.',
    assignedTo: 'Campus IT Network Cell (Eng. Vikram Singh)',
    expectedResolution: 'Oct 07, 12:00 PM',
    timeline: [
      { step: 'Reported', date: 'Oct 05, 06:20 PM', note: 'Complaint logged via student portal' },
      { step: 'Under Review', date: 'Oct 05, 08:00 PM', note: 'Warden forwarded to Network Administrator' },
      { step: 'Assigned', date: 'Oct 06, 10:45 AM', note: 'IT technician scheduled for site diagnosis' },
      { step: 'In Progress', date: 'Pending', note: 'Corridor switch diagnostic pending' },
      { step: 'Resolved', date: 'Pending', note: 'Awaiting verification' }
    ]
  },
  {
    id: 'CF-2026-00126',
    title: 'Ceiling fan regulator sparking and producing burning smell',
    category: 'Electricity',
    categorySlug: 'electricity',
    hostel: 'Boys Hostel 1 (Vindhya)',
    room: 'Room 214',
    studentName: 'Rohan Verma',
    studentId: '2022MEB1075',
    priority: 'Urgent',
    status: 'Resolved',
    currentStepIndex: 4,
    createdAt: '2026-10-04 03:10 PM',
    updatedAt: '2026-10-05 11:30 AM',
    description: 'Switch box had sparks when turned to speed 3. Kept main switch off for safety.',
    assignedTo: 'Manoj Tiwari (Campus Electrician)',
    expectedResolution: 'Resolved on Oct 05',
    timeline: [
      { step: 'Reported', date: 'Oct 04, 03:10 PM', note: 'Urgent electrical report received' },
      { step: 'Under Review', date: 'Oct 04, 03:20 PM', note: 'Emergency flag raised by Caretaker' },
      { step: 'Assigned', date: 'Oct 04, 03:45 PM', note: 'Electrician dispatched immediately' },
      { step: 'In Progress', date: 'Oct 04, 04:15 PM', note: 'Regulator and wiring harness replaced' },
      { step: 'Resolved', date: 'Oct 05, 11:30 AM', note: 'Tested safely and verified by student Rohan' }
    ]
  },
  {
    id: 'CF-2026-00127',
    title: 'Mess Hall drinking water UV purifier service overdue',
    category: 'Mess Services',
    categorySlug: 'mess-services',
    hostel: 'Central Dining Hall',
    room: 'Block A, Ground Floor',
    studentName: 'Ananya Deshmukh',
    studentId: '2023CSB1190',
    priority: 'Medium',
    status: 'Under Review',
    currentStepIndex: 1,
    createdAt: '2026-10-06 08:45 AM',
    updatedAt: '2026-10-06 09:15 AM',
    description: 'Filter indicator light is red, students noticing slight chlorine taste. Kindly service RO membrane.',
    assignedTo: 'Mess Welfare Committee',
    expectedResolution: 'Oct 08, 05:00 PM',
    timeline: [
      { step: 'Reported', date: 'Oct 06, 08:45 AM', note: 'Logged by Dining Council Rep' },
      { step: 'Under Review', date: 'Oct 06, 09:15 AM', note: 'Acknowledged by Food Quality Officer' },
      { step: 'Assigned', date: 'Pending', note: 'Awaiting vendor technician slot' },
      { step: 'In Progress', date: 'Pending', note: 'Filter cartridge replacement' },
      { step: 'Resolved', date: 'Pending', note: 'Water purity test sign-off' }
    ]
  },
  {
    id: 'CF-2026-00128',
    title: 'Door lock cylinder jammed, key difficult to turn',
    category: 'Room Maintenance',
    categorySlug: 'room-maintenance',
    hostel: 'Girls Hostel 2 (Nilgiri)',
    room: 'Room 108',
    studentName: 'Sneha Kapoor',
    studentId: '2024CHB1020',
    priority: 'Low',
    status: 'Reported',
    currentStepIndex: 0,
    createdAt: '2026-10-06 01:20 PM',
    updatedAt: '2026-10-06 01:20 PM',
    description: 'Mortise lock is sticky and gets stuck when locking from outside.',
    assignedTo: 'Hostel Caretaker',
    expectedResolution: 'Oct 08, 02:00 PM',
    timeline: [
      { step: 'Reported', date: 'Oct 06, 01:20 PM', note: 'Submitted via CampusFix web app' },
      { step: 'Under Review', date: 'Pending', note: 'Warden queue' },
      { step: 'Assigned', date: 'Pending', note: 'Carpentry crew queue' },
      { step: 'In Progress', date: 'Pending', note: 'Lock cylinder lubricate / replacement' },
      { step: 'Resolved', date: 'Pending', note: 'Completion' }
    ]
  }
];
