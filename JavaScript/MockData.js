window.addEventListener("DOMContentLoaded", initializeApp);

// Mock data for sessions
const mockData = [
  {
    sessionId: 1,
    sessionName: "Web Development Fundamentals",
    speaker: "John Doe",
    time: "10:00 AM - 11:00 AM",
    topic: "Introduction to JavaScript",
    room: "Room A",
    viewCount: { start: 50, middle: 35, end: 20 },
  },
  {
    sessionId: 2,
    sessionName: "CSS Mastery",
    speaker: "Jane Smith",
    time: "11:30 AM - 12:30 PM",
    topic: "Advanced CSS Techniques",
    room: "Room B",
    viewCount: { start: 40, middle: 30, end: 25 },
  },
  {
    sessionId: 3,
    sessionName: "Frontend Development",
    speaker: "Alice Johnson",
    time: "1:00 PM - 2:00 PM",
    topic: "React for Beginners",
    room: "Room A",
    viewCount: { start: 60, middle: 50, end: 45 },
  },
  {
    sessionId: 4,
    sessionName: "Backend Development",
    speaker: "Bob Brown",
    time: "2:30 PM - 3:30 PM",
    topic: "Node.js Best Practices",
    room: "Room C",
    viewCount: { start: 30, middle: 20, end: 15 },
  },
  {
    sessionId: 5,
    sessionName: "User Experience",
    speaker: "Emily Davis",
    time: "4:00 PM - 5:00 PM",
    topic: "UX Design Principles",
    room: "Room B",
    viewCount: { start: 70, middle: 60, end: 50 },
  },
];

function initializeApp() {
  populateDropdowns();
  initializeEventListeners();
  displayCards();
  
}

function populateDropdowns() {
  // Get unique values for each dropdown
  const sessionNames = [...new Set(mockData.map(session => session.sessionName))];
  const presenters = [...new Set(mockData.map(session => session.speaker))];
  const rooms = [...new Set(mockData.map(session => session.room))];
  const timeSlots = [...new Set(mockData.map(session => session.time))];
  
  // Populate session names dropdown
  const sessionNameDropdown = document.getElementById('sessionName');
  populateSelect(sessionNameDropdown, sessionNames, 'All Sessions');
  
  // Populate presenters datalist
  const presentersList = document.getElementById('presenters');
  populateDatalist(presentersList, presenters);
  
  // Populate rooms dropdown
  const roomDropdown = document.getElementById('room');
  populateSelect(roomDropdown, rooms, 'All Rooms');
  
  // Populate time slots dropdown
  const timeSlotDropdown = document.getElementById('sessionTime');
  populateSelect(timeSlotDropdown, timeSlots, 'All Times');
}

function populateSelect(selectElement, options, defaultOption) {
  // Clear existing options
  selectElement.innerHTML = '';
  
  // Add default option
  const defaultOpt = document.createElement('option');
  defaultOpt.value = '';
  defaultOpt.textContent = defaultOption;
  selectElement.appendChild(defaultOpt);
  
  // Add options from data
  options.forEach(option => {
    const optElement = document.createElement('option');
    optElement.value = option;
    optElement.textContent = option;
    selectElement.appendChild(optElement);
  });
}

function populateDatalist(datalistElement, options) {
  // Clear existing options
  datalistElement.innerHTML = '';
  
  // Add options from data
  options.forEach(option => {
    const optElement = document.createElement('option');
    optElement.value = option;
    datalistElement.appendChild(optElement);
  });
}

function initializeEventListeners() {
  // Add event listeners to all filter elements
  document.getElementById('sessionName').addEventListener('change', displayCards);
  document.getElementById('presenter').addEventListener('input', displayCards);
  document.getElementById('room').addEventListener('change', displayCards);
  document.getElementById('sessionTime').addEventListener('change', displayCards);
}

function displayCards() {
  // Get filter values
  const selectedSessionName = document.getElementById('sessionName').value;
  const selectedPresenter = document.getElementById('presenter').value;
  const selectedRoom = document.getElementById('room').value;
  const selectedTime = document.getElementById('sessionTime').value;
  
  // Filter the data based on selections
  const filteredData = mockData.filter(session => {
    // Check if session matches all selected filters
    const matchesSessionName = !selectedSessionName || session.sessionName === selectedSessionName;
    const matchesPresenter = !selectedPresenter || session.speaker === selectedPresenter;
    const matchesRoom = !selectedRoom || session.room === selectedRoom;
    const matchesTime = !selectedTime || session.time === selectedTime;
    
    return matchesSessionName && matchesPresenter && matchesRoom && matchesTime;
  });
  
  // Get the card grid container
  const cardGrid = document.querySelector('.card-grid');
  
  // Clear existing cards
  cardGrid.innerHTML = '';
  
  // Create and append cards for filtered data
  filteredData.forEach(session => {
    const card = createCard(session);
    cardGrid.appendChild(card);
  });
}

function createCard(session) {
  // Extract time from the time slot (e.g., "10:00 AM - 11:00 AM" -> "10:00 AM")
  const startTime = session.time.split(' - ')[0];
  
  // Create card element
  const card = document.createElement('div');
  card.className = 'card';
  
  card.innerHTML = `
    <div class="card-top">
      <div class="card-title">${session.topic}</div>
      <div class="card-subtitle">${session.speaker}</div>
    </div>
    <hr>
    <div class="card-mid">
      <span>${startTime}</span>
      <span>${session.room}</span>
    </div>
    <hr>
    <div class="card-bottom">
      <p>Beginning: ${session.viewCount.start}</p>
      <hr>
      <p>Middle: ${session.viewCount.middle}</p>
      <hr>
      <p>End: ${session.viewCount.end}</p>
    </div>
  `;
  
  return card;
}