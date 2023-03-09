import { DateInput } from "components/forms/DateInput";
import FormInput from "components/forms/FormInput";
import { Fragment } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";

const Report = () => {
  const form = useForm({ defaultValues: {} });
  return (
    <Fragment>
      <FormProvider {...form}>
        <div className="my-4">
          <h4>Report</h4>
          <h5>Message Receive</h5>
          <Row className="gap-2">
            <Col md={5}>
              <Row>
                <Col md={5}>From date</Col>
                <Col md={6}>
                  <DateInput name="fromDate" />
                </Col>
              </Row>
            </Col>
            <Col md={5}>
              <Row>
                <Col md={5}>To date</Col>
                <Col md={6}>
                  <DateInput name="toDate" />
                </Col>
              </Row>
            </Col>
          </Row>
          <br />
          <h5>Message Processed & Responded</h5>
          <Row className="gap-2">
            <Col md={5}>
              <Row>
                <Col md={5}>From date</Col>
                <Col md={6}>
                  <DateInput name="fromDate" />
                </Col>
              </Row>
            </Col>
            <Col md={5}>
              <Row>
                <Col md={5}>To date</Col>
                <Col md={6}>
                  <DateInput name="toDate" />
                </Col>
              </Row>
            </Col>
            <Col md={5}>
              <Row>
                <Col md={5}>Application Status</Col>
                <Col md={6}>
                  <FormInput name="iban" />
                </Col>
              </Row>
            </Col>
            <Col md={5}></Col>
            <Col md={5}>
              <Row>
                <Col md={5}>Customer ID</Col>
                <Col md={6}>
                  <FormInput name="iban" />
                </Col>
              </Row>
            </Col>
            <Col md={5}>
              <Row>
                <Col md={5}>Type</Col>
                <Col md={6}>
                  <FormInput name="iban" />
                </Col>
              </Row>
            </Col>
            <Col md={5}>
              <Row>
                <Col md={5}>Customer CIF</Col>
                <Col md={6}>
                  <FormInput name="iban" />
                </Col>
              </Row>
            </Col>
            <Col md={5}></Col>
            <Col md={5}>
              <Row>
                <Col md={5}>CR Number</Col>
                <Col md={6}>
                  <FormInput name="iban" />
                </Col>
              </Row>
            </Col>
            <Col md={5}></Col>
            <Col md={5}>
              <Row>
                <Col md={5}></Col>
                <Col md={6}>
                  <Button variant="primary">Execute Report</Button>
                </Col>
              </Row>
            </Col>
            <Col md={5}></Col>
            <Col md={5}>
              <Row>
                <Col md={5}>View report</Col>
                <Col md={6}></Col>
              </Row>
            </Col>
          </Row>
        </div>
      </FormProvider>
    </Fragment>
  );
};
export default Report;
