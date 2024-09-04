import { Route, Routes, Navigate } from "react-router-dom";

const RouterComponent = () => {
  const unauthRoutes = [{ path: "/login", element: <div>login</div> }];

  const authRoutes = [{ path: "/", element: <div>main</div> }];

  return (
    <Routes>
      {unauthRoutes.map((el, ind) => (
        <Route key={ind} path={el.path} element={el.element} />
      ))}
      {authRoutes.map((el, ind) => (
        <Route key={ind} path={el.path} element={el.element} />
      ))}
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};

export default RouterComponent;
