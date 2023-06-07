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
    <div className="slider-box">
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
  if (info) {
    let colorRecommendation = info[3] == "True" ? "#60B6E7" : "#E06363";
    let textRecommendataion = info[3] == "True" ? "推荐" : "不推荐";
    let colorJudgement, textJudgement, textTip;
    if (info[3] == "True") {
      if (info[0] <= 0.45) {
        colorJudgement = "#9d2dff";
        textJudgement = "混乱友善";
        textTip = "我推荐这款游戏和我指责它当然并不冲突";
      } else if (info[0] >= 0.6) {
        colorJudgement = "#2ac1ff";
        textJudgement = "绝对友善";
        textTip = "至少电脑觉得你没有反讽";
      } else {
        colorJudgement = "#0036ff";
        textJudgement = "中立友善";
        textTip = "你有点太不极端了";
      }
    } else {
      if (info[0] <= 0.45) {
        colorJudgement = "#ff0f00";
        textJudgement = "绝对敌对";
        textTip = "也许设置一些屏蔽词会更好";
      } else if (info[0] >= 0.6) {
        colorJudgement = "#ffc849";
        textJudgement = "混乱敌对";
        textTip = "我们下次会换一个有网上冲浪经验的程序来判断评论的友好度";
      } else {
        colorJudgement = "#ff7510";
        textJudgement = "中立敌对";
        textTip = "是中立的吧（心虚）";
      }
    }
    return (
      <Card boxShadow={5}>
        <CardContent>
          <Typography
            my={1}
          >{`有${info[7]}位玩家认为有价值,有${info[8]}位玩家认为好玩`}</Typography>
          <Typography my={2} fontSize="h3.fontSize" letterSpacing={4}>
            <Box display="inline">该玩家</Box>
            <Box
              fontSize="h2.fontSize"
              fontWeight="fontWeightMedium"
              display="inline"
              color={colorRecommendation}
            >
              {textRecommendataion}
            </Box>
            <Box display="inline">游玩APEX</Box>
          </Typography>
          <Typography mt={3} mb={5} letterSpacing={2} fontSize="h4.fontSize">
            {info[6]}
          </Typography>
          <Typography my={1} fontSize="h5.fontSize">
            <Box display="inline">{`玩家的友好度为${info[0]}，鉴定为：`}</Box>
            <Box
              display="inline"
              color={colorJudgement}
              fontSize="h4.fontSize"
              fontWeight="fontWeightRegular"
            >
              {textJudgement}
            </Box>
          </Typography>
          <Typography my={1} >
            {textTip}
          </Typography>
        </CardContent>
      </Card>
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
      <Box width="60vw">
        <Card>
          <ReactEcharts
            option={PlaytimeOption}
            style={{ height: "90vh", width: "55vw" }}
            eventHandler={updateInfo}
          />
          <Box m={3} width="50vw" mx="auto" my="auto">
          <DateSlider
            startTimestamp={startTimestamp}
            endTimestamp={endTimestamp}
            updateData={updateData}
            />
          </Box>
        </Card>
      </Box>
      <Box width="35vw" mx="auto" my="auto">
        <ReviewInfo info={info} />
      </Box>
    </Stack>
  );
};

function initPlaytimeOption(data) {
  const xAxis3D = {
      name: "评论友好度",
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
      text: "玩家游戏时长与评论友善程度散点图",
      textAlign:'auto',
      left: 20,
      top: 20,
    },
    legend: {
      right: 20,
      top: 20,
      data: ["推荐", "不推荐"],
      textStyle: { fontSize: 20 },
    }, //图例
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
