import React from 'react';

export default function Modal({ title, message, onCancel, onConfirm }) {
  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onCancel}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="button" className="btn btn-danger" onClick={onConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
