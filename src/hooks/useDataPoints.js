import { useState, useEffect } from "react";
const key = "tracker";
const initialize = () => localStorage.setItem(key, "[]");
const getDataPoints = () => JSON.parse(localStorage.getItem(key));
const addDataPoint = (data) =>
  localStorage.setItem(key, JSON.stringify(getDataPoints().concat(data)));
const saveDataPoints = (data) =>
  localStorage.setItem(key, JSON.stringify(data));

export const useDataPoints = () => {
  const [state, setState] = useState(getDataPoints() || []);

  useEffect(() => {
    if (!state) initialize();
  }, [state]);

  return {
    editDataPoint: (timestamp, newNote) => {
      const edited = state.map((dataPoint) =>
        dataPoint.timestamp === timestamp
          ? { ...dataPoint, note: newNote }
          : dataPoint
      );

      saveDataPoints(edited);
      setState(edited);
    },
    removeDataPoint: (timestamp) => {
      const edited = state.filter((i) => i.timestamp !== timestamp);

      setState(edited);
      saveDataPoints(edited);
    },
    dataPointsByDate: state.reduce((grouped, dataPoint) => {
      const date = new Date(dataPoint.timestamp);
      const key = [date.getFullYear(), date.getMonth() + 1, date.getDate()]
        .map((i) => String(i).padStart(2, "0"))
        .join("-");

      return {
        ...grouped,
        [key]: grouped[key] ? [...grouped[key], dataPoint] : [dataPoint],
      };
    }, {}),

    addDataPoint: (data) => {
      addDataPoint(data);
      setState(getDataPoints());
    },
  };
};
