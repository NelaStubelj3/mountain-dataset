import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
  const [filterText, setFilterText] = useState("");
  const [filterAttribute, setFilterAttribute] = useState("all");
  const [filteredMountains, setFilteredMountains] = useState([
    "mountain_name",
    "country",
  ]);

  const [listOfMountainsAll, setlistOfMountainsAll] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/mountainsall").then((response) => {
      setlistOfMountainsAll(response.data);
    });
  }, []);

  const filterData = () => {
    if (!filterText && filterAttribute === "all") {
      setFilteredMountains(listOfMountainsAll);
      return;
    }

    const filteredData = listOfMountainsAll.filter((mountain) => {
      const filterTextLower = filterText.toLowerCase();

      if (!filterText && !filterAttribute) {
        return true;
      }

      if (filterAttribute === "mountain_name") {
        return mountain.mountain_name.toLowerCase().includes(filterTextLower);
      } else if (filterAttribute === "country") {
        return mountain.country.toLowerCase().includes(filterTextLower);
      }
      // Prolazak kroz sve atribute svake planine
      for (const key in mountain) {
        if (Object.prototype.hasOwnProperty.call(mountain, key)) {
          const attributeValue = mountain[key].toString().toLowerCase();

          if (attributeValue.includes(filterTextLower)) {
            return true;
          }
        }
      }

      return false; // Ako niti jedan od uvjeta nije zadovoljen
    });

    setFilteredMountains(filteredData);
  };

  // ...

  const downloadData = (format) => {
    const filteredData = filterText ? filteredMountains : listOfMountainsAll;

    if (format === "csv") {
      const csvContent =
        "data:text/csv;charset=utf-8," +
        filteredData.map((row) => Object.values(row).join(",")).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "mountains.csv");
      document.body.appendChild(link);
      link.click();
    } else if (format === "json") {
      const jsonContent = JSON.stringify(filteredData, null, 2);

      const blob = new Blob([jsonContent], { type: "application/json" });
      const link = document.createElement("a");
      link.setAttribute("href", URL.createObjectURL(blob));
      link.setAttribute("download", "mountains.json");
      document.body.appendChild(link);
      link.click();
    }
  };

  return (
    <div className="App">
      <form onSubmit={filterData}>
        <label htmlFor="filterText">Unesite tekst za pretragu:</label>
        <input
          type="text"
          id="filterText"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Unesite tekst"
        />

        <label htmlFor="filterAttribute">Odaberite atribut za pretragu:</label>
        <select
          id="filterAttribute"
          value={filterAttribute}
          onChange={(e) => setFilterAttribute(e.target.value)}
        >
          <option value="all">Svi atributi</option>
          <option value="mountain_name">Ime planine</option>
          <option value="country">Država</option>
        </select>

        <button type="button" onClick={(filterText) => filterData()}>
          Pretraži
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Mountain name</th>
            <th>Country</th>
            <th>Height</th>
            <th>Highest peak</th>
            <th>Trail name</th>
          </tr>
        </thead>
        <tbody>
          {filteredMountains.map((value, index) => (
            <tr key={index}>
              <td>{value.mountain_name}</td>
              <td>{value.country}</td>
              <td>{value.height}</td>
              <td>{value.highest_peak}</td>
              <td>{value.trail_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={() => downloadData("csv")}>
        Preuzmi CSV
      </button>

      <button type="button" onClick={() => downloadData("json")}>
        Preuzmi JSON
      </button>
    </div>
  );
}

export default Home;
