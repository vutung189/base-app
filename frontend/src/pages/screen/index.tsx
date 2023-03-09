import PageTitle from "components/common/PageTitle";
import { Fragment } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { ScreenRoutes } from "routes";
import SearchScreen from "./search";

const List = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const onGenerateReport = () => {
    history.push(ScreenRoutes.Report);
  };
  return (
    <Fragment>
      <Button variant="primary" onClick={onGenerateReport} className="my-4">
        Generate Report
      </Button>
      <SearchScreen />
    </Fragment>
  );
};

export default List;
