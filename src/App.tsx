import { useEffect } from "react";
import { translate } from "@i18n";
import { useAppSelector } from "@store/hook";
import * as movaAdminSelectors from "@store/selectors";
import RouterComponent from "@components/router/RouterComponent";
import ScrollToTop from "@components/scrollToTop/ScrollToTop";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const locale = useAppSelector(movaAdminSelectors.localeSelect);
  const { i18n } = translate();

  useEffect(() => {
    i18n.changeLanguage(locale);
    // eslint-disable-next-line
  }, [locale]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        theme="light"
        className={"notificationToast"}
        toastClassName={"toastBody"}
        progressClassName={"toastProgress"}
        transition={Zoom}
      />
      <ScrollToTop />
      <RouterComponent />
    </>
  );
};

export default App;
