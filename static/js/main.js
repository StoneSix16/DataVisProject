async function loadData() {
    let data = await d3.csv("./data.csv").then((rawdata) => {
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
        ];
      });
    });
    data.sort((a,b)=>{
      return a[4] - b[4]
    });
    console.log(data)
    return new Promise((resolve, reject) => {
      resolve(data);
    });
  }

  function init(data) {
    const DashBoard = () => {

      const rawData = data
      const [maxChartValue, setMaxChartValue] = React.useState(300);

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