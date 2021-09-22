function History({ history }) {
  return (
    <div className="history">
      {history.length > 0 ? (
        history.map((element, idx) => {
          return (
            <div className="history-element" key={idx}>
              <h5>Word: {element.word}</h5>
              <h5>Description: {element.description}</h5>
            </div>
          );
        })
      ) : (
        <h3>There is no search history</h3>
      )}
    </div>
  );
}

export default History;
