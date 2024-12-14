import React from "react";
import PropTypes from "prop-types";

const Modal = ({ 
  title, 
  body, 
  show, 
  onClose, 
  onConfirm, 
  confirmText = "Confirm", 
  cancelText = "Cancel" 
}) => {
  return (
    <>
      {show && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
              </div>
              <div className="modal-body">
                <p>{body}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  {cancelText}
                </button>
                <button type="button" className="btn btn-primary" onClick={onConfirm}>
                  {confirmText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
};

export default Modal;
