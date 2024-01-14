let filterText = document.getElementById("filterText");
let filterAttribute = document.getElementById("filterAttribute");
let mountainTableBody = document.querySelector("#mountainTable tbody");

let listOfMountains = [];
let filteredMountains = [];

fetchData();

function toggleForm() {
  const form = document.getElementById("createMountainForm");
  form.style.display = form.style.display === "none" ? "block" : "none";
}
function toggleUpdateForm() {
  const form = document.getElementById("updateMountainForm");
  form.style.display = form.style.display === "none" ? "block" : "none";
}

function testCreate() {
  console.log("Mountain Name:", document.getElementById("mountainName").value);

  const newMountain = {
    mountain_id: parseInt(document.getElementById("mountainId").value),
    mountain_name: document.getElementById("mountainName").value,
    country: document.getElementById("country").value,
    height: parseFloat(document.getElementById("height").value),
    mountain_description: document.getElementById("mountainDescription").value,
    highest_peak: document.getElementById("highestPeak").value,
    trail_id: parseInt(document.getElementById("trailId").value),
    trail_name: document.getElementById("trailName").value,
    trail_description: document.getElementById("trailDescription").value,
    difficulty: document.getElementById("difficulty").value,
    length: parseFloat(document.getElementById("length").value),
    elevation_gain: parseFloat(document.getElementById("elevationGain").value),
  };

  axios
    .post("http://localhost:3001/api/mountainsall", newMountain)
    .then((response) => {
      console.log("Create Response:", response.data);
    })
    .catch((error) => {
      console.error("Error creating mountain:", error);
    });
}

function testRead() {
  axios
    .get("http://localhost:3001/api/mountainsall")
    .then((response) => {
      console.log("Read Response:", response.data);
      displayData(response.data.response);
    })
    .catch((error) => {
      console.error("Error fetching mountain data:", error);
    });
}

function testUpdate() {
  const updatedMountain = {
    mountain_id: parseInt(document.getElementById("updateMountainId").value),
    mountain_name: document.getElementById("updateMountainName").value,
    country: document.getElementById("updateCountry").value,
    height: parseFloat(document.getElementById("updateHeight").value),
    mountain_description: document.getElementById("updateMountainDescription")
      .value,
    highest_peak: document.getElementById("updateHighestPeak").value,
    trail_id: parseInt(document.getElementById("updateTrailId").value),
    trail_name: document.getElementById("updateTrailName").value,
    trail_description: document.getElementById("updateTrailDescription").value,
    difficulty: document.getElementById("updateDifficulty").value,
    length: parseFloat(document.getElementById("updateLength").value),
    elevation_gain: parseFloat(
      document.getElementById("updateElevationGain").value
    ),
  };
  trailIdToUpdate = document.getElementById("updateTrailId").value;
  axios
    .put(
      `http://localhost:3001/api/mountainsall/${trailIdToUpdate}`,
      updatedMountain
    )
    .then((response) => {
      console.log("Update Response:", response.data);
    })
    .catch((error) => {
      console.error("Error updating mountain:", error);
    });
}

function testDelete() {
  const trailIdToDelete = document.getElementById("trailIdToDelete").value;
  axios
    .delete(`http://localhost:3001/api/mountainsall/${trailIdToDelete}`)
    .then((response) => {
      console.log("Delete Response:", response.data);
    })
    .catch((error) => {
      console.error("Error deleting mountain:", error);
    });
}

async function fetchData() {
  try {
    const response = await axios.get("http://localhost:3001/api/mountainsall");
    if (response.data.status === "OK") {
      const mountainsWithTrails = response.data.response;
      const listOfMountains = mountainsWithTrails.reduce((acc, mountain) => {
        const trails = mountain.Trails.map((trail) => ({
          ...trail,
          mountain_id: mountain.mountain_id,
          mountain_name: mountain.mountain_name,
          country: mountain.country,
          height: mountain.height,
          mountain_description: mountain.mountain_description,
          highest_peak: mountain.highest_peak,
        }));

        return [...acc, ...trails];
      }, []);
      displayData(listOfMountains);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function testReadWithFilter() {
  const testAttribute = document.getElementById("testAttribute").value;
  const filterText = document.getElementById("testRead").value;

  let difficultyMessage = "";

  if (testAttribute === "difficulty") {
    const validDifficultyValues = ["easy", "moderate", "hard"];
    if (!validDifficultyValues.includes(filterText.toLowerCase())) {
      difficultyMessage =
        "Please enter a valid difficulty: Easy, Moderate, or Hard.";
    }
  }

  const endpoint =
    testAttribute === "trail_id"
      ? `http://localhost:3001/api/mountainsall/${parseInt(filterText, 10)}`
      : `http://localhost:3001/api/mountainsall/${testAttribute}/${filterText.toLowerCase()}`;

  axios
    .get(endpoint)
    .then((response) => {
      console.log(`Read ${testAttribute} Response:`, response.data);
      displayData(response.data.response);
    })
    .catch((error) => {
      console.error(`Error fetching ${testAttribute} mountain data:`, error);
    });
}

function filterData() {
  const filterTextValue = filterText.value.toLowerCase();
  const filterAttributeValue = filterAttribute.value.toLowerCase();

  if (!filterTextValue && filterAttributeValue === "all") {
    displayData(listOfMountains);
    return;
  }

  filteredMountains = listOfMountains.filter((mountain) => {
    if (filterAttributeValue === "mountain_name") {
      return mountain.mountain_name.toLowerCase().includes(filterTextValue);
    } else if (filterAttributeValue === "country") {
      return mountain.country.toLowerCase().includes(filterTextValue);
    } else if (filterAttributeValue === "trail_id") {
      return mountain.trail_id.toLowerCase().includes(filterTextValue);
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
  <td>${mountain.mountain_id}</td>
  <td>${mountain.mountain_name}</td>
  <td>${mountain.country}</td>
  <td>${mountain.height}</td>
  <td>${mountain.mountain_description}</td>
  <td>${mountain.highest_peak}</td>
  <td>${mountain.trail_id}</td>
  <td>${mountain.trail_name}</td>
  <td>${mountain.trail_description}</td>
  <td>${mountain.difficulty}</td>
  <td>${mountain.length}</td>
  <td>${mountain.elevation_gain}</td>

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
