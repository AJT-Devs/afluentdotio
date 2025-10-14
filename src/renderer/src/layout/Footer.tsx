import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();
    return <footer>
        <button 
            onClick={() => { 
                if(window.confirm("Tem certeza que deseja voltar?\nEntenda que como não salvamos progresso ainda, ao voltar perderá as atuais e até mesmo as que você adicionou pessoalmente.\n\nTem certeza que deseja voltar??")) 
                    navigate(-1);
             }}
        >
            Voltar
        </button>
        <form action="">
            <label>
                <input type="text" />
            </label>
            


        </form>
        <button 
            onClick={() => {
                if(window.confirm("Tem certeza que deseja gerar mais palavras?\nEntenda que como não salvamos progresso ainda, ao gerar mais palavras perderá as atuais e até mesmo as que você adicionou pessoalmente.\n\nTem certeza que deseja gerar mais palavras??")) 
                    return;
            }}
        >
            GERAR
        </button>
    </footer>;
}

export default Footer;