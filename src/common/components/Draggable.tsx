import { useDraggable } from '@dnd-kit/react';
import React from 'react';

const Draggable = ({ children }: { children: React.ReactNode }) => {
  const { ref } = useDraggable({
    id: 'draggable',
  });

  return <div ref={ref}></div>;
};

export default Draggable;
