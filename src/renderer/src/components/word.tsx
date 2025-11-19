import MenuContextWord, {MenuContextWordProps} from "./overlays/contextmenu/MenuContextWord";
import { useState } from "react";
import "@renderer/assets/stylesheets/components/word.css";

interface WordProps extends MenuContextWordProps{}

const Word = (props: WordProps) => {
  const [wordText, setWordText] = useState(props.wordText);

  return (
    <>
      <MenuContextWord
        wordText={wordText}
        onEditWord={props.onEditWord}
        onDeleteWord={props.onDeleteWord}
      />
    </>
  )
};

export default Word;