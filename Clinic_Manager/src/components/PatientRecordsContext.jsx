import { createContext, useContext, useEffect, useState } from "react";

// Define the PatientRecord type
export const PatientRecordsContext = createContext(undefined);

export const PatientRecordsProvider = ({ children }) => {
  const [records, setRecords] = useState([]);

  const addRecord = async (record) => {
    console.log("Adding record:", records);
    const response = await fetch("http://localhost:3001/api/patients", {
      method: "POST",
      body: JSON.stringify(record),
      headers: {
        "Content-Type": "application/json",
      },
    });

    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) => [...prev, newRecord]);
      }
    } catch (err) {
      console.error("Error adding patient record:", err);
    }
  };

  const updateRecord = async (id, newRecord) => {
    const response = await fetch(
      `http://localhost:3001/api/patients/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(newRecord),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    try {
      if (response.ok) {
        const updatedRecord = await response.json();
        setRecords((prev) =>
          prev.map((record) =>
            record._id === id ? updatedRecord : record
          )
        );
      }
    } catch (err) {
      console.error("Error updating patient record:", err);
    }
  };

  const deleteRecord = async (id) => {
    const response = await fetch(
      `http://localhost:3001/api/patients/${id}`,
      {
        method: "DELETE",
      }
    );

    try {
      if (response.ok) {
        setRecords((prev) =>
          prev.filter((record) => record._id !== id)
        );
      }
    } catch (err) {
      console.error("Error deleting patient record:", err);
    }
  };

  return (
    <PatientRecordsContext.Provider
      value={{ records, addRecord, updateRecord, deleteRecord }}
    >
      {children}
    </PatientRecordsContext.Provider>
  );
};

export const usePatientRecords = () => {
  const context = useContext(PatientRecordsContext);

  if (!context) {
    throw new Error(
      "usePatientRecords must be used within a PatientRecordsProvider"
    );
  }

  return context;
};
