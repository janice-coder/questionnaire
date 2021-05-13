const buttonsConfig = [
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
];
// let seriesOptions = [],
//   seriesCounter = 0,
//   names = ['rate-demo', 'rate-demo2'];
// function createChart() {
//   Highcharts.stockChart('rateChart', {
//     rangeSelector: {
//       selected: 4,
//     },

//     yAxis: {
//       labels: {
//         formatter: function () {
//           return (this.value > 0 ? ' + ' : '') + this.value + '%';
//         },
//       },
//       plotLines: [
//         {
//           value: 0,
//           width: 2,
//           color: 'silver',
//         },
//       ],
//     },

//     plotOptions: {
//       series: {
//         compare: 'percent',
//         showInNavigator: true,
//       },
//     },

//     tooltip: {
//       pointFormat:
//         '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
//       valueDecimals: 2,
//       split: true,
//     },

//     series: seriesOptions,
//   });
// }
// function success(data) {
//   let name = this.url.match(/(rate-demo|rate-demo2)/)[0].toUpperCase();
//   console.log(name);
//   let i = names.indexOf(name);
//   seriesOptions[i] = {
//     name: name,
//     data: data,
//   };
//   console.log(seriesOptions[i]);

//   // As we're loading the data asynchronously, we don't know what order it
//   // will arrive. So we keep a counter and create the chart when all the data is loaded.
//   console.log(names.length);
//   seriesCounter += 1;

//   if (seriesCounter === names.length) {
//     createChart();
//   }
// }
function pointFormat() {
  console.log(this.y);
  return 'The value for <b>' + this.x + '</b> is <b>' + this.y;
}

function success(data) {
  // Create the chart
  Highcharts.stockChart('rateChart', {
    rangeSelector: {
      selected: 0,
      buttons: buttonsConfig,
      buttonTheme: {
        width: 60,
      },
    },

    title: {
      text: '點數兌現匯率走勢',
    },
    navigator: {
      enabled: false,
    },
    // 右下英文字
    credits: {
      enabled: false,
      text: 'Questionnaire',
    },
    scrollbar: {
      enabled: false,
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y:.2f}</b><br/>',
      // formatter: pointFormat,
      shared: true,
    },
    xAxis: {
      type: 'datetime',
      labels: {
        format: '{value:%Y-%m-%d}',
      },
    },

    series: [
      // 數據1
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
      // 數據2
      {
        showInNavigator: false,
        name: '預估 1點 兌 美金',
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
}
Highcharts.getJSON('./js/rate-demo.json', success);
Highcharts.getJSON('./js/rate-demo2.json', success);
