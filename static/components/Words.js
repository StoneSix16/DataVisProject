const Words = (props) => {
  // console.log(props)
  const { relations, frequency } = props;
  const wordsRelationsOption = initWordsRelationsOption(relations);
  const wordsFrequencyOption = initWordsFrequencyOption(frequency);

  return (
    <Stack direction="row" justifyContent={'space-between'} >
      <ReactEcharts
        option={wordsRelationsOption}
        style={{ height: "90vh", width: "50vw", color:'#ffffff'}}
      />
      <ReactEcharts
        option={wordsFrequencyOption}
        style={{ height: "90vh", width: "50vw" }}
      />
    </Stack>
  );
};

function initWordsRelationsOption(relations) {
  const option = {
    title: {
      text: "Apex",
      subtext: "Circular layout",
      top: "bottom",
      left: "right",
    },
    tooltip: {},
    legend: [
      {
        data: relations.categories.map(function (a) {
          return a.name;
        }),
      },
    ],
    animationDuration: 1500,
    animationEasingUpdate: "quinticInOut",
    series: [
      {
        name: "Apex",
        type: "graph",
        layout: "circular",
        data: relations.nodes,
        links: relations.links,
        categories: relations.categories,
        roam: true,
        label: {
          position: "right",
          formatter: "{b}",
        },
        lineStyle: {
          color: "source",
          curveness: 0.3,
        },
        emphasis: {
          focus: "adjacency",
          lineStyle: {
            width: 10,
          },
        },
      },
    ],
  };
  return option;
}

function initWordsFrequencyOption(frequency) {
    const option = {
      title: {
        text: "Apex",
        top: "bottom",
        left: "right",
      },
      series: [
        {
          name: "Apex",
          type: "wordCloud",
          // shape: 'star',
          data: frequency,
          left: 'center',
          top: 'center',
          width: '100%',
          height: '100%',
          rotationRange: [-90, 90],
          rotationStep: 90,
          gridSize: 2,
          sizeRange: [25, 120],
          // label: {
          //   position: "right",
          //   formatter: "{b}",
          // },
          emphasis: {
            focus: "adjacency",
            lineStyle: {
              width: 10,
            },
          },
        },
      ],
    };
    return option;
  }
  
