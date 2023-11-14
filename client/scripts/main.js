let filterText = document.getElementById("filterText");
let filterAttribute = document.getElementById("filterAttribute");
let mountainTableBody = document.querySelector("#mountainTable tbody");

let listOfMountains = [];
let filteredMountains = [];

fetchData();

function fetchData() {
  fetch("http://localhost:3001/mountainsall")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      listOfMountains = data;
      displayData(listOfMountains);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function filterData() {
  let filterTextValue = filterText.value.toLowerCase();
  let filterAttributeValue = filterAttribute.value.toLowerCase();

  if (!filterTextValue && filterAttributeValue === "all") {
    setFilteredMountains(listOfMountains);
    return;
  }

  filteredMountains = listOfMountains.filter((mountain) => {
    if (filterAttributeValue === "mountain_name") {
      return mountain.mountain_name.toLowerCase().includes(filterTextValue);
    } else if (filterAttributeValue === "country") {
      return mountain.country.toLowerCase().includes(filterTextValue);
    } else {
      for (const key in mountain) {
        if (Object.prototype.hasOwnProperty.call(mountain, key)) {
          const attributeValue = mountain[key].toString().toLowerCase();
          if (attributeValue.includes(filterTextValue)) {
            return true;
          }
        }
      }
    }

    return false;
  });

  displayData(filteredMountains);
}

function displayData(mountains) {
  mountainTableBody.innerHTML = "";

  mountains.forEach(function (mountain) {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${mountain.mountain_name}</td>
          <td>${mountain.country}</td>
          <td>${mountain.height}</td>
          <td>${mountain.mountain_description}</td>
          <td>${mountain.highest_peak}</td>
        `;
    mountainTableBody.appendChild(row);
  });
}

function downloadData(format) {
  const dataToDownload = filterText.value ? filteredMountains : listOfMountains;

  if (format === "csv") {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      dataToDownload.map((row) => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "podaci.csv");
    document.body.appendChild(link);
    link.click();
  } else if (format === "json") {
    const jsonContent = JSON.stringify(dataToDownload, null, 2);

    const blob = new Blob([jsonContent], { type: "application/json" });
    const link = document.createElement("a");
    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute("download", "podaci.json");
    document.body.appendChild(link);
    link.click();
  }
}
