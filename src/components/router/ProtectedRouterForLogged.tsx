import { Navigate } from "react-router-dom";
import { useAppSelector } from "@store/hook";
import * as movaAdminSelectors from "@store/selectors";

interface IProtectedRouterForLoggedProps {
  children: JSX.Element;
}

const ProtectedRouterForLogged = ({ children }: IProtectedRouterForLoggedProps) => {
  //const isLogin = useAppSelector(movaAdminSelectors.isLoginSelect);

  /* if (isLogin) {
    return <Navigate to={"/"} replace />;
  } */
  return children;
};

export default ProtectedRouterForLogged;
