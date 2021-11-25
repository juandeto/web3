import * as React from 'react'
import ReactModal from 'react-modal';
import 'styles/components/shared/ul.scss'

interface  ModalProps {
    show: boolean,
    msg: string,
    type: TypeError | null
    onAfter: () => void,
    close: () => void
}

const ErrorModal: React.FC<ModalProps> = ({show, msg, onAfter, type, close }) => {
    ReactModal.setAppElement('body');
    console.log("type: ", type)
    return (
        <ReactModal 
        isOpen={show}
        onRequestClose={close}
        onAfterClose={onAfter}
        contentLabel="There was an error"
        shouldCloseOnOverlayClick={true}
        style={{
            overlay: {
                backgroundColor: 'rgba(0,0,0, 0.8)'
              },
            content: {
                top: '150px',
                left: '250px',
                right: '250px',
                bottom: '150px',
              }
        }}
        >
            <div className="error_modal_container">
              <h2>{msg}</h2>
              <p >{type?.toString()}</p>
            </div>
            
        </ReactModal>
    )
}

export default ErrorModal;