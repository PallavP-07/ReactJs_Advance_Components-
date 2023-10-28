import React from "react";
import Chart from 'react-apexcharts';


const CartForLeague = ({ sizeData, countryDetails, graphColor }) => {
  const options = {
    chart: {
      id: 'apexchart-example',
      foreColor: '#000000',
      offsetY: 10,
    },
    xaxis: {
      categories: countryDetails,
      labels: {
        show: false
      }
    },
    yaxis: {
      show: true
    },
    plotOptions: {
      bar: {
        distributed: true,
        horizontal: false,
        dataLabels: {
          enabled: true,
          position: 'top',
          hideOverflowingLabels: true,
        },
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val ;
      },
      offsetY: -25,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
    colors: graphColor

  }
  const series = [{
    name: 'Status',
    data: sizeData
  }]


  return (
    <div className=" col-11">
      <Chart options={options} series={series} type="bar" />
    </div>
  )
}

export default CartForLeague;