import { Fragment } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { ScreenRoutes } from "routes";
import SearchScreen from "./search";

const List = () => {
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
