import { useState, useEffect } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

//public 폴더의 이미지들을 사용하기 쉽게 정리하기 !
const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  // 카드 배열을 스테이트로 ...!
  const [cards, setCards] = useState([]);
  // 턴 횟수 !
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null); //첫번째 선택 카드
  const [choiceTwo, setChoiceTwo] = useState(null); //두번째 선택 카드
  const [disabled, setDisabled] = useState(false); //true일때 선택 못하게
  // 카드 섞기
  const shuffledCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };
  // console.log(cards, turns);

  //카드 선택 시 기억하기
  function handleChoice(card) {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      // 두개 카드를 선택시 다른 카드 선택 불가
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        console.log("카드를 맞췄습니다 !");
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              // 그대로 두기
              return card;
            }
          });
        });
        resetTurn();
      } else {
        console.log("틀렸네요 !");
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // 리셋 함수 (선택들을 초기화)
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    // 맞춘 횟수 1 증가
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffledCards();
  }, []);

  return (
    <div>
      <div className="App">
        <h1>Magic Match</h1>
        <button onClick={shuffledCards}>New Game</button>
      </div>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            card={card}
            handleChoice={handleChoice}
            key={card.id}
            disabled={disabled}
          />
        ))}
      </div>
      <p>턴수: {turns}</p>
    </div>
  );
}

export default App;
