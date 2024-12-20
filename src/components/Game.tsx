import React, { useRef, useState } from "react";
import "./Game.css";
const Game = () => {
  const defaultState: { index: number | null; key: number | null } = {
    index: null,
    key: null,
  };

  const items = [1, 2, 3, 4, 5];

  const [firstCard, setFirstCard] = useState(defaultState);
  const [secondCard, setSecondCard] = useState(defaultState);
  const [remainingCards, setremainingCards] = useState(items);
  const [moves, setMoves] = useState(0);

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

  const [allItems] = useState(() => shuffle([...items, ...items]));
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
      <div className="game">
        <div className="status">
          {remainingCards.length > 0 ? (
            <>
              <p>Remaining Cards:</p>
              <div className="remaining-cards">
                {remainingCards.map((card, index) => (
                  <span key={index} className="text-lg font-bold mx-1">
                    {card}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <p className="text-green-500 text-2xl font-bold">Victory!</p>
          )}
        </div>

        <div className="cardsContainer grid grid-cols-5 gap-4">
          {allItems.map((item, index) => (
            <div key={index} className="relative">
              <div
                className={`card ${
                  firstCard.index === index ||
                  secondCard.index === index ||
                  !remainingCards.includes(item)
                    ? "flipped"
                    : ""
                }`}
                onClick={() => handleCardClick(index, item)}
              >
                {/* Front Side */}
                <div className="frontSide"></div>
                {/* Back Side */}
                <div className="backSide absolute inset-0 flex justify-center items-center">
                  <img
                    src={`https://robohash.org/${item}`}
                    alt={`Card ${item}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <p>Moves Used: {moves}</p>
      </div>
    </>
  );
};

export default Game;
