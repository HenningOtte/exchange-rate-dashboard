import "./CurrencyInput.css";
import type { ExchangeState } from "../types/exchangeState";
import { createExchangeState } from "../types/exchangeState";

import { useContext } from "react";
import { ExchangeContext } from "../App.tsx";

type InputProps = {
  title: string;
  id: string;
};

function CurrencyInput({ title, id }: InputProps) {
  let exchangeContext = useContext(ExchangeContext);

  return (
    <div className="currency-input-container">
      <p className="currency-label">{title}</p>
      <input
        id={id}
        onInput={(e) => {
          let inputValue = e.currentTarget.value;

          if (id === "initialValue") {
            exchangeContext?.setExchangeState((exchange) => {
              const exchangeViewState: ExchangeState =
                createExchangeState(exchange);
              exchangeViewState.converter.initialValue = inputValue;
              return exchangeViewState;
            });
          }
        }}
        className="currency-input"
        type="number"
        placeholder="0"
      />
      <button className="currency-button">
        <p>USD</p> <div className="selector-arrow"></div>
      </button>
    </div>
  );
}

export default CurrencyInput;
