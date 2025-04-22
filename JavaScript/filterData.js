document.getElementById("filter-button").addEventListener("click", () => {
    const table = document.getElementById("dataTable");
    const tbody = table.querySelector("tbody");
    const rows = Array.from(tbody.querySelectorAll("tr"));
  
    // Sort rows by the "Time Slot" column (index 1)
    rows.sort((rowA, rowB) => {
      const timeA = rowA.cells[1].textContent.trim();
      const timeB = rowB.cells[1].textContent.trim();
      return timeA.localeCompare(timeB); // Sort alphabetically
    });
  
    // Clear the table body and append sorted rows
    tbody.innerHTML = "";
    rows.forEach(row => tbody.appendChild(row));
  });