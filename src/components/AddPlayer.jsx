import { useState } from "react";
import { formatName } from "../helpers/functions";
function AddPlayer({ handle, handlePhaseChange }) {
  const [playerName, setPlayerName] = useState("");
  const handleSubmitName = (e) => {
    e.preventDefault();
    if (playerName === "") return;
    handle((prev) => [
      ...prev,
      { name: formatName(playerName), score: 0, prevScores: [] },
    ]);
    setPlayerName("");
  };

  const handleNameChange = (input) => {
    const value = input.target.value;

    setPlayerName(value);
  };

  const handleSetupFinished = () => {
    handlePhaseChange("play");
  };
  return (
    <>
      <h1>Lets Play Flip 7</h1>
      <form onSubmit={(e) => handleSubmitName(e)}>
        <label htmlFor="enter_player_name">Enter Player Name</label>
        <br />
        <input
          type="text"
          id="enter_player_name"
          value={playerName}
          onChange={(e) => handleNameChange(e)}
        />
        <div>
          <button onClick={(e) => handleSubmitName(e)}>Enter</button>
          <button onClick={handleSetupFinished}>Finish Setup</button>
        </div>
      </form>
    </>
  );
}

export default AddPlayer;
