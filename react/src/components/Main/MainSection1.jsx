import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const EnergyChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchAllPages = async () => {
      const allData = [];

      for (let page = 1; page <= 10; page++) {
        try {
          const res = await axios.get(
            `http://localhost/apis/energyUsage1?pageNo=${page}`,
            {
              params: { pageNo: page },
            }
          );
          const items = res.data.opentable?.field || [];
          allData.push(...items);
        } catch (error) {
          console.error(`page ${page} 불러오기 실패`, error);
        }
      }

      const grouped = {};
      allData.forEach((item) => {
        const energy = item.ENGSRC_NM;
        const value = parseFloat(item.USEMS_QNTY);
        if (!grouped[energy]) grouped[energy] = 0;
        grouped[energy] += value;
      });

      const labels = Object.keys(grouped);
      const values = labels.map((k) => grouped[k]);

      setChartData({
        labels,
        datasets: [
          {
            label: "에너지원별 사용량 (tCO2eq.)",
            data: values,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      });
    };

    fetchAllPages();
  }, []);

  if (!chartData) return <div>로딩 중...</div>;

  return <Bar data={chartData} />;
};

export default EnergyChart;
