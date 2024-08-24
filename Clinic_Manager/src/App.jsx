import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import SignInPage from './components/SignIn';
import HomePage from './components/HomePage';
import SignUpPage from './components/SignUp';
import Header from './components/Header';
import './App.css'

const App = () => {
  return (
    <Router>
      <Header />
      <div className="app-container" style={{ paddingTop: '60px' , paddingLeft: '20px', paddingRight: '20px' }}>
      {/* Add padding top to avoid content being hidden behind the fixed header */}
      </div>
      <Routes>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/" element={
        <> 
          <SignedIn>
          <div>
          <HomePage />
          </div> 
          </SignedIn>
          <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </> 
          } />
       
        <Route 
          path="/profile" 
          element={
            <SignedIn>
            </SignedIn>
          } 
        />
        <Route
          path="*" 
          element={<RedirectToSignIn />} 
        />
      </Routes>
    </Router>
  );
};

export default App;


