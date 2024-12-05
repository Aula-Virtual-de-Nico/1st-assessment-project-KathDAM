import React from 'react';

export default function Modal({ showModal, title, message, onCancel, onConfirm }) {
    if (!showModal) return null; 

    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">{title}</h4>
                        <button type="button" className="btn-close" onClick={onCancel} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>{message}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" onClick={onCancel}>Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={onConfirm}>Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    );
}