import { useEffect } from "react";
import PieChart from "./components/PieChart";
import Table from "./components/Table";
import { useData } from "./utils/useData";

function App() {
  const fetchAllCitizens = useData((state) => state.fetch);
  const data = useData((state) => state.data);
  useEffect(() => {
    fetchAllCitizens();
  }, [fetchAllCitizens]);
  return (
    <div>
      <PieChart pieChartData={data} />
      <Table dataForTable={data} />
    </div>
  );
}

export default App;
