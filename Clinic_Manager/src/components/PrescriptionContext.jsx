// src/PrescriptionContext.js
import React, { createContext, useContext, useState } from 'react';

// Create Context
const PrescriptionContext = createContext();

// Create Provider Component
export const PrescriptionProvider = ({ children }) => {
    const [prescriptions, setPrescriptions] = useState([]);

    const addPrescription = async (prescription) => {
        const response = await fetch('http://localhost:3001/api/prescriptions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(prescription),
        });

        if (response.ok) {
            const newPrescription = await response.json();
            setPrescriptions((prev) => [...prev, newPrescription]);
            console.log("Prescription added:", newPrescription);
        } else {
            console.error("Failed to add prescription:", response.statusText);
        }
    };

    return (
        <PrescriptionContext.Provider value={{ prescriptions, addPrescription }}>
            {children}
        </PrescriptionContext.Provider>
    );
};

// Custom hook to use the PrescriptionContext
export const usePrescriptions = () => {
    return useContext(PrescriptionContext);
};
