import {FunctionComponent, ReactNode} from 'react';

interface WordProps {
  word: ReactNode;
  range?: number;
}

const Word: FunctionComponent<WordProps> = () => {
  return (
    <div className='word'/>
  );
}

export default Word;