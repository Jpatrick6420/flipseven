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
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item.name}</td>
                <td> {item.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default App;
