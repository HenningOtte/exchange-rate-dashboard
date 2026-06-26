import "./ConverterCard.css";
import CurrencyInput from "./CurrencyInput";
import DatePicker from "./DatePicker";
import Switch from "@mui/material/Switch";
import type { ExchangeState } from "../types/exchangeState";
import { createExchangeState } from "../types/exchangeState";

import { useContext, useState } from "react";
import { ExchangeContext } from "../App.tsx";

type CardProps = {
  title: string;
};

function Card({ title }: CardProps) {
  let exchangeContext = useContext(ExchangeContext);
  const isDisabled = exchangeContext?.exchangeState.converter.isHistorical
    ? false
    : true;

  return (
    <div className="converter-card max-w-512">
      <h2>{title}</h2>
      <div className="currency-inputs">
        <CurrencyInput title="Initial value" id="initialValue"></CurrencyInput>
        <CurrencyInput title="Target value" id="targetValue"></CurrencyInput>
      </div>
      <div className="date-controls">
        <DatePicker
          title="Date"
          disabled={isDisabled}
          id="dateHistorical"
        ></DatePicker>
        <Switch
          checked={exchangeContext?.exchangeState.converter.isHistorical}
          onClick={() => {
            exchangeContext?.setExchangeState((exchange) => {
              const exchangeViewState: ExchangeState =
                createExchangeState(exchange);

              exchangeViewState.converter.isHistorical =
                !exchange.converter.isHistorical;

              return exchangeViewState;
            });
          }}
          size="small"
        />
      </div>
    </div>
  );
}

export default Card;
