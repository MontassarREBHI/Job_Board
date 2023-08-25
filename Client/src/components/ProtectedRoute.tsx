import { ReactNode } from "react";
import Signin from "./Signin";
interface ProtectedRouteProps {
  children: ReactNode;
  isAuthenticated: boolean;
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated,
}) => {
  if (!isAuthenticated) {
    return <Signin />;
  }

  return children;
};
export default ProtectedRoute;
