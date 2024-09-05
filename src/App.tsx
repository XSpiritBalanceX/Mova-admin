import { useEffect } from "react";
import { translate } from "@i18n";
import { useAppSelector } from "@store/hook";
import * as movaAdminSelectors from "@store/selectors";
import RouterComponent from "@components/router/RouterComponent";
import ScrollToTop from "@components/scrollToTop/ScrollToTop";

const App = () => {
  const locale = useAppSelector(movaAdminSelectors.localeSelect);
  const { i18n } = translate();

  useEffect(() => {
    i18n.changeLanguage(locale);
    // eslint-disable-next-line
  }, [locale]);

  return (
    <>
      <ScrollToTop />
      <RouterComponent />
    </>
  );
};

export default App;
