const getData = async () => {
  try {
    const url = `https://jsonplaceholder.typicode.com/posts`;
    const response = await fetch(url);
    const data = await response.json();

    renderTable(data);
  } catch (error) {
    console.log(error);
  }
};

const renderTable = (loadedData) => {
  const main = document.querySelector(".main");

  const table = document.createElement("table");
  table.classList.add("custom-table");

  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  const headers = ["User ID", "ID", "Title", "Body"];
  const headerRow = document.createElement("tr");
  headers.forEach((headerText) => {
    const th = document.createElement("th");
    th.textContent = headerText;
    th.classList.add("table-header");
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  loadedData.forEach((item) => {
    const row = document.createElement("tr");
    row.classList.add("table-row");
    Object.values(item).forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      cell.classList.add("table-cell");
      row.appendChild(cell);
    });
    tbody.appendChild(row);
  });

  table.appendChild(tbody);
  main.appendChild(table);
};

getData();
