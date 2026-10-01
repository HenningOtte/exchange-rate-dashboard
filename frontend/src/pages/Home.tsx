import ConverterCard from "../features/converter/ConverterCard";
import DashboardCard from "../features/converter/DashboardCard";
import { useContext } from "react";
import { clearExchangeState } from "../types/exchangeState";
import { calculateHistoricalExchange } from "../services/exchangeService";
import { calculateLatestRates } from "../services/exchangeService";
import { createExchangeState } from "../types/exchangeState";
import { NewExchangeContext } from "../context/ExchangeContext";
import { ValidationContext } from "../context/ValidationProvider";

function Home() {
  const exchangeContext = useContext(NewExchangeContext);
  const validationContext = useContext(ValidationContext);

  const updateTargetValue = (convertedValue: string) => {
    exchangeContext?.setExchangeState((state) => {
      let newState = createExchangeState(state);
      newState.converter.targetValue = convertedValue;
      return newState;
    });
  };

  const updateConvertedValue = async () => {
    if (exchangeContext == null) return;

    const {
      sourceCurrency,
      targetCurrency,
      initialValue,
      historicalDate,
      isHistorical,
    } = exchangeContext.exchange.converter;

    if (isHistorical && historicalDate.length > 0) {
      let convertedValue = await calculateHistoricalExchange(
        sourceCurrency,
        targetCurrency,
        initialValue,
        historicalDate,
      );
      if (convertedValue != null) updateTargetValue(convertedValue);
    } else {
      let convertedValue = await calculateLatestRates(
        sourceCurrency,
        targetCurrency,
        initialValue,
      );

      if (convertedValue != null) updateTargetValue(convertedValue);
    }
  };

  const handleClearExchange = () => {
    if (exchangeContext == null) return;
    exchangeContext.setExchangeState((exchange) => {
      return clearExchangeState(exchange);
    });
    exchangeContext.setActiveFavoriteId(null);
    exchangeContext.setActiveFavoriteName("");

    validationContext?.setValidationErrors({
      favoriteName: null,
      initialValue: null,
      targetValue: null,
    });
  };

  return (
    <div className="home">
      <ConverterCard title="Converter"></ConverterCard>
      <DashboardCard title="Dashboard"></DashboardCard>
      <div className="start-clear-container">
        <button
          onClick={() => {
            updateConvertedValue();
          }}
          className="start-btn"
        >
          START
        </button>
        <button
          onClick={() => {
            handleClearExchange();
          }}
          className="clear-btn"
        >
          CLEAR
        </button>
      </div>
    </div>
  );
}

export default Home;
