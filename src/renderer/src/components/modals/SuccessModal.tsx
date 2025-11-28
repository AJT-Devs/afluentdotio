import '@renderer/assets/stylesheets/components/modal.css'
import { BaseModal } from './BaseModal';


interface ErrorModalProps {
    message: string;
    onClose: () => void;
}


export function SuccessModal({ message, onClose }: ErrorModalProps) {
    const handeClick = () => {
        onClose();
    }
    return (
        <BaseModal onClose={handeClick}>
            <div className="success-modal">
            <p>{message}</p>
            <button onClick={handeClick}>Fechar</button>
        </div>
        </BaseModal>
    );
}