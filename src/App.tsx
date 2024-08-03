import React from 'react';
import Home from './components/home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './components/hooks/AuthContext';
import ProtectedRoute from './components/utils/ProtectedRoute';

const Login = React.lazy(() => import('./components/login/Login'));
const Register = React.lazy(() => import('./components/register/Register'));
const Navbar = React.lazy(() => import('./components/dashboard/Navbar'));
const Dashboard = React.lazy(() => import('./components/dashboard/Dashboard'));

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <React.Suspense fallback={<></>}>
                  <Login />
                </React.Suspense>
              }
            />
            <Route
              path="/signup"
              element={
                <React.Suspense fallback={<></>}>
                  <Register />
                </React.Suspense>
              }
            />
            <Route
              path="/dashboard"
              element={
                <React.Suspense fallback={<></>}>
                  <ProtectedRoute>
                    <Navbar Component={Dashboard} home={true} albums={false} support={false} settings={false} />
                  </ProtectedRoute>
                </React.Suspense>
              }
            />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
