import { Navigate } from "react-router-dom";
import { useAppSelector } from "@store/hook";
import * as movaAdminSelectors from "@store/selectors";

interface IProtectedRouterProps {
  children: JSX.Element;
}

const ProtectedRouter = ({ children }: IProtectedRouterProps) => {
  const token = localStorage.getItem("mova_admin_access_token");
  // const isLogin = useAppSelector(movaAdminSelectors.isLoginSelect);

  /* if (!token || !isLogin) {
    return <Navigate to={"/"} replace />;
  } */
  return children;
};

export default ProtectedRouter;
