import "./CurrencyInput.css";
import { useContext } from "react";
import { ExchangeContext } from "../App.tsx";
import type { ExchangeState } from "../types/exchangeState";
import { createExchangeState } from "../types/exchangeState";

type DateProps = {
  title: string;
  disabled: boolean;
};

function DatePicker({ title, disabled }: DateProps) {
  let exchangeContext = useContext(ExchangeContext);

  return (
    <div className="currency-input-container date-input-container">
      <p className="currency-label">{title}</p>
      <input
        onInput={(e) => {
          let date = e.currentTarget.value;

          exchangeContext?.setExchangeState((exchange) => {
            const exchangeViewState: ExchangeState =
              createExchangeState(exchange);
            exchangeViewState.converter.historicalDate = date;

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
