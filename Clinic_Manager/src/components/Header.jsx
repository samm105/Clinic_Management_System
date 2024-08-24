import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useClerk } from '@clerk/clerk-react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { usePrescriptions } from './PrescriptionContext'; // Import the context
import 'primeicons/primeicons.css';
import './Header.css'; // Ensure you create this CSS file for styling


const Header = ({ onAddPatient }) => {
    const { signOut } = useClerk();
    const { addPrescription } = usePrescriptions(); // Use the context
    const [isPrescriptionDialogVisible, setPrescriptionDialogVisible] = useState(false);
    const [prescriptionDetails, setPrescriptionDetails] = useState({
        token: '', // Add the token field here
        patientName: '',
        medication: '',
        dosage: '',
        instructions: ''
    });

    const handleSignOut = async () => {
        await signOut();
        window.location.href = '/sign-in';
    };

    const handleAddPrescriptionClick = () => {
      setPrescriptionDialogVisible(true);
  };

  const handleDialogHide = () => {
      setPrescriptionDialogVisible(false);
      resetPrescriptionForm(); // Reset form when dialog is closed
  };

  const handlePrescriptionChange = (e) => {
      const { name, value } = e.target;
      setPrescriptionDetails(prevDetails => ({
          ...prevDetails,
          [name]: value
      }));
  };

  const handleSubmitPrescription = async () => {
    await addPrescription({
        token: prescriptionDetails.token, // Add token number
        medication: prescriptionDetails.medication,
        dosage: prescriptionDetails.dosage,
        instructions: prescriptionDetails.instructions
    });
      console.log('Prescription submitted:', prescriptionDetails);
      // You can now send this data to your MongoDB database
      setPrescriptionDialogVisible(false);
  };

  const resetPrescriptionForm = () => {
    setPrescriptionDetails({
        token: '',
        patientName: '',
        medication: '',
        dosage: '',
        instructions: ''
    });
};

  const renderFooter = () => (
      <div>
          <Button label="Cancel" icon="pi pi-times" onClick={handleDialogHide} className="p-button-text" />
          <Button label="Submit" icon="pi pi-check" onClick={handleSubmitPrescription} className="p-button-text" />
      </div>
  );

  return (
    <header className="header">
     <div className="header-container">
     <div className="app-name">
        Clinic Manager 
        </div>
        <nav className="navigation">
          <ul>
            <li className="dropdown">
              <button className="dropbtn">
                <i className="pi pi-bars"></i> Account
              </button>
              <div className="dropdown-content">
              <Link to="#" onClick={onAddPatient} className="dropdown-item">
                                    <i className="pi pi-user-plus"></i> Add Patient
                                </Link>
                                <Link to="#" onClick={handleAddPrescriptionClick} className="dropdown-item">
                                    <i className="pi pi-book-medical"></i> Add Prescription
                                </Link>
              <Link to="#" onClick={handleSignOut} className="dropdown-content">
                  <i className="pi pi-sign-out"></i> Sign Out
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </div>
      <Dialog
                header="Add Prescription"
                visible={isPrescriptionDialogVisible}
                style={{ width: '50vw' }}
                footer={renderFooter()}
                onHide={handleDialogHide}
            >
                <div className="p-fluid">
                    <div className="p-field">
                    <label htmlFor="token">Token No.</label>
                    <InputText
                        id="token"
                        name="token"
                        value={prescriptionDetails.token}
                        onChange={handlePrescriptionChange}
                    />
                </div>
                    <div className="p-field">
                        <label htmlFor="medication">Medication</label>
                        <InputText
                            id="medication"
                            name="medication"
                            value={prescriptionDetails.medication}
                            onChange={handlePrescriptionChange}
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="dosage">Dosage</label>
                        <InputText
                            id="dosage"
                            name="dosage"
                            value={prescriptionDetails.dosage}
                            onChange={handlePrescriptionChange}
                        />
                    </div>
                    <div className="p-field">
                        <label htmlFor="instructions">Instructions</label>
                        <InputTextarea
                            id="instructions"
                            name="instructions"
                            value={prescriptionDetails.instructions}
                            onChange={handlePrescriptionChange}
                            rows={3}
                            cols={30}
                        />
                    </div>
                </div>
            </Dialog>
  </header>
  );
};

export default Header;
