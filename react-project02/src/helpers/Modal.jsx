import { forwardRef, useImperativeHandle } from "react";
import "./modal.scss";

const Modal = (props, ref) => {
  const { title, body } = props;

  useImperativeHandle(ref, () => ({
    handleOpenModal() {
      document.querySelector("dialog[data-modal]").showModal();
    },
  }));

  const handleClose = () => {
    document.querySelector("dialog[data-modal]").close();
  };

  return (
    <dialog data-modal>
      <div className="modal-title">{title ? title : "Title"}</div>
      <div className="modal-body">{body ? body : "Body"}</div>
      <button data-close-modal onClick={handleClose}>
        Close
      </button>
    </dialog>
  );
};

export default forwardRef(Modal);
