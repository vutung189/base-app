import { Modal, Spinner } from "react-bootstrap";

interface Props {
  isShow: boolean;
}
const LoadingFullScreen = ({ isShow }: Props) => {
  return (
    <Modal
      show={isShow}
      dialogClassName="modal-dialog-centered"
      contentClassName="bg-transparent border-0"
    >
      <Modal.Body >
        <div className="d-flex justify-content-center gap-2">
          <Spinner animation="grow" variant="info" size="sm" />
          <Spinner animation="grow" variant="info" size="sm" />
          <Spinner animation="grow" variant="info" size="sm" />
          <Spinner animation="grow" variant="info" size="sm" />
          <Spinner animation="grow" variant="info" size="sm" />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoadingFullScreen;
