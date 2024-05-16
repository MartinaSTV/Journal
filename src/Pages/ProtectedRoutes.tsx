import { Navigate, Outlet } from "react-router-dom";
import { useRecoilState } from "recoil";
import Token from "../atoms/Token";

const ProtectedRoutes = () => {
  const [token] = useRecoilState(Token);
  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoutes;
