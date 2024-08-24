import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PatientRecordsProvider } from './components/PatientRecordsContext';
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';        
import 'primeicons/primeicons.css';
import { PrescriptionProvider } from './components/PrescriptionContext';
        

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

console.log('Publishable Key:', PUBLISHABLE_KEY); 

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} >
    <PrimeReactProvider>
    <PatientRecordsProvider>
     <PrescriptionProvider>  
      <App />
      </PrescriptionProvider> 
      </PatientRecordsProvider>
      </PrimeReactProvider>
    </ClerkProvider>
  </React.StrictMode>
);
