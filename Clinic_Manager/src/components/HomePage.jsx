import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useUser } from "@clerk/clerk-react";
import { usePatientRecords } from './PatientRecordsContext';
import { usePrescriptions } from './PrescriptionContext';
import Header from './Header';
import 'primereact/resources/themes/lara-light-blue/theme.css'; // Use this for the DataTable
import 'primereact/resources/primereact.min.css';         
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
        

const HomePage = () => {
  const [records, setRecords] = useState([]);
    const [viewDialogVisible, setViewDialogVisible] = useState(false);

    const [dialogVisible, setDialogVisible] = useState(false);
    const [patientDetails, setPatientDetails] = useState({ name: '', age: '', gender: '', visits: '', condition: '', history: '', token: '' });
    const [selectedPatient, setSelectedPatient] = useState(null);
    const { addRecord, deleteRecord  } = usePatientRecords();
    const [prescriptions, setPrescriptions] = useState([]);
    const { prescriptions: contextPrescriptions } = usePrescriptions();

    const { user } = useUser();

    // Function to fetch prescriptions for a patient
const fetchPrescriptions = async (token) => {
  const response = await fetch(`http://localhost:3001/api/prescriptions/${token}`);
  if (response.ok) {
      return await response.json();
  }
  console.error("Failed to fetch prescriptions:", response.statusText);
  return [];
};

    const fetchRecords = async () => {
      console.log("Fetching record:", records);
      if (!user) return;
      const response = await fetch(
        `http://localhost:3001/api/patients`
      );
  
      if (response.ok) {
        const records = await response.json();
        console.log("Fetched records:", records);
        console.log(records);
        setRecords(records);
      }
    };
  
    useEffect(() => {
      console.log("User object:", user);
      fetchRecords();
    }, [user]);
    
    const openDialog = () => {
          setDialogVisible(true);
        };
  
      const closeDialog = () => {
          setDialogVisible(false);
          setPatientDetails({ name: '', age: '', gender: '', visits: '', condition: '', history: '', token: '' }); // Reset form
      };

      const openViewDialog = async (patient) => {
        try{
        setSelectedPatient(patient);
        const patientPrescriptions =  await fetchPrescriptions(patient.token);
        setPrescriptions(patientPrescriptions);
        setViewDialogVisible(true);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
    }
    };

    const closeViewDialog = () => {
        setViewDialogVisible(false);
    };


      // Function to handle input changes
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setPatientDetails({ ...patientDetails, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPatientRecord = {
        name: patientDetails.name,
        age: parseInt(patientDetails.age),
        gender: patientDetails.gender,
        numberOfVisits: parseInt(patientDetails.visits),
        condition: patientDetails.condition,
        history: patientDetails.history,
        token: patientDetails.token,
    };

    // Call the addRecord function from the context
    addRecord(newPatientRecord);

    // Reset the form fields
    setPatientDetails({ name: '', age: '', gender: '', visits: '', condition: '', history: '', token: '' });

    closeDialog();
};
  const addPatient = (event) => {
    handleSubmit(event);
};

const handleDelete = async (id) => {
  if (window.confirm('Are you sure you want to delete this record?')) {
      await deleteRecord(id); // deleteRecord should be implemented in the context
      fetchRecords(); // Refresh records after deletion
  }
};

// Custom template for the Actions column
  const actionTemplate = (rowData) => {
    return (
      <div>
        <Button
          label="View Details"
          icon="pi pi-search"
          className="p-button-info"
          onClick={() => openViewDialog(rowData)}
        />
         <Button
                    label="Delete"
                    icon="pi pi-trash"
                    className="p-button-info"
                    onClick={() => handleDelete(rowData._id)} // Assuming _id is the unique identifier for each record
                />
      </div>
    );
  };   

  return (
    <>
    <div className="HomePage-Container">
      <h1>Patient Records</h1>
      <div className="datatable-wrapper">
                <DataTable value={records} paginator rows={5}>
                  <Column field="token" header="Token No."/>
                  <Column field="name" header="Name" />
                  <Column field="gender" header="Gender" />
                  <Column header="Actions" body={actionTemplate} />
                  {records.length < 5 &&
                    [...Array(5 - records.length)].map((_, index) => (
                      <tr key={`empty-row-${index}`} className="p-datatable-empty">
                        <td colSpan="4">&nbsp;</td>
                      </tr>
                    ))}
                </DataTable>
              </div>    
    </div>

    <Header onAddPatient={openDialog} /> {/* Pass openDialog as a prop */}
    

<Dialog header="Add Patient" visible={dialogVisible} style={{ width: '30vw' }} onHide={closeDialog}>
<div className="p-fluid">
    <div className="p-field">
        <label htmlFor="name">Name</label>
        <InputText id="name" name="name" value={patientDetails.name} onChange={handleInputChange} />
    </div>
    <div className="p-field">
        <label htmlFor="age">Age</label>
        <InputText id="age" name="age" value={patientDetails.age} onChange={handleInputChange} />
    </div>
    <div className="p-field">
            <label htmlFor="gender">Gender</label>
            <InputText id="gender" name="gender" value={patientDetails.gender} onChange={handleInputChange} />
      </div>
      <div className="p-field">
        <label htmlFor="token">Token</label>
        <InputText id="token" name="token" value={patientDetails.token} onChange={handleInputChange} />
    </div>
      <div className="p-field">
            <label htmlFor="visits">Number of Visits</label>
            <InputText
                id="visits"
                name="visits"
                value={patientDetails.visits}
                onChange={(e) => handleInputChange({ target: { name: 'visits', value: parseInt(e.target.value) || 0 } })}
                type="number"
            />
        </div>
    <div className="p-field">
        <label htmlFor="condition">Condition</label>
        <InputText id="condition" name="condition" value={patientDetails.condition} onChange={handleInputChange} />
    </div>
    <div className="p-field">
            <label htmlFor="history">History</label>
            <InputText
                id="history"
                name="history"
                value={patientDetails.history}
                onChange={handleInputChange}
                maxLength={500}
            />
            <small>{patientDetails.history?.length}/500 characters</small>
        </div>
</div>
<div className="p-d-flex p-jc-end">
    <Button label="Cancel" icon="pi pi-times" className="p-button-add-patient" onClick={closeDialog} />
    <Button label="Add" icon="pi pi-check" className="p-button-add-patient" onClick={addPatient} />
</div>
</Dialog>

            {/* View Details Dialog */}
            {selectedPatient && (
    <Dialog header="Patient Details" visible={viewDialogVisible} style={{ width: '30vw' }} onHide={closeViewDialog}>
        <div className="p-fluid">
            <div className="p-field">
                <label>Name:</label>
                <div className="p-text">{selectedPatient?.name || 'N/A'}</div> 
            </div>
            <div className="p-field">
                <label>Age:</label>
                <div className="p-text">{selectedPatient?.age || 'N/A'}</div>
            </div>
            <div className="p-field">
                <label>Gender:</label>
                <div className="p-text">{selectedPatient?.gender || 'N/A'}</div>
            </div>
            <div className="p-field">
                <label>Token:</label>
                <div className="p-text">{selectedPatient?.token || 'N/A'}</div>
            </div>
            <div className="p-field">
                <label>Number of Visits:</label>
                <div className="p-text">{selectedPatient?.numberOfVisits || 'N/A'}</div>
            </div>
            <div className="p-field">
                <label>Condition:</label>
                <div className="p-text">{selectedPatient?.condition || 'N/A'}</div>
            </div>
            <div className="p-field">
                <label>History:</label>
                <div className="p-text">{selectedPatient?.history || 'N/A'}</div>
            </div>
        </div>
        <div className="p-mt-3">
                        <h3>Prescriptions</h3>
                        {prescriptions.length > 0 ? (
                            <div className="p-d-flex p-flex-column">
                                {prescriptions.map((prescription) => (
                                    <div key={prescription._id} className="p-d-flex p-flex-column p-mb-2">
                                        <div><strong>Medication:</strong> {prescription.medication}</div>
                                        <div><strong>Dosage:</strong> {prescription.dosage}</div>
                                        <div><strong>instructions:</strong> {prescription.instructions}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No prescriptions found for this patient.</p>
                        )}
                    </div>
        <div className="p-d-flex p-jc-end">
            <Button label="Close" icon="pi pi-times" className="p-button-text" onClick={closeViewDialog} />
        </div>
    </Dialog>
)}  
</>
)};
export default HomePage;