// 加载数据并排序
async function loadData() {
    let data = await d3.csv('/static/data/data.csv').then((rawdata) => {
      return rawdata.map((item) => {
        return [
          (parseFloat(item.playtime_forever) -
            parseFloat(item.playtime_at_review)) /
            60,
          parseFloat(item.playtime_last_two_weeks) / 60,
          parseFloat(item.playtime_at_review) / 60,
          item.voted_up,
          Number(item.timestamp_created),
          Number(item.last_played),
          item.review,
          parseFloat(item.emotion)
        ];
      });
    });
    data.sort((a,b)=>{
      return a[4] - b[4]
    });
    return new Promise((resolve, reject) => {
      resolve(data);
    });
  }

  // 导入数据并渲染
  function init(data) {
    const DashBoard = () => {

      const rawData = data

      return (
        <Stack>
          <Box m={1}>
            <Card>
              <PlaytimeScatter rawData={rawData} />
            </Card>
          </Box>
        </Stack>
      );
    };

    ReactDOM.render(<DashBoard />, document.getElementById("root"));
  }