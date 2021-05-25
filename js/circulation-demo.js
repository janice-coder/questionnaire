// Highcharts.getJSON('./js/circulation-demo.json', function (data) {
//   // create the chart
// });
function getRandom(min, max) {
  return Number(
    Math.floor(Math.random() * (max - min + 1) + min + Math.random())
  );
}

let dateStart = new Date('2020-05-01 12:00:00').getTime(); // 86400000
// 實際線 dataset
const numberArr = [];
for (let index = 0; index < 365; index++) {
  numberArr.push(getRandom(85000, 500000));
}
const dataset = [];

//樂觀預測線 regressionDataset
const regressionNumberArr = [];
for (let index = 0; index < 730; index++) {
  regressionNumberArr.push(getRandom(80000, 600000));
  regressionNumberArr.sort(function (a, b) {
    return a - b;
  });
  // console.log(regressionNumberArr);
}
const regressionDataset = [];
for (let i = 0; i < 730; i++) {
  dateStart = dateStart + 86400000;
  if (dateStart < new Date('2021-06-01 12:00:00').getTime()) {
    dataset.push([dateStart, numberArr[i]]);
  }
  regressionDataset.push([dateStart, regressionNumberArr[i]]);
  // console.log(regressionDataset);
}
const bottonSettings = [
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
const option = {
  chart: {
    alignTicks: false,
  },
  rangeSelector: {
    selected: 2, // 預設選擇第幾個range
    buttons: bottonSettings,
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
  xAxis: {
    type: 'datetime',
    labels: {
      format: '{value:%Y-%m-%d}',
    },
    min: new Date('2021-05-01 12:00:00').getTime(),
    max: new Date('2021-08-01 12:00:00').getTime(),
  },

  series: [
    {
      showInNavigator: false,
      id: 'base2',
      type: 'column',
      name: '日發行量',
      data: dataset,
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
      showInNavigator: false,
      type: 'column',
      name: '預測線',
      data: regressionDataset,
      color: 'rgba(106, 216, 22,.8)',
      // dashStyle: 'Dash',
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
    // {
    //   type: 'linearRegression',
    //   name: '線性迴歸預測',
    //   linkedTo: 'base2',
    //   color: 'rgb(106, 216, 22)',
    //   dashStyle: 'Dash',
    //   zIndex: -1,
    //   params: {
    //     period: 10,
    //   },
    // },
  ],
};
Highcharts.stockChart('circulationChart', option);
