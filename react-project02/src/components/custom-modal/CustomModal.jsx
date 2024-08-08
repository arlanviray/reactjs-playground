import { useRef } from "react";
import { createPortal } from "react-dom";
import Modal from "../../helpers/Modal";

function CustomModal() {
  const modalRef = useRef();

  const handleShowModal = () => {
    modalRef.current.handleOpenModal();
  };

  // console.log(showModal);

  return (
    <div className="custom-modal center">
      <button onClick={handleShowModal}>Open Modal</button>

      {/* Insert into the body outside the <div id="root">...</div> */}
      {createPortal(
        <Modal
          ref={modalRef}
          title="Props Title"
          body="Props Body: Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus doloremque, sequi asperiores non dolorum dicta autem natus nihil voluptatum, sed porro fuga vero cupiditate repellendus provident similique dignissimos aspernatur totam?"
        />,
        document.body
      )}
    </div>
  );
}

export default CustomModal;
