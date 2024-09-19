import ReactECharts from "echarts-for-react";
import { useEffect, useMemo } from "react";

// eslint-disable-next-line react/prop-types
export const MantenimientoGrafico = ({ data }) => {
  const xAxisData = useMemo(
    () => [...new Set(data.map((item) => `${item.anio}-${item.mes}`))],
    [data]
  );

  /*  const seriesData = data.map((item) => item.tota_mantenimientos); */

  const types = useMemo(
    () => [...new Set(data.map((item) => item.tipo_mantenimiento))],
    [data]
  );

  const seriesData = types.map((tipo_mantenimiento) => {
    return {
      name: tipo_mantenimiento,
      type: "line",

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
    animationDuration: 2000,
    title: {
      text: "Mantenimientos por Tipo",
    },
    tooltip: {
      trigger: "axis",
      order: "valueDesc",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: types,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: xAxisData,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
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
