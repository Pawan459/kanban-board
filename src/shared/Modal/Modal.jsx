import './Modal.scss';

export default function Modal({
  toggleModal = () => { },
  header = 'Custom Modal',
  footer,
  children
}) {


  const handleBackDropClick = (event) => {
    if (event.target === event.currentTarget) {
      toggleModal();
    }
  }

  return (
    <div className="custom-modal" onClick={handleBackDropClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{header}</h2>
          <span className="close" onClick={toggleModal}>&times;</span>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          {footer && <h3>{footer}</h3>}
        </div>
      </div>
    </div>
  )
}
