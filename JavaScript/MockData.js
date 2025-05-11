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
  // Initial display
  displaySessionDetails();
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

  const presenterDropdown = document.getElementById('presenter');
  populateSelect(presenterDropdown, presenters, 'Select a Presenter');

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

function initializeEventListeners() {
  document.getElementById('sessionName').addEventListener('change', function() {
    autoFillBasedOnSelection('sessionName');
  });

  document.getElementById('presenter').addEventListener('change', function() {
    autoFillBasedOnSelection('presenter');
  });

  document.getElementById('room').addEventListener('change', function() {
    autoFillBasedOnSelection('room');
  });

  document.getElementById('sessionTime').addEventListener('change', function() {
    autoFillBasedOnSelection('sessionTime');
  });
}

function displaySessionDetails() {
  // Get filter values
  const selectedSessionName = document.getElementById('sessionName').value;
  const selectedPresenter = document.getElementById('presenter').value;
  const selectedRoom = document.getElementById('room').value;
  const selectedTime = document.getElementById('sessionTime').value;
  const roomDetailsContainer = document.querySelector('.room-details');
  
  // Check if any dropdown is selected
  if (!selectedSessionName && !selectedPresenter && !selectedRoom && !selectedTime) {
    // If no dropdown is selected, leave the default HTML content
    return;
  }

  // Filter based on selections
  const filteredData = mockData.filter(session => {
    const matchesSessionName = !selectedSessionName || session.sessionName === selectedSessionName;
    const matchesPresenter = !selectedPresenter || session.speaker === selectedPresenter;
    const matchesRoom = !selectedRoom || session.room === selectedRoom;
    const matchesTime = !selectedTime || session.time === selectedTime;

    return matchesSessionName && matchesPresenter && matchesRoom && matchesTime;
  });

  if (filteredData.length === 0) {
    roomDetailsContainer.innerHTML = `
      <div class="no-results-message">
        <p>No sessions match the selected criteria</p>
      </div>
    `;
  } else {
    // Show the first matching session
    const session = filteredData[0];
    
    // Extract just the start time from the time range
    const startTime = session.time.split(' - ')[0];
    
    // Update the room-details with the session information
    roomDetailsContainer.innerHTML = `
      <div class="room-header">
        <p class="session-title">${session.sessionName}</p>
        <p class="presenter-name">${session.speaker}</p>
      </div>
      <hr>
      <div class="room-info">
        <p class="room-title">${session.room}</p>
        <p class="session-time">${startTime}</p>
      </div>
      <hr>
      <div class="attendance">
        <div class="attendance-item">
          <span>Beginning: ${session.viewCount.start}</span>
        </div>
        <div class="attendance-item">
          <span>Middle: ${session.viewCount.middle}</span>
        </div>
        <div class="attendance-item">
          <span>End: ${session.viewCount.end}</span>
        </div>
      </div>
    `;
  }
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

  if (matchingSessions.length === 1) {
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

  // Update display after auto-filling
  displaySessionDetails();
}