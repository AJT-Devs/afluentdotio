// src/renderer/src/components/Title.tsx

import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import '@renderer/assets/stylesheets/components/brainstorming/title.css';

export interface TitleProps{
  title: string;
  isShowTitle: boolean;
}

const Title = memo(({title, isShowTitle, ...props}: TitleProps) => {

  return (
    <>
      <span className={`title ${isShowTitle ? 'title-v' : ''}`}>
        {title}
      </span>
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </>
  );
});

Title.displayName = 'Title';

export default Title;