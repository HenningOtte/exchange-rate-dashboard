import "./ConverterCard.css";
import "./DashboardCard.css";
import DatePicker from "./DatePicker";
import FavoriteSelector from "./FavoriteSelector";

type DashboardProps = {
  title: string;
};

function DashboardCard({ title }: DashboardProps) {
  return (
    <div className="converter-card">
      <h2>{title}</h2>
      <div className="date-range">
        <DatePicker title="From" disabled={false}></DatePicker>
        <DatePicker title="To" disabled={false}></DatePicker>
      </div>
      <div className="history-chart"></div>
      <FavoriteSelector></FavoriteSelector>
    </div>
  );
}

export default DashboardCard;
