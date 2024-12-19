import React from 'react'


const items= [1,2,3,4,5];

function shuffle(array:any) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
      return array;
  }
}
const allItems=shuffle([...items, ...items]);

const handleCardClick=()=>{

}

const Game = () => {
  return (
    <>
    <div>

      {allItems.map((item:number, index:number) => (
        <div className='grid grid-cols-5' key={index} onClick={() => handleCardClick()}>

          <div className='h-48 gap-4 place-items-center m-4 grid relative justify-center bg-teal-300'>   {item}</div>
       
        </div>
      ))}
    </div>

  
      
    </>
  )
}

export default Game
