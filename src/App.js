import { useEffect } from "react";
import { useData } from "./utils/useData";
function App() {
  const data = useData((state) => state.data);
  const loading = useData((state) => state.loading);
  const hasErrors = useData((state) => state.hasErrors);
  const fetchAllCitizens = useData((state) => state.fetch);
  const fetchOneCitizen = useData((state) => state.fetchOne);
  const addCitizen = useData((state) => state.createCitizen);
  const editCitizen = useData((state) => state.editCitizen);
  const deleteCitizen = useData((state) => state.deleteCitizen);

  useEffect(() => {
    fetchAllCitizens();
  }, [fetchAllCitizens]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (hasErrors) {
    return <p>cannot read data</p>;
  }

  return (
    <div>
      <button onClick={fetchAllCitizens}>Fetch all citizens zustand</button>
      <br />
      <button onClick={() => fetchOneCitizen("63760e1408ae6bfde64ce4e7")}>
        Fetch one citizens zustand
      </button>
      <br />
      <button
        onClick={() =>
          addCitizen({
            name: "2",
            email: "2",
            gender: "3",
            address: "4",
            phone: 7,
          })
        }
      >
        Create new citizen zustand
      </button>
      <br />
      <button
        onClick={() =>
          editCitizen("63763cbaeec46b6ad5c0d424", {
            name: "111",
          })
        }
      >
        Edit citizen zustand
      </button>
      <br />
      <button onClick={() => deleteCitizen("63763cedeec46b6ad5c0d425")}>
        Delete citizen zustand
      </button>
      {data && data.map((i) => <p key={i._id}>{i.name}</p>)}
      {/* {data.name} */}
    </div>
  );
}

export default App;
