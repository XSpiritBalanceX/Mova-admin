import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRouter from "./ProtectedRouter";
import ProtectedRouterForLogged from "./ProtectedRouterForLogged";
import AuthPage from "@pages/auth/AuthPage";

const RouterComponent = () => {
  //TODO: add real logic about authorization from store
  const isLogin = true;

  const unauthRoutes = [{ path: "/login", element: <AuthPage /> }];

  const authRoutes = [{ path: "/users", element: <div>users</div> }];

  return (
    <Routes>
      {unauthRoutes.map((el, ind) => (
        <Route key={ind} path={el.path} element={<ProtectedRouterForLogged>{el.element}</ProtectedRouterForLogged>} />
      ))}
      {authRoutes.map((el, ind) => (
        <Route key={ind} path={el.path} element={<ProtectedRouter>{el.element}</ProtectedRouter>} />
      ))}
      <Route path="*" element={isLogin ? <Navigate to={"/users"} /> : <Navigate to={"/login"} />} />
    </Routes>
  );
};

export default RouterComponent;
