import "./ConverterCard.css";
import "./DashboardCard.css";
import DatePicker from "./DatePicker";
import DashboardChart from "../dashboard/DashboardChart";

type DashboardProps = {
  title: string;
};

function DashboardCard({ title }: DashboardProps) {

  return (
    <div className="converter-card">
      <h2>{title}</h2>
      <div className="date-range">
        <DatePicker title="From" disabled={false} id="dateFrom"></DatePicker>
        <DatePicker title="To" disabled={false} id="dateTo"></DatePicker>
      </div>
      <div className="history-chart">
        <DashboardChart></DashboardChart>
      </div>
    </div>
  );
}

export default DashboardCard;
