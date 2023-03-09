import { Card, Col, Row } from "react-bootstrap";
import avatar from "assets/images/users/user-1.jpg";

const Profile = () => {

  return <Row className="p-3">
    <Col sm={12} md={3}>
      <Card>
        <Card.Body className="text-center">
          <img src={avatar} alt="" className="rounded-circle" />
          <h3 className="my-3">Nguyễn A</h3>
          <div className="d-flex justify-content-between">
            <div>
              <b>4.2M</b><br />
              <small>Followers</small>
            </div>
            <div>
              <b>4.2M</b><br />
              <small>Followers</small>
            </div>
            <div>
              <b>4.2M</b><br />
              <small>Followers</small>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
    <Col sm={12} md={9}>
      <Card>
        <Card.Body className="text-center">
          
        </Card.Body>
      </Card>
    </Col>
  </Row>
}

export default Profile;