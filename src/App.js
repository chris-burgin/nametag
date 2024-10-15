import "./App.css";
import { useState } from "react";
import Papa from "papaparse";

function App() {
  const [fields, setFields] = useState({});
  const [header, setHeader] = useState(undefined);
  const [data, setData] = useState(undefined);

  const uploadFile = async (event) => {
    const text = await event.target.files[0].text();
    const parsed = Papa.parse(text).data;

    setHeader(parsed[0]);
    delete parsed[0];

    setData(parsed);
  };

  return (
    <div className="App">
      <div className="controls">
        <input type="file" onChange={uploadFile} className="upload" />
        <div className="selects">
          <label>
            Primary
            <select
              name="primary"
              onChange={(event) =>
                setFields({
                  ...fields,
                  primary: event.target.selectedIndex - 1,
                })
              }
            >
              <option></option>
              {header && header.map((entry) => <option> {entry} </option>)}
            </select>
          </label>

          <label>
            Secondary
            <select
              name="secondary"
              onChange={(event) =>
                setFields({
                  ...fields,
                  secondary: event.target.selectedIndex - 1,
                })
              }
            >
              <option></option>
              {header && header.map((entry) => <option> {entry} </option>)}
            </select>
          </label>
        </div>
      </div>

      <div className="card-wrapper">
        {data &&
          fields.primary &&
          data.map((entry) => (
            <div className="card">
              <div className="name">{entry[fields.primary]}</div>
              <div className="divider" />
              <div className="team">{entry[fields.secondary]}</div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
