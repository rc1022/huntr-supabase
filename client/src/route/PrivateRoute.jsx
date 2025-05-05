import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";


export default function PrivateRoute({ children }) {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}