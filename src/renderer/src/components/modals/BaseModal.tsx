import '@renderer/assets/stylesheets/components/modal.css';

interface BaseModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

export function BaseModal({ children, onClose }: BaseModalProps) {
    return (
        <div className="base-modal" onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()} className="base-modal-content">
                {children}
            </div>
        </div>
    );
}