import "./ConverterCard.css";
import CurrencyInput from "./CurrencyInput";
import DatePicker from "./DatePicker";
import Switch from "@mui/material/Switch";
import type { ExchangeState } from "../../types/exchangeState";
import { createExchangeState } from "../../types/exchangeState";
import { useContext } from "react";
import { NewExchangeContext } from "../../context/ExchangeContext";
import {
  saveToLocal,
  loadLocalStorage,
  overwriteFavorite,
} from "../../services/localStorage";

type CardProps = {
  title: string;
};

function Card({ title }: CardProps) {
  let exchangeContext = useContext(NewExchangeContext);
  const isDisabled = exchangeContext?.exchange.converter.isHistorical
    ? false
    : true;

  return (
    <div className="converter-card max-w-512">
      <button
        onClick={() => {
          if (exchangeContext?.exchange == null) return;

          if (exchangeContext.activeFavoriteId) {
            overwriteFavorite(
              exchangeContext.activeFavoriteId,
              exchangeContext.exchange,
            );
          } else {
            saveToLocal(exchangeContext?.exchange, "Name");
          }
          exchangeContext.setFavoritesState(loadLocalStorage());
        }}
        className="save-icon"
      ></button>
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
          checked={exchangeContext?.exchange.converter.isHistorical}
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
