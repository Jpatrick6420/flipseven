import { useState, useEffect } from "react";
import "./App.css";
import AddPlayer from "./components/AddPlayer";
import PlayGame from "./components/PlayGame";
import GameOver from "./components/GameOver";

function App() {
  const [players, setPlayers] = useState([]);
  const [gamePhase, setGamePhase] = useState("setup");
  const [winners, setWinners] = useState([]);
  const [topPlayer, setTopPlayer] = useState();

  useEffect(() => {
    if (winners.length >= 1) {
      const gameWinner = winners.reduce((cum, cur) => {
        cum = cur.score > cum.score ? cur : cum;
        console.log("cum", cum);
        return cum;
      });
      setGamePhase("game_over");
      setTopPlayer(gameWinner);
    }
  }, [winners]);

  return (
    <section>
      {gamePhase == "setup" && (
        <AddPlayer handle={setPlayers} handlePhaseChange={setGamePhase} />
      )}
      {gamePhase == "play" && (
        <PlayGame
          players={players}
          setPlayers={setPlayers}
          setWinners={setWinners}
        />
      )}
      {gamePhase == "game_over" && (
        <GameOver
          winner={topPlayer}
          setPlayers={setPlayers}
          setGamePhase={setGamePhase}
          setWinners={setWinners}
          setTopPlayer={setTopPlayer}
        />
      )}

      <table className="table">
        <thead>
          <tr>
            <th>Round</th>
            {players.length > 0 &&
              players.map((player, i) => {
                return <th key={i + player.name}>{player.name}</th>;
              })}
          </tr>
        </thead>
        <tbody>
          {Array.from(
            {
              length: Math.max(
                0,
                ...players.map((p) => p.prevScores?.length ?? 0)
              ),
            },
            (_, roundIdx) => (
              <tr key={roundIdx}>
                <td>{roundIdx + 1}</td>
                {players.map((p) => (
                  <td key={p.name}>{p.prevScores?.[roundIdx] ?? ""}</td>
                ))}
              </tr>
            )
          )}
          {/* {players.length > 0 &&
            players[0].prevScores.map((_, roundInd) => (
              <tr key={roundInd}>
                {players.map((player) => (
                  <td key={player.name}>
                    {player.prevScores[roundInd]?.score ?? ""}
                  </td>
                ))}
              </tr>
            ))} */}
        </tbody>
        <tfoot>
          <tr>
            <td>Total Score</td>
            {players.length > 0 &&
              players.map((cur, i) => {
                return <td key={i}>{cur.score}</td>;
              })}
          </tr>
        </tfoot>
      </table>
    </section>
  );
}

export default App;
