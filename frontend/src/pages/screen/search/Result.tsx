import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from "components/UI/Table";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { ScreenRoutes } from "routes";
import { formatDateFromNumber } from "utils/date";
import { DataSearch, LGDetail } from "utils/type/LgInterface";
import { numberWithCommas } from "utils/utils";
interface Props {
  data: DataSearch;
}

interface Cell {
  row: { original: LGDetail };
}

const Result = ({ data }: Props) => {
  const columns: any[] = [
    {
      Header: "LG Reference#",
      accessor: "lgReference",
      className: "text-break w-10",
    },
    {
      Header: "LG Type",
      accessor: "requesterType",
      className: "text-break w-10",
    },
    {
      Header: "LG Issue Date",
      accessor: "issueDate",
      className: "text-break w-10",
      Cell: ({ row }: Cell) => {
        return <>{formatDateFromNumber(row.original.issueDate)}</>;
      },
    },
    {
      Header: "Existing LG Amount",
      accessor: "existingLgAmount",
      className: "text-break w-10",
      Cell: ({ row }: Cell) => {
        return <>{numberWithCommas(row.original.existingLgAmount)}</>;
      },
    },
    {
      Header: "Applicant Name",
      accessor: "applicantName",
      className: "text-break w-10",
    },
    {
      Header: "IBAN#",
      accessor: "beneficiaryIban",
      className: "text-break w-10",
    },
    {
      Header: "Status",
      accessor: "validationStatus",
      className: "text-break w-10",
    },
    {
      Header: "Action",
      accessor: "action",
      className: "text-break w-10",
      Cell: Action,
    },
  ];
  return (
    <Card>
      <Card.Body>
        <Table
          columns={columns}
          data={data?.content || []}
          isSortable={false}
          pagination={true}
          isSelectable={false}
          pageSize={100}
          pagingRes={data}
        />
      </Card.Body>
    </Card>
  );
};

export default Result;

const Action = ({ row }: Cell) => {
  const history = useHistory();
  const viewDetail = () => {
    history.push(`${ScreenRoutes.List}/${row.original.id}`);
  };
  return (
    <Button variant="link" onClick={viewDetail}>
      <FontAwesomeIcon icon={faEye} />
    </Button>
  );
};
