/************************************************************ IMPORTS ************************************************************/

import { Navigate } from 'react-router-dom';
import { UserAuth } from '../hooks/AuthContext';

/************************************************************ IMPORTS ************************************************************/

const ProtectedRoute = ({ children }) => {
  const { user } = UserAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
