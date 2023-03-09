import { useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";


interface AccountLayoutProps {
  helpText?: string;
  bottomLinks?: any;
  isCombineForm?: boolean;
  children?: any;
}

const AuthLayout = ({
  helpText,
  bottomLinks,
  children,
  isCombineForm,
}: AccountLayoutProps) => {
  const { t } = useTranslation();
  useEffect(() => {
    if (document.body)
      document.body.classList.add(
        "authentication-bg",
        "authentication-bg-pattern"
      );

    return () => {
      if (document.body)
        document.body.classList.remove(
          "authentication-bg",
          "authentication-bg-pattern"
        );
    };
  }, []);

  return (
    <>
      <div className="account-pages d-flex align-items-center">
        <Container className="p-4 d-flex align-items-center justify-content-center">
          {/* <Row className="justify-content-center"> */}
          {/* <Col md={8} lg={6} xl={isCombineForm ? 9 : 4}> */}
          {/* <div className="lottie-image">
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: childWalkLottie,
              }}
              // height={500}
            />
          </div> */}
          <Card className="bg-pattern shadow-lg">
            <Card.Body>
              <div className="login">
                <div className="text-center w-75 m-auto">
                  <h1 className="mt-2 mb-4 font-weight-bold text-dark">
                    {t("WELCOME")}
                  </h1>
                </div>
                {children}
              </div>
            </Card.Body>
          </Card>

          {/* bottom links */}
          {bottomLinks}
        </Container>
      </div>
    </>
  );
};

export default AuthLayout;
