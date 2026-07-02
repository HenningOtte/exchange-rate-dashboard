import "./ConverterCard.css";
import "./DashboardCard.css";
import DatePicker from "./DatePicker";
import FavoriteSelector from "./FavoriteSelector";
import { useContext } from "react";
import { ExchangeContext } from "../../pages/Home.tsx";

type DashboardProps = {
  title: string;
};

function DashboardCard({ title }: DashboardProps) {
  let exchangeContext = useContext(ExchangeContext);

  return (
    <div className="converter-card">
      <h2>{title}</h2>
      <div className="date-range">
        <DatePicker title="From" disabled={false} id="dateFrom"></DatePicker>
        <DatePicker title="To" disabled={false} id="dateTo"></DatePicker>
      </div>
      <div className="history-chart"></div>
      <FavoriteSelector></FavoriteSelector>
    </div>
  );
}

export default DashboardCard;
