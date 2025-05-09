window.addEventListener("DOMContentLoaded", initializeApp);

// Mock data for sessions
const mockData = [
  {
    sessionId: 1,
    sessionName: "Introduction to JavaScript",
    speaker: "John Doe",
    time: "10:00 AM - 11:00 AM",
    topic: "Introduction to JavaScript",
    room: "Room A",
    viewCount: { start: 50, middle: 35, end: 20 },
  },
  {
    sessionId: 2,
    sessionName: "Advanced CSS Techniques",
    speaker: "Jane Smith",
    time: "11:30 AM - 12:30 PM",
    topic: "Advanced CSS Techniques",
    room: "Room B",
    viewCount: { start: 40, middle: 30, end: 25 },
  },
  {
    sessionId: 3,
    sessionName: "React for Beginners",
    speaker: "Alice Johnson",
    time: "1:00 PM - 2:00 PM",
    topic: "React for Beginners",
    room: "Room A",
    viewCount: { start: 60, middle: 50, end: 45 },
  },
  {
    sessionId: 4,
    sessionName: "Node.js Best Practices",
    speaker: "Bob Brown",
    time: "2:30 PM - 3:30 PM",
    topic: "Node.js Best Practices",
    room: "Room C",
    viewCount: { start: 30, middle: 20, end: 15 },
  },
  {
    sessionId: 5,
    sessionName: "UX Design Principles",
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
  // Gets unique values for dropdowns
  const sessionNames = [...new Set(mockData.map(session => session.sessionName))];
  const presenters = [...new Set(mockData.map(session => session.speaker))];
  const rooms = [...new Set(mockData.map(session => session.room))];
  const timeSlots = [...new Set(mockData.map(session => session.time))];

  window.filterOptions = {
    sessionNames,
    presenters,
    rooms,
    timeSlots
  };

  const sessionNameDropdown = document.getElementById('sessionName');
  populateSelect(sessionNameDropdown, sessionNames, 'Select a Session');

  const presentersList = document.getElementById('presenters');
  populateDatalist(presentersList, presenters);

  const roomDropdown = document.getElementById('room');
  populateSelect(roomDropdown, rooms, 'Select a Room');


  const timeSlotDropdown = document.getElementById('sessionTime');
  populateSelect(timeSlotDropdown, timeSlots, 'Select a Time');
}

function populateSelect(selectElement, options, defaultOption) {
  selectElement.innerHTML = '';

  const defaultOpt = document.createElement('option');
  defaultOpt.value = '';
  defaultOpt.textContent = defaultOption;
  selectElement.appendChild(defaultOpt);

  options.forEach(option => {
    const optElement = document.createElement('option');
    optElement.value = option;
    optElement.textContent = option;
    selectElement.appendChild(optElement);
  });
}

function populateDatalist(datalistElement, options) {
  datalistElement.innerHTML = '';

  options.forEach(option => {
    const optElement = document.createElement('option');
    optElement.value = option;
    datalistElement.appendChild(optElement);
  });
}

function initializeEventListeners() {
  document.getElementById('sessionName').addEventListener('change', function () {
    autoFillBasedOnSelection('sessionName');
  });

  document.getElementById('presenter').addEventListener('input', function () {
    setTimeout(() => autoFillBasedOnSelection('presenter'), 100);
  });

  document.getElementById('room').addEventListener('change', function () {
    autoFillBasedOnSelection('room');
  });

  document.getElementById('sessionTime').addEventListener('change', function () {
    autoFillBasedOnSelection('sessionTime');
  });
}

function displayCards() {
  // Get filter values
  const selectedSessionName = document.getElementById('sessionName').value;
  const selectedPresenter = document.getElementById('presenter').value;
  const selectedRoom = document.getElementById('room').value;
  const selectedTime = document.getElementById('sessionTime').value;
  const cardGrid = document.querySelector('.card-grid');
  cardGrid.innerHTML = '';

  // Checks if all dropdows are filled
  if (!selectedSessionName || !selectedPresenter || !selectedRoom || !selectedTime) {
    const messageElement = document.createElement('div');
    messageElement.className = 'filter-message';
    messageElement.textContent = 'Please select options for all filters to view sessions';
    cardGrid.appendChild(messageElement);
    return;
  }

  // Filter based on selection
  const filteredData = mockData.filter(session => {
    const matchesSessionName = session.sessionName === selectedSessionName;
    const matchesPresenter = session.speaker === selectedPresenter;
    const matchesRoom = session.room === selectedRoom;
    const matchesTime = session.time === selectedTime;

    return matchesSessionName && matchesPresenter && matchesRoom && matchesTime;
  });

  if (filteredData.length === 0) {
    const noResultsMessage = document.createElement('div');
    noResultsMessage.className = 'no-results-message';
    noResultsMessage.textContent = 'No sessions match all selected criteria';
    cardGrid.appendChild(noResultsMessage);
  } else {
    filteredData.forEach(session => {
      const card = createCard(session);
      cardGrid.appendChild(card);
    });
  }
}

function createCard(session) {
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

function autoFillBasedOnSelection(changedFieldId) {
  const selectedSessionName = document.getElementById('sessionName').value;
  const selectedPresenter = document.getElementById('presenter').value;
  const selectedRoom = document.getElementById('room').value;
  const selectedTime = document.getElementById('sessionTime').value;

  let matchingSessions = [];

  switch (changedFieldId) {
    case 'sessionName':
      matchingSessions = mockData.filter(session => session.sessionName === selectedSessionName);
      break;
    case 'presenter':
      matchingSessions = mockData.filter(session => session.speaker === selectedPresenter);
      break;
    case 'room':
      matchingSessions = mockData.filter(session => session.room === selectedRoom);
      break;
    case 'sessionTime':
      matchingSessions = mockData.filter(session => session.time === selectedTime);
      break;
  }

  if (matchingSessions.length > 0) {
    const sessionToUse = matchingSessions[0];

    if (changedFieldId !== 'sessionName') {
      document.getElementById('sessionName').value = sessionToUse.sessionName;
    }

    if (changedFieldId !== 'presenter') {
      document.getElementById('presenter').value = sessionToUse.speaker;
    }

    if (changedFieldId !== 'room') {
      document.getElementById('room').value = sessionToUse.room;
    }

    if (changedFieldId !== 'sessionTime') {
      document.getElementById('sessionTime').value = sessionToUse.time;
    }
  }

  displayCards();
}