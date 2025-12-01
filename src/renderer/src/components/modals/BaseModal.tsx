import '@renderer/assets/stylesheets/components/modal.css';


interface BaseModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

export function BaseModal({ children, onClose }: BaseModalProps) {
    const handleKeyDown = (event: KeyboardEvent) => {
        event.key === 'Escape'? onClose(): null
    }

    document.addEventListener("keydown", (event)=>{

        handleKeyDown(event)
    })
    return (
        <div className="base-modal" onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()} className="base-modal-content">
                {children}
            </div>
        </div>
    );
}