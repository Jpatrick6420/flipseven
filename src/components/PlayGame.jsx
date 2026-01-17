import { useState } from "react";
function PlayGame({ players, setPlayers, setWinners }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [tempScore, setTempScore] = useState(() =>
    players.map((player) => ({ ...player, score: 0, prevScores: [] })),
  );

  const handleScoreChange = (input) => {
    setScore(input.target.value);
  };
  const handleScoreSubmit = (e) => {
    e.preventDefault();
    setTempScore((prev) =>
      prev.map((player, i) => {
        return i === index ? { ...player, score } : player;
      }),
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
          ///added teh current round scores to an array
          prevScores: [...player.prevScores, Number(tempScore[i].score)],
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
      }),
    );
    // setGamePhase("between_rounds");
  };

  return (
    <>
      {
        <form className="round_section" onSubmit={(e) => handleScoreSubmit(e)}>
          <div>
            <label>What did {tempScore[index]?.name} score this round?</label>
            <br />
            <input
              type="number"
              value={score}
              onChange={(e) => handleScoreChange(e)}
              autoFocus
            />
          </div>

          <div>
            <button onClick={(e) => handleScoreSubmit(e)}>Submit</button>
            <button onClick={handleEndRound}>End Round</button>
          </div>
        </form>
      }
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Round Score</th>
          </tr>
        </thead>
        <tbody>
          {tempScore.map((item, i) => {
            return (
              <tr key={i + item.name}>
                <td>{item.name} </td>
                <td>{item.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default PlayGame;
