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

  const [validationErrors, setValidationErrors] = useState({
    favoriteName: null as string | null,
    initialValue: null as string | null,
    targetValue: null as string | null,
  });

  const authContext = useContext(AuthContext);
  const exchangeContext = useContext(NewExchangeContext);
  const isDisabled = exchangeContext?.exchange.converter.isHistorical
    ? false
    : true;

  useEffect(() => {
    if (!favoriteSaved) return;

    const timer = setTimeout(() => {
      setFavoriteSaved(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [favoriteSaved]);

  const hasInputErrors = () => {
    if (exchangeContext?.exchange == null) return;

    const message = {
      favoriteName:
        exchangeContext.activeFavoriteName.length < 3
          ? "The minimum length is three characters."
          : null,

      initialValue:
        Number(exchangeContext.exchange.converter.initialValue) <= 0
          ? "Enter a number."
          : null,

      targetValue:
        Number(exchangeContext.exchange.converter.targetValue) <= 0
          ? "Please press the START button."
          : null,
    };

    setValidationErrors(() => {
      return message;
    });

    const hasErrors = Object.values(message).some((error) => {
      return error !== null;
    });

    return hasErrors;
  };

  const handleSaveFavorite = async () => {
    if (exchangeContext?.exchange == null) return;
    if (hasInputErrors()) return;

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
      <div className="favorite-name-field">
        <div className="favorite-name-container">
          <p className="favorite-label">Name</p>
          <input
            value={exchangeContext?.activeFavoriteName}
            onInput={(e) => {
              updateFavoriteName(e);
            }}
            onClick={() => {
              setValidationErrors((hasErrors) => {
                return {
                  favoriteName: null,
                  initialValue: hasErrors.initialValue,
                  targetValue: hasErrors.targetValue,
                };
              });
            }}
            id="favoriteName"
            className="favorite-name-input"
            type="text"
            maxLength={30}
          />
        </div>
        <div className="errorMessage-conatiner">
          {validationErrors.favoriteName && (
            <span>{validationErrors.favoriteName}</span>
          )}
        </div>
      </div>
      <div className="currency-inputs">
        <CurrencyInput
          title="Initial value"
          id="initialValue"
          validationError={validationErrors.initialValue}
          setValidationErrors={setValidationErrors}
        ></CurrencyInput>
        <CurrencyInput
          title="Target value"
          id="targetValue"
          validationError={validationErrors.targetValue}
          setValidationErrors={setValidationErrors}
        ></CurrencyInput>
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
