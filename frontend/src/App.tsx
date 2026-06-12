import Navbar from "./components/Navbar";
import ConverterCard from "./features/ConverterCard";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <main>
        <ConverterCard title="Converter"></ConverterCard>
      </main>
    </>
  );
}

export default App;
