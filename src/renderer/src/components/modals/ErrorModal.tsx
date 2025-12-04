import '@renderer/assets/stylesheets/components/modal.css';
import { BaseModal } from './BaseModal';


interface ErrorModalProps {
    message: string;
    onClose: () => void;
}


export function ErrorModal({ message, onClose }: ErrorModalProps) {
    const handeClick = (status: number) => {
        onClose();
        if (status === 1) {
            window.location.reload();
        }
    }
    return (
        <BaseModal onClose={() => handeClick(0)}>
            <div className="error-modal">
                <h2>Erro</h2>
                <p>{message}</p>
                <button onClick={() => handeClick(1)}>Tente Novamente</button>
                <button onClick={() => handeClick(0)}>Fechar</button>
            </div>
        </BaseModal>
    );
}