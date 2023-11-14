import React, { useEffect, useState } from "react";
import axios from "axios";

function Datatable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/mountainsall");
      setData(response.data);
    } catch (error) {
      console.error("Greška pri dohvaćanju podataka:", error);
    }
  };

  const downloadData = (format) => {
    if (format === "csv") {
      const csvContent =
        "data:text/csv;charset=utf-8," +
        data.map((row) => Object.values(row).join(",")).join("\n");

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "podaci.csv");
      document.body.appendChild(link);
      link.click();
    } else if (format === "json") {
      const jsonContent = JSON.stringify(data, null, 2);

      const blob = new Blob([jsonContent], { type: "application/json" });
      const link = document.createElement("a");
      link.setAttribute("href", URL.createObjectURL(blob));
      link.setAttribute("download", "podaci.json");
      document.body.appendChild(link);
      link.click();
    }
  };

  return (
    <div>
      <button onClick={() => downloadData("csv")}>Preuzmi CSV</button>
      <button onClick={() => downloadData("json")}>Preuzmi JSON</button>
    </div>
  );
}

export default Datatable;
