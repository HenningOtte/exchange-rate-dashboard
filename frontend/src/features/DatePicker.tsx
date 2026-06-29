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

  return (
    <div className="currency-input-container date-input-container">
      <p className="currency-label">{title}</p>
      <input
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
