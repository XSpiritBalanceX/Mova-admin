import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRouter from "./ProtectedRouter";
import ProtectedRouterForLogged from "./ProtectedRouterForLogged";
import AuthPage from "@pages/auth/AuthPage";
import UsersPage from "@pages/users/UsersPage";
import CreateAdminPage from "@pages/create_admin/CreateAdminPage";
import ChangeUserPage from "@pages/change_user/ChangeUserPage";

const RouterComponent = () => {
  //TODO: add real logic about authorization from store
  const isLogin = true;

  const unauthRoutes = [{ path: "/login", element: <AuthPage /> }];

  const authRoutes = [
    { path: "/users/:type/:page", element: <UsersPage /> },
    { path: "/create_admin", element: <CreateAdminPage /> },
    { path: "/user/:user_id/:type", element: <ChangeUserPage /> },
  ];

  return (
    <Routes>
      {unauthRoutes.map((el, ind) => (
        <Route key={ind} path={el.path} element={<ProtectedRouterForLogged>{el.element}</ProtectedRouterForLogged>} />
      ))}
      {authRoutes.map((el, ind) => (
        <Route key={ind} path={el.path} element={<ProtectedRouter>{el.element}</ProtectedRouter>} />
      ))}
      <Route path="*" element={isLogin ? <Navigate to={"/users/all/1"} /> : <Navigate to={"/login"} />} />
    </Routes>
  );
};

export default RouterComponent;
