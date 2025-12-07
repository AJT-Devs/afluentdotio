import {Lock, LockOpen} from "lucide-react";

type LockFreeModeToggleProps = {
    isFreeMode : boolean;
    changeIsFreeMode : ()=>void;
}

const LockFreeModeToggle = ({isFreeMode, changeIsFreeMode} : LockFreeModeToggleProps)=>{
    return(
        <button onClick={changeIsFreeMode}>
            {isFreeMode ? <Lock className="" size={20} strokeWidth={3}/> : <LockOpen className="" size={20} strokeWidth={3}/>}
        </button>
    );
}

export default LockFreeModeToggle; 