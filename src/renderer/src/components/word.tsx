import {FunctionComponent} from 'react';

interface WordProps {
  word?: string;
  range?: number;
}

const Word: FunctionComponent<WordProps> = ({word}) => {
  return (
    <div className='word'>
      {word}
    </div>
  );
}

export default Word;