import { Navigate } from 'react-router-dom';
import { getToken } from '../../utils/adminApi';

/* Guards admin pages — redirects to the login screen when there's no token. */
const AdminRoute = ({ children }) => {
  if (!getToken()) return <Navigate to="/admin/login" replace />;
  return children;
};

export default AdminRoute;
