import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRouter from "./ProtectedRouter";
import ProtectedRouterForLogged from "./ProtectedRouterForLogged";
import AuthPage from "@pages/auth/AuthPage";
import UsersPage from "@pages/users/UsersPage";
import CreateAdminPage from "@pages/create_admin/CreateAdminPage";
import ChangeUserPage from "@pages/change_user/ChangeUserPage";
import PaymentsPage from "@pages/payments/PaymentsPage";
import NotificationsPage from "@pages/notifications/NotificationsPage";
import NotificationItemPage from "@pages/notifications/NotificationItemPage";
import SupportPage from "@pages/support/SupportPage";
import SupportItemPage from "@pages/support/SupportItemPage";
import AdminSettingsPage from "@pages/admin_settings/AdminSettingsPage";
import ForgotPasswordPage from "@pages/forgot_password/ForgotPasswordPage";

const RouterComponent = () => {
  //TODO: add real logic about authorization from store
  const isLogin = true;

  const unAuthRoutes = [{ path: "/login", element: <AuthPage /> }];

  const authRoutes = [
    { path: "/users/:type/:page", element: <UsersPage /> },
    { path: "/create_admin", element: <CreateAdminPage /> },
    { path: "/user/:user_id/:type", element: <ChangeUserPage /> },
    { path: "/payments/:type/:page", element: <PaymentsPage /> },
    { path: "/notifications/:page", element: <NotificationsPage /> },
    { path: "/notification/:notification_id", element: <NotificationItemPage /> },
    { path: "/supports/:page", element: <SupportPage /> },
    { path: "/support/:support_id", element: <SupportItemPage /> },
    { path: "/settings", element: <AdminSettingsPage /> },
    { path: "/settings/admin", element: <AdminSettingsPage /> },
    { path: "/settings/password", element: <AdminSettingsPage /> },
  ];

  const unProtectedRoutes = [
    { path: "/forgot_password/email", element: <ForgotPasswordPage /> },
    { path: "/forgot_password/password", element: <ForgotPasswordPage /> },
  ];

  return (
    <Routes>
      {unAuthRoutes.map((el, ind) => (
        <Route key={ind} path={el.path} element={<ProtectedRouterForLogged>{el.element}</ProtectedRouterForLogged>} />
      ))}
      {authRoutes.map((el, ind) => (
        <Route key={ind} path={el.path} element={<ProtectedRouter>{el.element}</ProtectedRouter>} />
      ))}
      {unProtectedRoutes.map((el, ind) => (
        <Route key={ind} path={el.path} element={el.element} />
      ))}
      <Route path="*" element={isLogin ? <Navigate to={"/users/all/1"} /> : <Navigate to={"/login"} />} />
    </Routes>
  );
};

export default RouterComponent;
