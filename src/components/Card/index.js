import React,{useRef,useContext} from 'react';
import {useDrag, useDrop} from 'react-dnd';
import { Container ,Label} from './styles';
import BoardContext from '../Board/context'

function Card({data,index,listIndex}) {

  const ref = useRef();
  const {move} = useContext(BoardContext)
  
 const [{isDragging}, dragRef] = useDrag({
  item:{id:data.id, index,listIndex},
  type:"CARD",
   canDrag:true,
   collect:monitor => ({
     isDragging:monitor.isDragging(),
   }),
 })
 const [, dropRef] = useDrop({
  accept:"CARD",
  hover(item,monitor){

    //log in selected card
    // console.log(item.index, index);
    const draggedListIndex = item.listIndex;
    // const targetListIndex = listIndex;

    const draggedIndex = item.index;
    const targetIndex = index;
    
    if(draggedIndex === targetIndex){
      return;
    }
    const targetSize = ref.current.getBoundingClientRect();
    const targetCenter = (targetSize.bottom - targetSize.top)/2; 
    const draggedOffSet = monitor.getClientOffset();
    const draggedTop = draggedOffSet.y - targetSize.top;

    if(draggedIndex - targetIndex && draggedTop < targetCenter){
      return;
    }
    if(draggedIndex > targetIndex && draggedTop > targetCenter){
      return
    }
    move(draggedListIndex,draggedIndex,targetIndex);
  }
 })

 dragRef(dropRef(ref));

  return (
  <Container ref={ref} isDragging={isDragging}>
  <header>
    {data.labels.map(label=> <Label key={label} color={label}/>)}
   
    </header>  
    <p>{data.content}</p>
    {data.user  && <img src={data.user} alt=""/>}
  </Container>);
}

export default Card;