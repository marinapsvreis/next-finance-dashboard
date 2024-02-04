import Highcharts from "highcharts";
import { useEffect } from "react";
import styled from "styled-components";

const GraphCard = styled.div`
  height: 440px;
  width: 749px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
`;

interface ChartDataItem {
  name: string;
  withdraw: number;
  deposit: number;
}

interface LineGraphicProps {
  title: string;
  chartData: ChartDataItem[];
}

export default function LineGraphic({ title, chartData }: LineGraphicProps) {
  useEffect(() => {
    const options: Highcharts.Options = {
      chart: {
        type: "line",
      },
      title: {
        text: title,
      },
      xAxis: {
        categories: chartData.map((item) => item.name),
      },
      yAxis: {
        title: {
          text: "Amount",
        },
      },
      series: [
        {
          type: "line",
          name: "Withdraw",
          data: chartData.map((item) => item.withdraw),
          color: "#B9D3FF",
        },
        {
          type: "line",
          name: "Deposit",
          data: chartData.map((item) => item.deposit),
          color: "#007DFF",
        },
      ],
    };

    Highcharts.chart("chart-container2", options);
  }, [chartData, title]);

  return (
    <GraphCard>
      <div id="chart-container2"></div>
    </GraphCard>
  );
}
