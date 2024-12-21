import React, { useRef, useState } from "react";
import "./Game.css";
const Game = () => {
  const defaultState: { index: number | null; key: number | null } = {
    index: null,
    key: null,
  };

  const [firstCard, setFirstCard] = useState(defaultState);
  const [secondCard, setSecondCard] = useState(defaultState);

  const [moves, setMoves] = useState(0);
  const [items, setItems] = useState<number[]>([]); // Holds the card values
  const [allItems, setAllItems] = useState<number[]>([]); // Holds shuffled cards
  const [inputValue, setInputValue] = useState(""); // User input

  const [remainingCards, setremainingCards] = useState(items);

  const initializeGame = () => {
    const newItems = Array.from(
      { length: parseInt(inputValue) || 0 },
      (_, i) => i + 1
    );
    const shuffledItems = shuffle([...newItems, ...newItems]);
    setItems(newItems);
    setAllItems(shuffledItems);
    setremainingCards(newItems);
    setFirstCard(defaultState);
    setSecondCard(defaultState);
  };
  const shuffle = (array: any[]) => {
    let currentIndex = array.length;

    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  // const [allItems] = useState(() => shuffle([...items, ...items]));
  const timer = useRef<NodeJS.Timeout | null>(null);

  const handleCardClick = (index: number, value: number) => {
    if (timer.current !== null) {
      clearTimeout(timer.current);
    }

    // Reset cards if two are already selected
    if (firstCard.index !== null && secondCard.index !== null) {
      setFirstCard(defaultState);
      setSecondCard(defaultState);
    }

    // Handle first card selection
    if (firstCard.index === null) {
      setFirstCard({ index, key: value });
      setMoves((prevMoves) => prevMoves + 1);
    }
    // Handle second card selection
    else if (secondCard.index === null && firstCard.index !== index) {
      setSecondCard({ index, key: value });
      setMoves((prevMoves) => prevMoves + 1);

      if (firstCard.key === value) {
        // Cards match
        setremainingCards((prevCards) =>
          prevCards.filter((card) => card !== value)
        );
      } else {
        // Cards don't match, reset after delay
        timer.current = setTimeout(() => {
          setFirstCard(defaultState);
          setSecondCard(defaultState);
        }, 2000);
      }
    }
  };

  return (
    <>
      <div className="game m-4">
        {/* Input Section */}
        <div className="justify-center items-center mx-auto">
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter number of cards"
            className="border p-2 rounded-lg mr-2"
          />
          <button
            onClick={ 
              initializeGame
            }
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Start Game
          </button>
        </div>
        <div className="game">
          <div
          className={`cardsContainer grid mx-auto ${
            parseInt(inputValue) > 1
              ? `grid-cols-${Math.ceil(parseInt(inputValue) / 2)}`
              : "grid-cols-1"
          } gap-4`}
            onClick={() => console.log(inputValue)}
          >
            {allItems.map((item, index) => (
              <div key={index} className="relative mx-0">
                <div
                  className={`card h-[20rem] ${
                    firstCard.index === index ||
                    secondCard.index === index ||
                    !remainingCards.includes(item)
                      ? "flipped"
                      : ""
                  }`}
                  onClick={() => handleCardClick(index, item)}
                >
                  {/* Front Side */}
                  <div className="frontSide">
                    <img
                      src={`https://robohash.org/${item}?set=set4`}
                      alt={`Card ${item}`}
                    />
                  </div>
                  {/* Back Side */}
                  <div className="backSide absolute inset-0 flex justify-center items-center"></div>
                </div>
              </div>
            ))}
          </div>

          <p>Moves Used: {moves}</p>
        </div>
      </div>
    </>
  );
};

export default Game;
