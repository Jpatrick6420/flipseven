function Table({ data }) {
  return (
    <div className="table_wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Round</th>
            {data.length > 0 &&
              data.map((player, i) => {
                return <th key={i + player.name}>{player.name}</th>;
              })}
          </tr>
        </thead>
        <tbody>
          {Array.from(
            {
              length: Math.max(
                0,
                ...data.map((p) => p.prevScores?.length ?? 0)
              ),
            },
            (_, roundIdx) => (
              <tr key={roundIdx}>
                <td>{roundIdx + 1}</td>
                {data.map((p) => (
                  <td key={p.name}>{p.prevScores?.[roundIdx] ?? ""}</td>
                ))}
              </tr>
            )
          )}
        </tbody>
        <tfoot>
          <tr>
            <td>Total Score</td>
            {data.length > 0 &&
              data.map((cur, i) => {
                return <td key={i}>{cur.score}</td>;
              })}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default Table;
