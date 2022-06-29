import { fetchCoinHistory } from "../api";
import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";
import { ReactComponent as LoadingIcon } from "../assets/Loading.svg";
interface ChartProps {
  coinId: string;
}
interface IHistoryCal {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function ChartTab({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistoryCal[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId));
  return (
    <div>
      {isLoading ? (
        <LoadingIcon fill='transparent' />
      ) : (
        <ApexChart
          type='line'
          series={[
            {
              name: coinId,
              data: data?.map(price => price.close) as number[],
            },
          ]}
          options={{
            // theme: {
            //   mode: "dark",
            // },
            stroke: {
              curve: "smooth",
            },
            yaxis: {
              show: false,
            },
            tooltip: {
              theme: "light",
              x: {
                show: false,
              },
              y: {
                formatter: value => `$${value.toFixed(0)}`,
              },
            },
            markers: {
              // colors: ["#F44336", "#E91E63", "#9C27B0"],
            },
            fill: {
              type: "gradient",
              gradient: {
                gradientToColors: ["#2ecc71"],
                // stops: [0, 100],
              },
              colors: ["blue"],
            },
            xaxis: {
              type: "datetime",
              categories: data?.map(price => price.time_close),
              labels: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              axisTicks: { show: false },
            },
            grid: {
              show: false,
              row: {
                // colors: ["#F44336", "#E91E63", "#9C27B0"],
              },
              column: {
                // colors: ["#F44336", "#E91E63", "#9C27B0"],
              },
            },
            dataLabels: {
              enabled: false,
            },
            chart: {
              background: "transparent",
              height: 500,
              width: 600,
              toolbar: {
                // show: false,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default ChartTab;
