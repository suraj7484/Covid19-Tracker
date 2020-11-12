import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};


const LineGraph = ({ country, casesType, ...props }) => {
  const [data, setData] = useState({});
  const backcolor = `${casesType === "active" ? "#a73a3ad6" : casesType ==="recovered" ? "#79c253d6" : casesType ==="deaths"  ? "#ebebebd6" : casesType ==="cases" ? "#ff008d" : "" } `
  const color = `${casesType === "active" ? "red" : casesType ==="recovered" ? "green" : casesType ==="deaths"  ? "grey" : casesType ==="cases" ? "#ce639ec7" : "" } `
  // const [count, setCount] = useState()

  // https://disease.sh/v3/covid-19/historical/IN?lastdays=150

  useEffect(() => {
    // setCount(country)
    let fetchData;
    if (country === 'worldwide'){
      fetchData = async () => {
        await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=150')
          .then(res => res.json())
          .then(data => {
            // console.log(data)
            const chartData = buildChartData(data, casesType)
            setData(chartData)
          })
      }
    }else {
      fetchData = async () => {
        await fetch(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=150`)
          .then(res => res.json())
          .then(data => {
            // console.log(data)
            const chartData = buildChartData(data.timeline, casesType)
            console.log(country)
            // console.log(count)
            setData(chartData)
          })
      }
    }
    
    fetchData();

  }, [casesType , country])

  const buildChartData = (data, casesType = "active") => {
    const chartData = [];
    let lastDataPoint;

    if (casesType !== 'active') {
      for (let date in data.cases) {
        if (lastDataPoint) {
          const newDataPoint = {
            x: date,
            y: data[casesType][date] - lastDataPoint
          }
          chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
      }
    }

    else {
      for (let date in data.cases) {
        const newDataPoint = {
          x: date,
          y: data['cases'][date] - (data['recovered'][date] + data['deaths'][date])
        }
        chartData.push(newDataPoint);
      }
    }
    return chartData
  }


  return (
    <div className={props.className}>
      {data?.length > 0 && (
        <Line
          options={options}
          data={{
            datasets: [{
              data: data,
              backgroundColor: backcolor,
              borderColor: color
            }]
          }}
        />
      )}
    </div>
  )
}

export default LineGraph
