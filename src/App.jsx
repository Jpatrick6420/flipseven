import { useState, useEffect } from "react";
import "./App.css";
import AddPlayer from "./components/AddPlayer";
import PlayGame from "./components/PlayGame";
import GameOver from "./components/GameOver";
import Table from "./components/Table";

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

      {players.length > 0 && <Table data={players} />}
    </section>
  );
}

export default App;
