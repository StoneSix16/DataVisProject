// 加载数据并排序
async function loadData() {
  let data = await d3.csv("/static/data/data.csv").then((rawdata) => {
    return rawdata.map((item) => {
      return [
        item.emotion == "-1" ? 0.5 : parseFloat(item.emotion),
        parseFloat(item.playtime_last_two_weeks) / 60,
        parseFloat(item.playtime_at_review) / 60,
        item.voted_up,
        Number(item.timestamp_created),
        Number(item.last_played),
        item.review,
        item.votes_up,
        item.votes_funny,
      ];
    });
  });
  data.sort((a, b) => {
    return a[4] - b[4];
  });
  let relations = await d3.json("/static/data/relations.json", (graph) => {
    graph.nodes.forEach((node) => {
      node.label = {
        show: node.symbolSize > 50,
      };
    });
    return graph;
  });

  let frequency = await axios.get("/getwordcnt").then((res) => {
    return res.data.map((item) => {
      return { name: item[0], value: item[1] };
    });
  });
  return new Promise((resolve, reject) => {
    resolve({ data, relations, frequency });
  });
}

// 导入数据并渲染
function init(args) {
  const DashBoard = () => {
    const rawData = args.data,
      relations = args.relations,
      frequency = args.frequency;
    return (
      <Stack>
        <Box m={1}>
          <Card>
            <Recommendation rawData={rawData} />
          </Card>
        </Box>
        <Box m={1}>
          <Card>
            <Words relations={relations} frequency={frequency} />
          </Card>
        </Box>
        <Box m={1}>
          <Card>
            <Playtime rawData={rawData} />
          </Card>
        </Box>
      </Stack>
    );
  };

  ReactDOM.render(<DashBoard />, document.getElementById("root"));
}
