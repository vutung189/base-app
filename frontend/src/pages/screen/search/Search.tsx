import { DateInput } from "components/forms/DateInput";
import FormInput from "components/forms/FormInput";
import { Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
interface Props {
  submitFormValues: any;
  initFormValues: Record<string, any>;
  defaultFormValues: Record<string, any>;
  isLoading: boolean;
}

const Search = ({
  submitFormValues,
  initFormValues,
  defaultFormValues,
  isLoading,
}: Props) => {
  const form = useForm({ defaultValues: initFormValues });

  const { handleSubmit } = form;

  const handleReset = () => {
    form.reset(defaultFormValues);
    submitFormValues((pre: any) => ({
      ...defaultFormValues,
      page: 1,
      size: pre?.size,
    }));
  };

  const onFinish = (values: Record<string, any>) => {
    submitFormValues((pre: any) => ({
      ...values,
      page: 1,
      size: pre?.size,
    }));
  };
  return (
    <FormProvider {...form}>
      <Form onSubmit={handleSubmit(onFinish)} className="mb-4">
        <Card>
          <Card.Body>
            <Row>
              <Col md={3} className="mb-2">
                <FormInput name="lgReference" label="LG Reference#" />
              </Col>
              <Col md={3} className="mb-2">
                <FormInput name="lgType" label="LG Type" />
              </Col>
              <Col md={3} className="mb-2">
                <DateInput name="startDate" label="Start date" />
              </Col>
              <Col md={3} className="mb-2">
                <FormInput name="applicantCif" label="Applicant CIF#" />
              </Col>
              <Col md={3} className="mb-2">
                <DateInput name="issueDate" label="LG issue Date" />
              </Col>
              <Col md={3} className="mb-2">
                <FormInput name="iban" label="IBAN#" />
              </Col>
              <Col md={3} className="mb-2">
                <DateInput name="endDate" label="EndDate" />
              </Col>
              <Col md={3} className="d-flex align-items-end gap-4 mb-2">
                <Button type="submit" variant="primary" disabled={isLoading}>
                  {isLoading && <Spinner size="sm" />}
                  {" "}Search
                </Button>

                <Button
                  variant="outline-primary"
                  disabled={isLoading}
                  onClick={handleReset}
                >
                  {isLoading && <Spinner size="sm" />}
                  {" "}Refresh
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Form>
    </FormProvider>
  );
};
export default Search;
