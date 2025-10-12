import { FunctionComponent } from "react";
import Word from "./word";


interface PoolProps {
    size?: number;
    words?: typeof Word[];
}

const Pool: FunctionComponent<PoolProps> = () => {
    return (
        <div className="pool"></div>
    );
}

export default Pool;