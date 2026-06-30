import "./CurrencyInput.css";
import { useContext } from "react";
import { ExchangeContext } from "../pages/Home.tsx";
import type { ExchangeState } from "../types/exchangeState";
import { createExchangeState } from "../types/exchangeState";

type DateProps = {
  title: string;
  disabled: boolean;
  id: string;
};

function DatePicker({ title, disabled, id }: DateProps) {
  let exchangeContext = useContext(ExchangeContext);

  const setDateValue = () => {
    if (id === "dateHistorical")
      return exchangeContext?.exchangeState.converter.historicalDate;
    if (id === "dateFrom")
      return exchangeContext?.exchangeState.dashboard.dateFrom;
    if (id === "dateTo") return exchangeContext?.exchangeState.dashboard.dateTo;
  };

  return (
    <div className="currency-input-container date-input-container">
      <p className="currency-label">{title}</p>
      <input
        value={setDateValue()}
        id={id}
        onChange={(e) => {
          let date = e.currentTarget.value;

          exchangeContext?.setExchangeState((exchange) => {
            const exchangeViewState: ExchangeState =
              createExchangeState(exchange);

            if (id === "dateHistorical")
              exchangeViewState.converter.historicalDate = date;

            if (id === "dateFrom") exchangeViewState.dashboard.dateFrom = date;

            if (id === "dateTo") exchangeViewState.dashboard.dateTo = date;

            return exchangeViewState;
          });
        }}
        disabled={disabled}
        type="date"
      />
    </div>
  );
}

export default DatePicker;
