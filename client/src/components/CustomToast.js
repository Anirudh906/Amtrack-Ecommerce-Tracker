import React from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function CustomToast(props) {
  return (
    <>
      <ToastContainer className="p-3 toast-fixed">
        <Toast
          onClose={() => props.setShowToast(false)}
          show={props.showToast}
          delay={3000}
          className="toast-style"
          autohide
        >
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{props.text}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default CustomToast;
