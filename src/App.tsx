import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import CurrencyGrid from "./components/currencyGrid/CurrencyGrid";
import CurrencyConverter from "./components/currency-converter/CurrencyConverter";

function App() {
  return (
    <div className="App">
      <Header />
      <CurrencyGrid />
      <CurrencyConverter />
      <Footer />
    </div>
  );
}

export default App;
