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
      units: [['month', [1]]],
    },
  },
  {
    type: 'all',
    text: '全部',
    dataGrouping: {
      forced: true,
      units: [['year']],
    },
  },
];

function pointFormat(width, height, point) {
  var chart = this.chart,
    position;

  if (point.isHeader) {
    position = {
      x: Math.max(
        // Left side limit
        0,
        Math.min(
          point.plotX + chart.plotLeft - width / 2,
          // Right side limit
          chart.chartWidth - width - chart.marginRight
        )
      ),
      y: point.plotY,
    };
  } else {
    position = {
      x: point.series.chart.plotLeft,
      y: point.series.yAxis.top - chart.plotTop,
    };
  }

  return position;
}

// 取特定數字區間內的亂數
function getRandom(min, max) {
  return Number(
    (Math.random() * (max - min + 1) + min + Math.random()).toFixed(2)
  );
}

let dateStart = new Date('2020-05-01 12:00:00').getTime(); // 86400000
// 實際線 dataset
const numberArr = [];
for (let index = 0; index < 365; index++) {
  numberArr.push(getRandom(26, 35));
}
const dataset = [];

//樂觀預測線 regressionDataset
const regressionNumberArr = [];
for (let index = 0; index < 730; index++) {
  regressionNumberArr.push(getRandom(27, 38));
  regressionNumberArr.sort(function (a, b) {
    return a - b;
  });
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

const option = {
  chart: {
    type: 'line',
  },
  rangeSelector: {
    selected: 2,
    buttons: buttonsConfig,
    buttonTheme: {
      width: 30,
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
    pointFormat: '{series.name}: <b>{point.y:.2f}</b>',
    // formatter: pointFormat,
    shared: true,
    labels: {
      format: '{value:%Y-%m-%d}',
    },
  },
  xAxis: {
    type: 'datetime',
    labels: {
      format: '{value:%Y-%m-%d}',
    },
    min: new Date('2021-05-01 12:00:00').getTime(),
    max: new Date('2021-08-01 12:00:00').getTime(),
  },
  yAxis: {
    title: {
      text: '匯率',
    },
    min: 26,
    max: 40,
  },

  series: [
    // 數據1
    {
      showInNavigator: false,
      name: '當日匯率',
      data: dataset,
      // dataLabels: {
      //   enabled: true,
      // },
      marker: {
        enabled: true,
        radius: 3,
      },
      shadow: true,
      tooltip: {
        valueDecimals: 2,
      },
      id: 'base',
    },
    // 原生預測線性回歸
    // {
    //   type: 'linearRegression',
    //   name: '預測值',
    //   linkedTo: 'base',
    //   color: 'rgba(106, 216, 220,.3)',
    //   dashStyle: 'Dash',
    //   zIndex: -1,
    //   params: {
    //     period: 60,
    //   },
    // },
    // 數據2
    {
      showInNavigator: false,
      name: '預估 1點 兌 美金',
      data: dataset,
      marker: {
        enabled: true,
        radius: 3,
      },
      shadow: true,
      tooltip: {
        valueDecimals: 2,
      },
    },
    {
      showInNavigator: false,
      name: '預測值',
      data: regressionDataset,
      marker: {
        enabled: true,
        radius: 3,
      },
      color: 'rgba(106, 216, 22,.5)',
      dashStyle: 'Dash',
      zIndex: -1,
      shadow: false,
      tooltip: {
        valueDecimals: 2,
      },
    },
  ],
};

// Create the chart
Highcharts.stockChart('rateChart', option);

// Highcharts.getJSON('./js/rate-demo.json', success);
// Highcharts.getJSON('./js/rate-demo2.json', success);
