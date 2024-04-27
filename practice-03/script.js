let loadedData = [];
let sortKey = null;
let sortDirection = "asc";

const input = document.querySelector(".input");
input.addEventListener("input", () => {
  const searchText = input.value.trim().toLowerCase();

  if (searchText.length < 3) return;

  const filteredData = loadedData.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchText)
    )
  );

  renderTable(filteredData);
});

const fetchData = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    loadedData = data;
    renderTable();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const renderTable = (data = loadedData) => {
  const table = document.createElement("table");
  table.classList.add("custom-table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const headers = ["userId", "id", "title", "body"];
  const headerRow = document.createElement("tr");

  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    th.classList.add("table-header");
    th.addEventListener("click", () => {
      sortTable(headerText);
      renderTable();
    });
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  let sortedData = data;

  if (sortKey) {
    sortedData = data.slice().sort((a, b) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];
      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortDirection === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
      }
    });
  }
  sortedData.forEach((item) => {
    const row = document.createElement("tr");
    row.classList.add("table-row");
    headers.forEach((headerText) => {
      const cell = document.createElement("td");
      cell.textContent = item[headerText];
      cell.classList.add("table-cell");
      row.appendChild(cell);
    });
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  document.body.innerHTML = "";
  document.body.appendChild(table);
  document.body.prepend(input);
  input.focus();
};
const sortTable = (key) => {
  if (sortKey === key) {
    sortDirection = sortDirection === "asc" ? "desc" : "asc";
  } else {
    sortKey = key;
    sortDirection = "asc";
  }
};

fetchData();
