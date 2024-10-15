import "./App.css";
import { useState } from "react";
import Papa from "papaparse";

function App() {
  const [cards, setCards] = useState(undefined);

  const uploadFile = async (event) => {
    const text = await event.target.files[0].text();
    const parsed = Papa.parse(text).data;
    delete parsed[0];

    const res = parsed.map((item) => ({
      name: item[2],
      team: item[4],
    }));

    setCards(res);
  };

  return (
    <div className="App">
      <input type="file" onChange={uploadFile} className="upload" />

      <div className="card-wrapper">
        {cards &&
          cards.map((card) => (
            <div className="card">
              <div className="name"> {card.name}</div>
              <div className="divider" />
              <div className="team"> {card.team}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
