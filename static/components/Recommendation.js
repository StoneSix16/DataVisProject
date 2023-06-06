const Recommendation = (props) => {
  const { rawData } = props;
  const recommendationYearlyOption = initRecommendationYearlyOption();
  const monthIndex = getMonthIndex(rawData);
  const getMonthData = (year, month) => {
    let index = month < 6 ? month + 6 : month - 6;
    let up = [0],
      down = [0];
    for (let i = monthIndex[index]; i < monthIndex[index + 1]; i++) {
      if (
        i != monthIndex[index] &&
        timestampToDate(rawData[i][4]) != timestampToDate(rawData[i - 1][4])
      ) {
        up.push(0);
        down.push(0);
      } else {
        if (rawData[i][3] == "True") up[up.length - 1]++;
        else down[down.length - 1]++;
      }
    }
    let days = up.map((value, index) => String(index + 1));
    return {
      month: month,
      voted_up: up,
      voted_down: down,
      days: days,
    };
  };
  const updateMonthData = (event) => {
    if (event) {
      if (event.componentType == "series" && event.componentSubType == "bar") {
        let m = event.dataIndex < 7 ? event.dataIndex + 6 : event.dataIndex - 6,
          y = m < 5 ? 23 : 22;
        let newMonthData = getMonthData(y, m);
        setMonthData(newMonthData);
      }
    }
  };
  const [monthData, setMonthData] = React.useState(getMonthData(22, 12));
  const recommendationMonthlyOption =
    initRecommendationMonthlyOption(monthData);

  return (
    <Stack direction="row" justifyContent={"space-between"}>
      <ReactEcharts
        option={recommendationYearlyOption}
        style={{ height: "90vh", width: "50vw" }}
        eventHandler={updateMonthData}
      />
      <ReactEcharts
        option={recommendationMonthlyOption}
        style={{ height: "90vh", width: "50vw" }}
      />
    </Stack>
  );
};

function initRecommendationYearlyOption(data = null, time = null) {
  const option = {
    backgroundColor: "#31465c",
    title: {
      text: "2022年6月到2023年5月Apex国区好评差评人数对比", //主标题文本
      left: "left", //title组件离容器左侧的距离
      textStyle: {
        color: "#fff", //字体颜色
        fontStyle: "italic", //斜体
        fontFamily: "monospace",
      },
    },
    color: ["#7cbeef", "#98512f"],
    tooltip: {
      trigger: "axis", //触发类型
      axisPointer: {
        type: "shadow", //阴影指示器
      },
    }, //指示器
    legend: {
      left: "right",
      data: ["推荐人数", "不推荐人数"],
      textStyle: { fontSize: 16, color: "#fff" },
    }, //图例
    /* toolbox: {
            show: true,
            orient:'vertical',
            feature:{
                dataZoom,
            },
        },//工具栏
        */
    grid: [{ bottom: "50%" }, { top: "50%" }], //网格
    xAxis: [
      {
        type: "category",
        axisLine: {
          show: true,
          onZero: false,
        }, //坐标轴线
        axisTick: {
          show: false,
        }, //坐标轴刻度
        axisLabel: {
          show: false,
        }, //坐标轴刻度标签
        splitArea: {
          show: false,
        }, //坐标轴在grid区域中的分割区域
        splitLine: {
          show: false,
        }, //坐标轴在grid区域中的分割线
        data: [
          "22-6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "23-1",
          "2",
          "3",
          "4",
          "5",
        ],
        position: "bottom",
        //zlevel: 0,
        //show: true,
        //min: 0,
      },
      {
        type: "category",
        show: true,
        axisLine: {
          show: true,
          onZero: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          color: "#66ccff",
          fontSize: 16,
        },
        splitArea: {
          show: false,
        },
        splitNumber: 20,
        splitLine: {
          show: false,
        },
        data: [
          "22-6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "23-1",
          "2",
          "3",
          "4",
          "5",
        ],
        gridIndex: 1,
        //position: "bottom",
        //zlevel: 10,
        //min: 0,
        //nameTextStyle: {
        //    fontSize: 16
        //},
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLine: {
          show: true,
          onZero: false,
          lineStyle: {
            color: "#fff",
          },
        },

        minInterval: 1,
        splitLine: false,
        nameTextStyle: {
          fontSize: 16,
        },
        min: 0,
      },
      {
        type: "value",
        max: 8000,
        axisLine: {
          show: true,
          onZero: false,
          lineStyle: {
            color: "#fff",
          },
        },

        minInterval: 1,
        position: "left",
        splitLine: false,
        gridIndex: 1,
        nameGap: 30,
        inverse: true,

        min: 0,
      },
    ],
    series: [
      {
        type: "bar",
        name: "推荐人数",
        barMaxWidth: 40,
        data: [
          520, 616, 770, 695, 478, 841, 7440, 7537, 6833, 6151, 4382, 3807,
        ],
      },
      {
        type: "bar",
        name: "不推荐人数",
        barMaxWidth: 40,
        data: [
          224, 273, 273, 232, 315, 330, 4770, 5069, 3919, 3227, 3145, 4160,
        ],
        xAxisIndex: 1,
        yAxisIndex: 1,
      },
    ],
  };
  return option;
}

