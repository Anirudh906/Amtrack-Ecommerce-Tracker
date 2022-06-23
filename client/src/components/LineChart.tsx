import React, {Fragment} from 'react';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables, ScriptableContext } from 'chart.js';
import { Chart } from 'react-chartjs-2'
import moment from 'moment';
ChartJS.register(...registerables);

function LineChart({ productDetail }) {
  
  const chartData = () => {
    return {
    labels: productDetail[0].date.map(date => moment(date).format('DD/MM/YY')),
    datasets: [
      {
        label: "Price on Amazon (₹)",
        fill:'start',
        backgroundColor : (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 450);
          gradient.addColorStop(0, "#89d6f1");
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
          return gradient;
        }, 
        borderColor : "#89d6f9",
        borderWidth: 2,
        pointColor : "#fff",
        pointStrokeColor : "#89d6f1",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "#89d6f1",
        data: productDetail[0].prices.map(price => parseInt(price)),

      },
    ],
  }
};

  return (
    <Fragment>
      <Line data={chartData()} />
    </Fragment>
  );
};

export default LineChart;