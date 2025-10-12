import {FunctionComponent, ReactNode} from 'react';

interface TitleProps {
  text: ReactNode;
}

const Title: FunctionComponent<TitleProps> = () => {
  return (
    <div className='title'/>
  );
}

export default Title;