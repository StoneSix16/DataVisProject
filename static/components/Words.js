const Words = (props) => {
  const { relations, frequency, maskImg } = props;
  let wordsRelationsOption = initWordsRelationsOption(relations);
  let wordsFrequencyOption = initWordsFrequencyOption(frequency, maskImg);
  return (
    <Stack direction="row" justifyContent={"space-between"}>
      <ReactEcharts
        option={wordsRelationsOption}
        style={{ height: "90vh", width: "50vw", color: "#ffffff" }}
      />
      <ReactEcharts
        option={wordsFrequencyOption}
        style={{ height: "90vh", width: "50vw" }}
      />
    </Stack>
  );
};

function initWordsRelationsOption(relations) {
  relations.nodes = relations.nodes.map((item) => {
    item.category = parseInt(Math.log10(item.value)) - 3;
    item.symbolSize = 10 + (40 / 10000) * (item.value / 1000);
    return item;
  });
  const option = {
    title: {
      text: "Apex评论高频词关联图",
      top: 20,
      left: 20,
    },
    tooltip: {
      show: true,
      trigger: "item",
    },
    legend: [],
    animationDuration: 1500,
    animationEasingUpdate: "quinticInOut",
    series: [
      {
        type: "graph",
        layout: "circular",
        data: relations.nodes,
        links: relations.links,
        categories: relations.categories,
        roam: true,
        tooltip: {
          formatter: '"{b}"与其他高频词在同一评论中出现了{c}次',
        },
        label: {
          show: true,
          position: "bottom",
          color: "inherit",
          formatter: "{b}",
          fontSize: 14,
        },
        lineStyle: {
          color: "source",
          curveness: 0.3,
        },
        emphasis: {
          focus: "adjacency",
          lineStyle: {
            width: 10,
            opacity: 0.8,
          },
        },
        blur: {
          lineStyle: {
            opacity: 0,
          },
          itemStyle: {
            opacity: 0.05,
          },
        },
      },
    ],
  };
  return option;
}

function initWordsFrequencyOption(frequency, maskImg = null) {
  const option = {
    title: {
      text: "Apex评论高频词词云",
      top: 20,
      left: 20,
    },
    series: [
      {
        name: "Apex",
        type: "wordCloud",
        shape: "circle",
        data: frequency,
        maskImage: maskImg && maskImg.complete ? maskImg : null,
        left: "center",
        top: "center",
        width: "100%",
        height: "100%",
        rotationRange: [-90, 90],
        rotationStep: 90,
        gridSize: 4,
        sizeRange: [40, 135],
        textStyle: {
          fontWeight: "bold",
          // 配色函数制定配色机制： Math.round() 和 Math.random() 随机给词配色
          color: function () {
            return `rgb(${Math.round(Math.random() * 75) + 15},${
              Math.round(Math.random() * 50) + 95
            },${Math.round(Math.random() * 180) + 50})`;
          },
        },
        emphasis: {
          textStyle: {
            color: "#ffac29",
          },
        },
      },
    ],
  };
  return option;
}
