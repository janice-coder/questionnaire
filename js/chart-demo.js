Highcharts.getJSON('./js/demo.json', function (data) {
  // create the chart
  Highcharts.stockChart('container', {
    chart: {
      alignTicks: false,
    },

    rangeSelector: {
      selected: 0, // 預設選擇第幾個range
    },

    title: {
      text: '發行數量',
    },

    series: [
      {
        type: 'column',
        name: '發行數量',
        data: data,
        dataGrouping: {
          units: [
            [
              'day', // unit name
              [1], // allowed multiples
            ],
            ['month', [1, 2, 3, 4, 6]],
          ],
        },
      },
    ],
  });
});
