import { useNavigate } from "react-router-dom";

const FooterPreview = () => {
    const navigate = useNavigate();
    return <footer>
        <button 
            onClick={() => { navigate(-1); }}
        >
            Voltar
        </button>
        <button 
            onClick={() => {
                if(window.confirm("Tem certeza que deseja Inserir?")) navigate("/develop");
            }}
        >
            INSERIR
        </button>
    </footer>;
}

export default FooterPreview;