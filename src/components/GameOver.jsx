function GameOver({
  winner,
  setPlayers,
  setGamePhase,
  setWinners,
  setTopPlayer,
}) {
  const handleNewGame = () => {
    setPlayers((prev) => prev.map((item) => ({ ...item, score: 0 })));
    setGamePhase("play");
    setWinners([]);
    setTopPlayer({});
  };
  return (
    <div>
      <h1>
        {winner.name} won with a score of {winner.score}
      </h1>
      <button onClick={handleNewGame}>New Game</button>
    </div>
  );
}

export default GameOver;
