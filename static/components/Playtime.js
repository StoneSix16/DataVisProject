const DateSlider = (props) => {
  const { startTimestamp, endTimestamp, updateData } = props;
  const [timestamp, setTimestamp] = React.useState([
    startTimestamp,
    endTimestamp,
  ]);
  const labelRef = React.useRef(null);
  const handleChange = (event, newTimestamp) => {
    setTimestamp(newTimestamp);
    if (labelRef.current) {
      labelRef.current.innerText = `日期范围: ${timestampToDate(
        newTimestamp[0]
      )} ~ ${timestampToDate(newTimestamp[1])}`;
    }
    updateData(newTimestamp);
  };

  return (
    <div style={{ width: "40vw" }} className="slider-box">
      <Typography ref={labelRef} id="date-slider" gutterBottom>
        日期范围: {timestampToDate(startTimestamp)} ~{" "}
        {timestampToDate(endTimestamp)}
      </Typography>
      <Slider
        value={timestamp}
        min={startTimestamp}
        max={endTimestamp}
        onChange={handleChange}
        valueLabelDisplay="off"
        aria-labelledby="date-slider"
      />
    </div>
  );
};

const ReviewInfo = (props) => {
  const { info } = props;
  const showReview = (item) => {
    return item ? item[6] : null;
  };
  if (info) {
    return (
      <CardContent>
        <Typography component="p">{info[6]}</Typography>
        <Typography component="p">{`${info[3]}`}</Typography>
        <Typography component="p">{`玩家情绪指数${info[0]}`}</Typography>
        <Typography component="p">{`有${info[7]}玩家认为有价值,有${info[8]}玩家认为好玩`}</Typography>
      </CardContent>
    );
  } else return null;
};

const Playtime = (props) => {
  const { rawData } = props;
  const [data, setData] = React.useState(rawData);
  const [info, setInfo] = React.useState(null);
  const PlaytimeOption = initPlaytimeOption(data);

  let startTimestamp = 1653840000,
    endTimestamp = 1685376000,
    startIndex = 0,
    endIndex = rawData.length - 1;

  const updateData = (newTimestamp) => {
    (startTimestamp = newTimestamp[0]), (endTimestamp = newTimestamp[1]);
    while (
      rawData[startIndex][4] < startTimestamp &&
      startIndex != rawData.length
    )
      startIndex++;
    while (rawData[startIndex][4] <= startTimestamp && startIndex != 0)
      startIndex--;
    while (rawData[endIndex][4] > endTimestamp && endIndex != 0) endIndex--;
    while (rawData[endIndex][4] <= endTimestamp && endIndex != rawData.length)
      endIndex++;

    let newdata = rawData.slice(startIndex, endIndex);
    setData(newdata);
  };

  const updateInfo = (event) => {
    if (event) {
      if (
        event.componentType == "series" &&
        event.componentSubType == "scatter3D"
      ) {
        setInfo(event.data);
      }
    }
  };
  return (
    <Stack direction="row">
      <Box width="45vw">
        <Card>
          <ReactEcharts
            option={PlaytimeOption}
            style={{ height: "90vh", width: "40vw" }}
            eventHandler={updateInfo}
          />
          <DateSlider
            startTimestamp={startTimestamp}
            endTimestamp={endTimestamp}
            updateData={updateData}
          />
        </Card>
      </Box>
      <Box width="45vw" mx="auto" my="auto">
        <Card>
          <ReviewInfo info={info} />
        </Card>
      </Box>
    </Stack>
  );
};

function initPlaytimeOption(data) {
  const xAxis3D = {
      name: "评论情绪",
      type: "value",
      min: 0,
      max: 1,
      scale: true,
    },
    yAxis3D = {
      name: "两周内游玩时长",
      type: "value",
      max: 150,
      scale: true,
    },
    zAxis3D = {
      name: "评论时游玩时长",
      type: "value",
      max: 2000,
      scale: true,
    },
    grid3D = {
      viewControl: {
        // 摄像机视角
        alpha: 45,
        beta: 30,
      },
    };

  const option = {
    title: {
      text: "test",
    },
    series: [
      {
        type: "scatter3D",
        data: data,
        symbolSize: 6,
      },
    ],
    xAxis3D: xAxis3D,
    yAxis3D: yAxis3D,
    zAxis3D: zAxis3D,
    grid3D: grid3D,
    visualMap: [
      {
        type: "piecewise",
        seriesIndex: 0,
        dimension: 3,
        categories: ["True", "False"],
        pieces: [
          { value: "True", label: "推荐", color: "#60B6E7", opacity: [0.8] },
          { value: "False", label: "不推荐", color: "#E06363", opacity: [0.8] },
        ],
      },
    ],
  };

  return option;
}
