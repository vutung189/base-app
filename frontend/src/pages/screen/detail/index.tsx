import { SearchApi } from "api/Search";
import LoadingFullScreen from "components/common/LoadingFullScreen";
import { Fragment, useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FORMAT_DATE_TIME } from "utils/constants";
import { QueryKeys } from "utils/constants/queryKeys";
import { formatDateFromNumber } from "utils/date";
import { useFetch } from "utils/hooks/useFetch";
import { LGDetail } from "utils/type/LgInterface";
import { numberWithCommas } from "utils/utils";

const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isFetching } = useFetch<LGDetail>(
    SearchApi.getById,
    id,
    QueryKeys.GET_DETAIL,
    {
      enabled: !!id,
    }
  );

  const lgDetail = useMemo(() => {
    return data?.data;
  }, [data]);

  return (
    <Fragment>
      <LoadingFullScreen isShow={isFetching} />
      <Row className="gap-4 my-4 justify-content-center">
        <Col md={5}>
          <Row>
            <Col md={6}>
              <h4>Detail</h4>
            </Col>
            <Col md={6}></Col>
          </Row>
        </Col>
        <Col md={5}></Col>
        <Col md={5}>
          <Row>
            <Col md={6}>LG Reference#</Col>
            <Col md={6} className="border-bottom">
              {lgDetail?.lgReference}
            </Col>
          </Row>
        </Col>
        <Col md={5}>
          <Row>
            <Col md={6}>Requested Type</Col>
            <Col md={6} className="border-bottom">
              {lgDetail?.requesterType}
            </Col>
          </Row>
        </Col>
        <Col md={5}>
          <Row>
            <Col md={6}>Beneficiary Name</Col>
            <Col md={6} className="border-bottom">
              {lgDetail?.beneficiaryName}
            </Col>
          </Row>
        </Col>
        <Col md={5}>
          <Row>
            <Col md={6}>Beneficiary UID</Col>
            <Col md={6} className="border-bottom">
              {lgDetail?.beneficiaryUid}
            </Col>
          </Row>
        </Col>
        <Col md={5}>
          <Row>
            <Col md={6}>Beneficiary IBAN</Col>
            <Col md={6} className="border-bottom">
              {lgDetail?.beneficiaryIban}
            </Col>
          </Row>
        </Col>
        <Col md={5}>
          <Row>
            <Col md={6}>Applicant Name</Col>
            <Col md={6} className="border-bottom">
              {lgDetail?.applicantName}
            </Col>
          </Row>
        </Col>
        <Col md={5}>
          <Row>
            <Col md={6}>Applicant ID#</Col>
            <Col md={6} className="border-bottom">
              {lgDetail?.applicantId}
            </Col>
          </Row>
        </Col>
        <Col md={5}>
          <Row>
            <Col md={6}>Applicant CR#</Col>
            <Col md={6} className="border-bottom">
              {lgDetail?.applicantCr}
            </Col>
          </Row>
        </Col>
        <Col md={5}>
          <Row>
            <Col md={6}>Bank fee IBAN</Col>
            <Col md={6} className="border-bottom">
              {lgDetail?.bankFeeIban}
            </Col>
          </Row>
        </Col>
        <Col md={5}>
          <Row>
            <Col md={6}>Special Amount IBAN</Col>
            <Col md={6} className="border-bottom">
              {lgDetail?.specialAccountIban}
            </Col>
          </Row>
        </Col>
        <Col md={5}>
          <Row>
            <Col md={6}>Applicant IBAN</Col>
            <Col md={6} className="border-bottom">
              {lgDetail?.applicantIban}
            </Col>
          </Row>
        </Col>
        <Col md={5}>
          <Row>
            <Col md={6}>SADAD ID</Col>
            <Col md={6} className="border-bottom">
              {lgDetail?.sadadId}
            </Col>
          </Row>
        </Col>
        <Col md={5}>
          <Row>
            <Col md={6}>Existing LG Amount</Col>
            <Col md={6} className="border-bottom">
              {numberWithCommas(lgDetail?.existingLgAmount)}
            </Col>
          </Row>
        </Col>
        <Col md={5}>
          <Row>
            <Col md={6}>Amendment Amount</Col>
            <Col md={6} className="border-bottom">
              {numberWithCommas(lgDetail?.amendmentAmount)}
            </Col>
          </Row>
        </Col>
        <Col md={5}>
          <Row>
            <Col md={6}>Existing LG Validity Date</Col>
            <Col md={6} className="border-bottom">
              {formatDateFromNumber(lgDetail?.existingLgvalidityDate)}
            </Col>
          </Row>
        </Col>
        <Col md={5}>
          <Row>
            <Col md={6}>Amendment LG Validity Date</Col>
            <Col md={6} className="border-bottom">
              {formatDateFromNumber(lgDetail?.amendmentLgValidityDate)}
            </Col>
          </Row>
        </Col>
        <Col md={5}>
          <Row>
            <Col md={6}>Amendment Terms & Conditions</Col>
            <Col md={6} className="border-bottom">
              {lgDetail?.amendmentTermCondition}
            </Col>
          </Row>
        </Col>
        <Col md={5}></Col>
        <Col md={5}>
          <Row>
            <Col md={6}>Applicant CIF</Col>
            <Col md={6} className="border-bottom">
              {lgDetail?.applicantCif}
            </Col>
          </Row>
        </Col>
        <Col md={5}></Col>
        <Col md={10}>
          <Row>
            <table className="table table-bordered my-4 ">
              <thead className="table-info">
                <tr>
                  <th scope="col">Validation Timestamp</th>
                  <th scope="col">Validation Status</th>
                  <th scope="col">Reason for Failure</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {formatDateFromNumber(
                      lgDetail?.validationTime,
                      FORMAT_DATE_TIME
                    )}
                  </td>
                  <td>{lgDetail?.validationStatus}</td>
                  <td>{lgDetail?.reasonFailure}</td>
                </tr>
              </tbody>
            </table>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};
export default Detail;
