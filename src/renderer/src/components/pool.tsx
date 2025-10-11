import { FunctionComponent } from "react";
import Word from "./word";


interface PoolProps {
    size?: number;
    words?: typeof Word[];
}

const Pool: FunctionComponent<PoolProps> = ({ size, words }) => {
    return (
        <div className="pool">
            {words?.map((word, index) => (
                <Word key={index} word={word.word} range={word.range} />
            ))}
        </div>
    );
}