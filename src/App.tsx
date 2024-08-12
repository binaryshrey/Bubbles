/************************************************************ IMPORTS ************************************************************/

import React from 'react';
import Home from './components/home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/utils/ProtectedRoute';
import PageNotFound from './components/not-found/PageNotFound';
import { AuthContextProvider } from './components/hooks/AuthContext';

const Login = React.lazy(() => import('./components/login/Login'));
const Navbar = React.lazy(() => import('./components/dashboard/Navbar'));
const Profile = React.lazy(() => import('./components/profile/Profile'));
const Register = React.lazy(() => import('./components/register/Register'));
const Settings = React.lazy(() => import('./components/settings/Settings'));
const Analytics = React.lazy(() => import('./components/analytics/Analytics'));
const Dashboard = React.lazy(() => import('./components/dashboard/Dashboard'));
const UploadAlbum = React.lazy(() => import('./components/album/UploadAlbum'));
const PublishedAlbum = React.lazy(() => import('./components/album/PublishedAlbum'));

/************************************************************ IMPORTS ************************************************************/

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<PageNotFound />} />
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
                    <Navbar Component={Dashboard} home={true} analytics={false} support={false} settings={false} />
                  </ProtectedRoute>
                </React.Suspense>
              }
            />
            <Route
              path="/analytics"
              element={
                <React.Suspense fallback={<></>}>
                  <ProtectedRoute>
                    <Navbar Component={Analytics} home={false} analytics={true} support={false} settings={false} />
                  </ProtectedRoute>
                </React.Suspense>
              }
            />
            <Route
              path="/settings"
              element={
                <React.Suspense fallback={<></>}>
                  <ProtectedRoute>
                    <Navbar Component={Settings} home={false} analytics={false} support={false} settings={true} />
                  </ProtectedRoute>
                </React.Suspense>
              }
            />
            <Route
              path="/profile"
              element={
                <React.Suspense fallback={<></>}>
                  <ProtectedRoute>
                    <Navbar Component={Profile} home={false} analytics={false} support={false} settings={false} />
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
              path="/albums/:linkID"
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
