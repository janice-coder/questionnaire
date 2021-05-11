Highcharts.getJSON('./js/rate-demo.json', function (data) {
  // Create the chart
  Highcharts.stockChart('rateChart', {
    rangeSelector: {
      selected: 0,
      buttons: [
        {
          type: 'month',
          count: 1,
          text: '30日',
          dataGrouping: {
            forced: true,
            units: [['day', [1]]],
          },
        },
        {
          type: 'month',
          count: 3,
          text: '3個月',
          dataGrouping: {
            forced: true,
            units: [['week', [1]]],
          },
        },
        {
          type: 'month',
          count: 6,
          text: '6個月',
          dataGrouping: {
            forced: true,
            units: [['week', [1]]],
          },
        },
        {
          type: 'year',
          count: 1,
          text: '1年',
          dataGrouping: {
            forced: true,
            units: [['week', [1]]],
          },
        },
        {
          type: 'all',
          text: '全部',
          dataGrouping: {
            forced: true,
            units: [['month', [1]]],
          },
        },
      ],
      buttonTheme: {
        width: 60,
      },
    },

    title: {
      text: '點數兌現匯率走勢',
    },
    navigator: {
      height: 0,
    },

    series: [
      {
        showInNavigator: false,
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
