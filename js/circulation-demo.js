Highcharts.getJSON('./js/circulation-demo.json', function (data) {
  // create the chart
  Highcharts.stockChart('circulationChart', {
    chart: {
      alignTicks: false,
    },

    rangeSelector: {
      selected: 0, // 預設選擇第幾個range
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
    scrollbar: {
      enabled: false,
    },

    title: {
      text: '點數發行數量',
    },
    navigator: {
      enabled: false,
    },
    // 右下英文字
    credits: {
      enabled: false,
    },

    series: [
      {
        showInNavigator: false,
        id: 'base2',
        type: 'column',
        name: '日發行量',
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
      {
        type: 'linearRegression',
        name: '線性迴歸預測',
        linkedTo: 'base2',
        color: 'rgb(106, 216, 22)',
        dashStyle: 'Dash',
        zIndex: -1,
        params: {
          period: 10,
        },
      },
    ],
  });
});
