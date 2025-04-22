window.addEventListener("DOMContentLoaded", populateMockData);
function populateMockData() {
    const mockData = [
      {
        sessionId: 1,
        speaker: "John Doe",
        time: "10:00 AM - 11:00 AM",
        topic: "Introduction to JavaScript",
        room: "Room A",
        viewCount: { start: 50, middle: 35, end: 20 },
      },
      {
        sessionId: 2,
        speaker: "Jane Smith",
        time: "11:30 AM - 12:30 PM",
        topic: "Advanced CSS Techniques",
        room: "Room B",
        viewCount: { start: 40, middle: 30, end: 25 },
      },
      {
        sessionId: 3,
        speaker: "Alice Johnson",
        time: "1:00 PM - 2:00 PM",
        topic: "React for Beginners",
        room: "Room A",
        viewCount: { start: 60, middle: 50, end: 45 },
      },
      {
        sessionId: 4,
        speaker: "Bob Brown",
        time: "2:30 PM - 3:30 PM",
        topic: "Node.js Best Practices",
        room: "Room C",
        viewCount: { start: 30, middle: 20, end: 15 },
      },
      {
        sessionId: 5,
        speaker: "Emily Davis",
        time: "4:00 PM - 5:00 PM",
        topic: "UX Design Principles",
        room: "Room B",
        viewCount: { start: 70, middle: 60, end: 50 },
      },
    ];
  
    // Populates the table with mock data
    const tableBody = document.querySelector("#dataTable tbody");
  
    //Clears existing rows
    tableBody.innerHTML = "";
  
    mockData.forEach(session => {
      const row = document.createElement("tr");
  
      // Split speaker into first and last name
      const [firstName, lastName] = session.speaker.split(" ");
  
      const data = [
        `Session ${session.sessionId}`,
        session.time,
        firstName,
        lastName,
        session.room,
        session.viewCount.start + session.viewCount.middle + session.viewCount.end, // capacity
        session.viewCount.start,
        session.viewCount.middle,
        session.viewCount.end,
      ];
  
      data.forEach(value => {
        const td = document.createElement("td");
        td.textContent = value;
        row.appendChild(td);
      });
  
      tableBody.appendChild(row);
    });

  }