function initRecommendationMonthlyOption(monthData) {
  const option = {
    backgroundColor: "#31465c",
    title: {
      text: `${monthData.month < 6 ? 2023 : 2022}年${
        monthData.month
      }月Apex国区好评差评人数对比`,
      left: "left", //title组件离容器左侧的距离
      textStyle: {
        color: "#fff", //字体颜色
        fontStyle: "italic", //斜体
        fontFamily: "monospace",
      },
    },
    color: ["#7cbeef", "#98512f"],
    tooltip: {
      trigger: "axis", //触发类型
      axisPointer: {
        type: "shadow", //阴影指示器
      },
    }, //指示器
    legend: {
      left: "right",
      data: ["推荐人数", "不推荐人数"],
      textStyle: { fontSize: 16, color: "#fff" },
    }, //图例
    /* toolbox: {
            show: true,
            orient:'vertical',
            feature:{
                dataZoom,
            },
        },//工具栏
        */
    grid: [{ bottom: "50%" }, { top: "50%" }], //网格
    xAxis: [
      {
        type: "category",
        axisLine: {
          show: true,
          onZero: false,
        }, //坐标轴线
        axisTick: {
          show: false,
        }, //坐标轴刻度
        axisLabel: {
          show: false,
        }, //坐标轴刻度标签
        splitArea: {
          show: false,
        }, //坐标轴在grid区域中的分割区域
        splitLine: {
          show: false,
        }, //坐标轴在grid区域中的分割线
        data: monthData.days,
        position: "bottom",
        //zlevel: 0,
        //show: true,
        //min: 0,
      },
      {
        type: "category",
        show: true,
        axisLine: {
          show: true,
          onZero: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          color: "#66ccff",
          fontSize: 16,
        },
        splitArea: {
          show: false,
        },
        splitNumber: 20,
        splitLine: {
          show: false,
        },
        data: monthData.days,
        gridIndex: 1,
        //position: "bottom",
        //zlevel: 10,
        //min: 0,
        //nameTextStyle: {
        //    fontSize: 16
        //},
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLine: {
          show: true,
          onZero: false,
          lineStyle: {
            color: "#fff",
          },
        },

        minInterval: 1,
        splitLine: false,
        nameTextStyle: {
          fontSize: 16,
        },
        min: 0,
      },
      {
        type: "value",
        axisLine: {
          show: true,
          onZero: false,
          lineStyle: {
            color: "#fff",
          },
        },

        minInterval: 1,
        position: "left",
        splitLine: false,
        gridIndex: 1,
        nameGap: 30,
        inverse: true,

        min: 0,
      },
    ],
    series: [
      {
        type: "bar",
        name: "推荐人数",
        barMaxWidth: 40,
        data: monthData.voted_up,
      },
      {
        type: "bar",
        name: "不推荐人数",
        barMaxWidth: 40,
        data: monthData.voted_down,
        xAxisIndex: 1,
        yAxisIndex: 1,
      },
    ],
  };
  return option;
}
