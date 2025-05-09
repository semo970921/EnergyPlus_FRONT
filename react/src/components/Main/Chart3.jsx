import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import axios from "axios";

// chart.js 기본 설정
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const Chart3 = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost/apis/carbon")
      .then((response) => {
        const data = response.data;
        const dateMap = {};

        data.forEach((item) => {
          const date = new Date(item.timestamp).toLocaleDateString();
          if (!dateMap[date]) {
            dateMap[date] = 0;
          }
          dateMap[date] += item.coppm;
        });

        const labels = Object.keys(dateMap);
        const coppmValues = Object.values(dateMap);

        setChartData({
          labels,
          datasets: [
            {
              label: "Coppm (날짜별 합산)",
              data: coppmValues,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: true,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("데이터를 가져오는 데 실패했습니다: ", error);
      });
  }, []);

  if (!chartData) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <h2>날짜별 차트</h2>
      <Line data={chartData} />
    </div>
  );
};

export default Chart3;
