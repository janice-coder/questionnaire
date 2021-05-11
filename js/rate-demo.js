Highcharts.getJSON('./js/rate-demo.json', function (data) {
  // Create the chart
  Highcharts.stockChart('rateChart', {
    rangeSelector: {
      selected: 0,
    },

    title: {
      text: '兌現匯率走勢',
    },

    series: [
      {
        name: '當日匯率',
        data: data,
        marker: {
          enabled: true,
          radius: 3,
        },
        shadow: true,
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],
  });
});
