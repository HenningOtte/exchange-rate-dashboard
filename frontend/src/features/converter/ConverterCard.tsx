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
import { AuthContext } from "../../context/AuthProvider";
import { postSingleFavorite, putSingleFavorite } from "../../api/favoritesApi";

type CardProps = {
  title: string;
};

function Card({ title }: CardProps) {
  const authContext = useContext(AuthContext);
  const exchangeContext = useContext(NewExchangeContext);
  const isDisabled = exchangeContext?.exchange.converter.isHistorical
    ? false
    : true;

  const handleSaveFavorite = async () => {

    if (exchangeContext?.exchange == null) return;

    if (authContext?.isLoggedIn) {
      const { converter, dashboard } = exchangeContext.exchange;
      if (exchangeContext.activeFavoriteId) {
        await putSingleFavorite(
          "From frontend",
          converter.initialValue,
          converter.targetValue,
          converter.sourceCurrency,
          converter.targetCurrency,
          converter.historicalDate,
          converter.isHistorical,
          dashboard.dateFrom,
          dashboard.dateTo,
          exchangeContext.activeFavoriteId
        );

      } else {
        await postSingleFavorite(
          "From frontend",
          converter.initialValue,
          converter.targetValue,
          converter.sourceCurrency,
          converter.targetCurrency,
          converter.historicalDate,
          converter.isHistorical,
          dashboard.dateFrom,
          dashboard.dateTo,
        );
      }
    } else {
      if (exchangeContext.activeFavoriteId) {
        overwriteFavorite(
          exchangeContext.activeFavoriteId,
          exchangeContext.exchange,
        );
      } else {
        saveToLocal(exchangeContext.exchange, "Name");
      }
      exchangeContext.setFavoritesState(loadLocalStorage());
    }
  }

  return (
    <div className="converter-card max-w-512">
      <button
        disabled={exchangeContext?.exchange.converter.initialValue.length == 0}
        onClick={() => { handleSaveFavorite() }}
        className={exchangeContext?.exchange.converter.initialValue.length == 0 ? "save-icon save-icon-disabled" : "save-icon"}
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
