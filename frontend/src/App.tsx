import Navbar from "./components/Navbar";
import ConverterCard from "./features/ConverterCard";
import DashboardCard from "./features/DashboardCard";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <main>
        <ConverterCard title="Converter"></ConverterCard>
        <DashboardCard title="Dashboard"></DashboardCard>
      </main>
    </>
  );
}

export default App;
