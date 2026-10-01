import ConverterCard from "../features/converter/ConverterCard";
import DashboardCard from "../features/converter/DashboardCard";
import { useContext, useState, useEffect } from "react";
import { clearExchangeState } from "../types/exchangeState";
import { calculateHistoricalExchange } from "../services/exchangeService";
import { calculateLatestRates } from "../services/exchangeService";
import { createExchangeState } from "../types/exchangeState";
import { NewExchangeContext } from "../context/ExchangeContext";
import { ValidationContext } from "../context/ValidationProvider";
import {
  saveToLocal,
  loadLocalStorage,
  overwriteFavorite,
} from "../services/localStorage";
import { postSingleFavorite, putSingleFavorite } from "../api/favoritesApi";
import { AuthContext } from "../context/AuthProvider";
import heartIconWhite from "../assets/icons/heart-white.svg";
import startIconWhite from "../assets/icons/start-white.png";
import trashIcon from "../assets/icons/trash.png";

function Home() {
  const authContext = useContext(AuthContext);
  const exchangeContext = useContext(NewExchangeContext);
  const validationContext = useContext(ValidationContext);

  const [favoriteSaved, setFavoriteSaved] = useState(false);

  useEffect(() => {
    if (!favoriteSaved) return;

    const timer = setTimeout(() => {
      setFavoriteSaved(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, [favoriteSaved]);

  const updateTargetValue = (convertedValue: string) => {
    exchangeContext?.setExchangeState((state) => {
      let newState = createExchangeState(state);
      newState.converter.targetValue = convertedValue;
      return newState;
    });
  };

  const updateConvertedValue = async () => {
    if (exchangeContext == null) return;

    const {
      sourceCurrency,
      targetCurrency,
      initialValue,
      historicalDate,
      isHistorical,
    } = exchangeContext.exchange.converter;

    if (isHistorical && historicalDate.length > 0) {
      let convertedValue = await calculateHistoricalExchange(
        sourceCurrency,
        targetCurrency,
        initialValue,
        historicalDate,
      );
      if (convertedValue != null) updateTargetValue(convertedValue);
    } else {
      let convertedValue = await calculateLatestRates(
        sourceCurrency,
        targetCurrency,
        initialValue,
      );

      if (convertedValue != null) updateTargetValue(convertedValue);
    }
  };

  const handleClearExchange = () => {
    if (exchangeContext == null) return;
    exchangeContext.setExchangeState((exchange) => {
      return clearExchangeState(exchange);
    });
    exchangeContext.setActiveFavoriteId(null);
    exchangeContext.setActiveFavoriteName("");

    validationContext?.setValidationErrors({
      favoriteName: null,
      initialValue: null,
      targetValue: null,
    });
  };

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

    validationContext?.setValidationErrors(message);

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

  return (
    <div className="home">
      <ConverterCard title="Converter"></ConverterCard>
      <DashboardCard title="Dashboard"></DashboardCard>
      <div className="action-buttons">
        <button
          onClick={() => {
            updateConvertedValue();
          }}
          className="start-btn"
        >
          <img src={startIconWhite} alt="" className="action-button-icon" />
          START
        </button>

        <button
          onClick={() => {
            handleClearExchange();
          }}
          className="clear-btn"
        >
          <img src={trashIcon} alt="" className="action-button-icon" />
          CLEAR
        </button>

        <button
          disabled={
            exchangeContext?.exchange.converter.initialValue.length == 0
          }
          onClick={() => {
            handleSaveFavorite();
          }}
          className={
            exchangeContext?.exchange.converter.initialValue.length == 0
              ? "save-button save-button-disabled"
              : "save-button"
          }
        >
          <img src={heartIconWhite} alt="" className="action-button-icon" />
          SAVE
        </button>
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

export default Home;
