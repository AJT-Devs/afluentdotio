import '@renderer/assets/stylesheets/components/modal.css';


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
        <div className="error-modal">
            <h2>Erro</h2>
            <p>{message}</p>
            <button onClick={handeClick}>Tente Novamente</button>
        </div>
    );
}