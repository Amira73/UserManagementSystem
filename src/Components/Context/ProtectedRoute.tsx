import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('token');  // تحقق من التوثيق

  return isAuthenticated ? element : <Navigate to="/login" />;  // إذا كان المستخدم مسجل دخوله يعرض الـ element، وإذا لا يوجهه للـ login
};

export default ProtectedRoute;