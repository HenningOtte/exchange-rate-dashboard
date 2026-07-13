import "./CurrencyInput.css";
import { useContext } from "react";
import { ExchangeContext } from "../../pages/Home.tsx";
import type { ExchangeState } from "../../types/exchangeState.tsx";
import { createExchangeState } from "../../types/exchangeState.tsx";

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

  const getDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);

    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${date.getFullYear()}-${month}-${day}`;
  };

  return (
    <div className="currency-input-container date-input-container">
      <p className="currency-label">{title}</p>
      <input
        min="2000-01-01"
        max={getDate()}
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
