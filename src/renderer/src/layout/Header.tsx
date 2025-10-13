import AfluentLogo from "@renderer/components/AfluentLogo";
import { useNavigate } from "react-router-dom";
import * as motion from "motion/react-client";


const Header = () => {
    const navigate = useNavigate();
    return <header>
        <motion.button 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{
            duration: 0.6,
            ease: [0.4, 0.0, 0.2, 1],
            scale: { type: "spring", stiffness: 120, damping: 12 }
            }}


            onClick={() => {
                navigate("/");
            }}
        >
                <AfluentLogo/>

        </motion.button>
    </header>;
}

export default Header;