import '@renderer/assets/stylesheets/components/modal.css';
import { BaseModal } from './BaseModal';


interface ErrorModalProps {
    message: string;
    onClose: () => void;
}


export function ErrorModal({ message, onClose }: ErrorModalProps) {
    const handeClick = () => {
        onClose();
        window.location.reload();
    }
    return (
        <BaseModal onClose={handeClick}>
            <div className="error-modal">
                <h2>Erro</h2>
                <p>{message}</p>
                <button onClick={handeClick}>Tente Novamente</button>
            </div>
        </BaseModal>
    );
}