import React from "react";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default function PieChart({ pieChartData }) {
  const cities = [...new Set(pieChartData.map((i) => i.address.city))];
  const people = [
    cities.map((i) => ({
      city: i,
      citizens: pieChartData.filter((j) => j.address.city === i),
    })),
  ];
  const citizens = people.map((i) => i.map((j) => j.citizens.length));

  const pieData = {
    series: citizens[0],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: cities,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

  return (
    <Wrapper>
      <ReactApexChart
        options={pieData.options}
        series={pieData.series}
        type="pie"
        width={380}
      />
    </Wrapper>
  );
}
