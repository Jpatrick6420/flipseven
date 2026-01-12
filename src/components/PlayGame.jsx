import { useState } from "react";
function PlayGame({ players, setPlayers, setWinners }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [tempScore, setTempScore] = useState(() =>
    players.map((player) => ({ ...player, score: 0 }))
  );

  const handleScoreChange = (input) => {
    setScore(input.target.value);
  };
  const handleScoreSubmit = () => {
    setTempScore((prev) =>
      prev.map((player, i) => {
        return i === index ? { ...player, score } : player;
      })
    );
    setIndex((index) => {
      return index < players.length - 1 ? index + 1 : 0;
    });
    setScore(0);
  };

  const handleEndRound = () => {
    setPlayers((prev) => {
      const updatedPlayer = prev.map((player, i) => {
        return {
          ...player,
          score: Number(player.score) + Number(tempScore[i].score),
        };
      });
      const winners = updatedPlayer.filter((player) => player.score >= 200);
      if (winners.length > 0) {
        setWinners([...winners]);
      }
      return updatedPlayer;
    });
    setScore(0);
    setIndex(0);

    setTempScore((prev) =>
      prev.map((player) => {
        return { ...player, score: 0 };
      })
    );
    // setGamePhase("between_rounds");

    console.log("players", players);
  };

  return (
    <>
      {
        <div className="name_section">
          <label>What did {tempScore[index]?.name} score this round?</label>
          <input
            type="number"
            value={score}
            onChange={(e) => handleScoreChange(e)}
          />
          <button onClick={handleScoreSubmit}>Submit</button>
          <button onClick={handleEndRound}>End Round</button>
        </div>
      }
      <ul>
        {tempScore.map((item, i) => {
          return (
            <li key={i + item.name}>
              {item.name} score: {item.score}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default PlayGame;
