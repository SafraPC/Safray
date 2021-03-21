import React,{useState} from 'react';
import List from '../List';
import {loadLists} from '../../services/api'
import { Container } from './styles';
import  BoardContext from'./context';
import produce from 'immer'

function Board() {
  const data = loadLists();
  const [lists,setLists] = useState(data);
  

   function move(fromList,from,to){
     console.log(fromList,from,to);
    setLists(produce(lists,draft =>{
      const dragged = draft[fromList]?.cards[from];
      draft[fromList]?.cards.splice(from,1);
      draft[fromList]?.cards.splice(to,0,dragged);
    }))
  }

return (
  <BoardContext.Provider value={{lists,move}}>
<Container>
   {lists.map((list,index) => (
   <List key={list.title} index={index} data={list}/>))}
  </Container>
  </BoardContext.Provider>
  )
}

export default Board;