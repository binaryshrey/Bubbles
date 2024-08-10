import React from 'react';
import Home from './components/home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './components/hooks/AuthContext';
import ProtectedRoute from './components/utils/ProtectedRoute';

const Login = React.lazy(() => import('./components/login/Login'));
const Register = React.lazy(() => import('./components/register/Register'));
const Navbar = React.lazy(() => import('./components/dashboard/Navbar'));
const Dashboard = React.lazy(() => import('./components/dashboard/Dashboard'));
const PublishedAlbum = React.lazy(() => import('./components/album/PublishedAlbum'));
const UploadAlbum = React.lazy(() => import('./components/album/UploadAlbum'));

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
                    <Navbar Component={Dashboard} home={true} albums={false} contacts={false} support={false} settings={false} />
                  </ProtectedRoute>
                </React.Suspense>
              }
            />
            <Route
              path="/upload-album"
              element={
                <React.Suspense fallback={<></>}>
                  <ProtectedRoute>
                    <UploadAlbum />
                  </ProtectedRoute>
                </React.Suspense>
              }
            />
            <Route
              path="/albums/:albumID"
              element={
                <React.Suspense fallback={<></>}>
                  <PublishedAlbum />
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
