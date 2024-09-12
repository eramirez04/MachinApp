import ReactECharts from "echarts-for-react";
import { useEffect, useMemo } from "react";

// eslint-disable-next-line react/prop-types
export const MantenimientoGrafico = ({ data }) => {
  const xAxisData = data.map((item) => `${item.anio}-${item.mes}`);
  /*  const seriesData = data.map((item) => item.tota_mantenimientos); */

  const types = [...new Set(data.map((tipo) => tipo.tipo_mantenimiento))];

  console.log(types);

  const seriesData = types.map((tipo_mantenimiento) => {
    return {
      name: tipo_mantenimiento,
      type: "line",
      stack: "Total",
      data: xAxisData.map((time) => {
        const foundItem = data.find(
          (item) =>
            `${item.anio}-${item.mes}` === time &&
            item.tipo_mantenimiento === tipo_mantenimiento
        );
        return foundItem ? foundItem.tota_mantenimientos : 0; // Si no hay datos, retornamos 0
      }),
    };
  });

  const option = {
    title: {
      text: "Stacked Line",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: xAxisData,
    },
    yAxis: {
      type: "value",
    },
    series: seriesData,
  };

  return (
    <>
      <div>
        <ReactECharts option={option} style={{ height: "400px" }} />;
      </div>
    </>
  );
};
