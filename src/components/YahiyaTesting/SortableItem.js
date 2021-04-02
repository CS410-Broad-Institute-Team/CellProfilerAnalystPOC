import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import jones from '../jones.jpg'

export function SortableItem(props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    // <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
    //   <img height={100} width={100} src={jones}></img>
    // </div>
    <SortableItem></SortableItem>
  );
}