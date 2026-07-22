import { LineChart } from '@mui/x-charts/LineChart';
import { NewExchangeContext } from '../../context/ExchangeContext';
import { useContext, useEffect, useState } from 'react';
import { getHistoricalRate } from '../../api/historicalRateApi';
import type { HistoricalRate } from '../../api/historicalRateApi';

type DashboardData = {
    values: number[];
    dates: string[];
};

function Dashboard() {
    const [dashboardData, setDashboardData] = useState<DashboardData>({
        values: [],
        dates: [],
    });

    const exchangeContext = useContext(NewExchangeContext);

    useEffect(() => {
        setChartData();
    }, [
        exchangeContext?.exchange.dashboard.dateFrom,
        exchangeContext?.exchange.dashboard.dateTo
    ]);

    async function setChartData() {
        if (!exchangeContext) return;
        const { dashboard, converter } = exchangeContext.exchange;
        const historicalRates = await getHistoricalRate();

        if (
            !dashboard.dateFrom ||
            !dashboard.dateTo ||
            !historicalRates ||
            !converter.initialValue ||
            converter.initialValue.length == 0
        ) return;

        const filtered = historicalRates.filter((rate) => {
            return (
                rate.date >= dashboard.dateFrom &&
                rate.date <= dashboard.dateTo
            );
        });
        const chartData = takeSevenPoints(filtered);
        const values = calculateValues(chartData, Number(converter.initialValue));

        const dates = chartData.map(rate => rate.date);
        setDashboardData({
            values,
            dates,
        });
    }

    function calculateValues(
        data: HistoricalRate[],
        amount: number
    ): number[] {
        return data.map(rate =>
            Number((amount * rate.rates.EUR).toFixed(2))
        );
    }

    function takeSevenPoints(data: HistoricalRate[]): HistoricalRate[] {
        if (data.length <= 7) return data;

        const result: HistoricalRate[] = [];
        const step = (data.length - 1) / 6;
        for (let i = 0; i < 7; i++) {
            result.push(data[Math.round(i * step)]);
        }
        return result;
    }

    return (
        <LineChart
            xAxis={[
                {
                    scaleType: "point",
                    data: dashboardData.dates,
                },
            ]}
            series={[
                {
                    data: dashboardData.values,
                    label: `${exchangeContext?.exchange.converter.sourceCurrency} → ${exchangeContext?.exchange.converter.targetCurrency}`,
                    showMark: false,
                },
            ]}
            height={280}
        />
    );
}

export default Dashboard;