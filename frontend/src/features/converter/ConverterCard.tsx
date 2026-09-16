import "./ConverterCard.css";
import CurrencyInput from "./CurrencyInput";
import DatePicker from "./DatePicker";
import Switch from "@mui/material/Switch";
import type { ExchangeState } from "../../types/exchangeState";
import { createExchangeState } from "../../types/exchangeState";
import { useContext, useState, useEffect } from "react";
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
  const [favoriteSaved, setFavoriteSaved] = useState(false);
  const authContext = useContext(AuthContext);
  const exchangeContext = useContext(NewExchangeContext);
  const isDisabled = exchangeContext?.exchange.converter.isHistorical
    ? false
    : true;

  useEffect(() => {
    const timer = setTimeout(() => {
      setFavoriteSaved(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [favoriteSaved]);

  const handleSaveFavorite = async () => {
    if (exchangeContext?.exchange == null) return;
    if (exchangeContext.activeFavoriteName.length < 3) return;

    const token = localStorage.getItem("token");

    if (authContext?.isLoggedIn && token) {
      const { converter, dashboard } = exchangeContext.exchange;

      if (exchangeContext.activeFavoriteId) {
        await putSingleFavorite(
          exchangeContext.activeFavoriteName,
          converter.initialValue,
          converter.targetValue,
          converter.sourceCurrency,
          converter.targetCurrency,
          converter.historicalDate,
          converter.isHistorical,
          dashboard.dateFrom,
          dashboard.dateTo,
          exchangeContext.activeFavoriteId,
          token,
        );
      } else {
        await postSingleFavorite(
          exchangeContext.activeFavoriteName,
          converter.initialValue,
          converter.targetValue,
          converter.sourceCurrency,
          converter.targetCurrency,
          converter.historicalDate,
          converter.isHistorical,
          dashboard.dateFrom,
          dashboard.dateTo,
          token,
        );
      }
    } else {
      if (exchangeContext.activeFavoriteId) {
        overwriteFavorite(
          exchangeContext.activeFavoriteId,
          exchangeContext.activeFavoriteName,
          exchangeContext.exchange,
        );
      } else {
        saveToLocal(
          exchangeContext.exchange,
          exchangeContext.activeFavoriteName,
        );
      }
      exchangeContext.setFavoritesState(loadLocalStorage());
    }
    setFavoriteSaved(true);
  };

  const updateFavoriteName = (e: React.InputEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    exchangeContext?.setActiveFavoriteName(input.value);
  };

  return (
    <div className="converter-card max-w-512">
      <button
        disabled={exchangeContext?.exchange.converter.initialValue.length == 0}
        onClick={() => {
          handleSaveFavorite();
        }}
        className={
          exchangeContext?.exchange.converter.initialValue.length == 0
            ? "save-icon save-icon-disabled"
            : "save-icon"
        }
      ></button>
      <h2>{title}</h2>
      <div className="favorite-name-container">
        <p className="favorite-label">Name</p>
        <input
          value={exchangeContext?.activeFavoriteName}
          onInput={(e) => {
            updateFavoriteName(e);
          }}
          id="favoriteName"
          className="favorite-name-input"
          type="text"
          maxLength={30}
        />
      </div>
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
      {favoriteSaved ? (
        <div className="save-message-container">
          <div className="save-message">
            "{exchangeContext?.activeFavoriteName}" saved!
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Card;
