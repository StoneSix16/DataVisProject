const ReactEcharts = (props) => {
  const { option, style, eventHandler } = props;
  const chartRef = React.useRef(null);  // 用来勾住图表的容器

  const handleClick = (event)=>{
    if(eventHandler) eventHandler(event)
  }
  // 监听 option 的变化，变化时重新渲染图表
  React.useEffect(() => {
    if (chartRef.current) {
      let echartInstance = echarts.getInstanceByDom(chartRef.current)
      if(!echartInstance){
        echartInstance = echarts.init(chartRef.current);
        echartInstance.on('click', handleClick)
      }
      echartInstance.setOption(option);
    }
  }, [option]); 
  return (
    <div ref={chartRef} style={style} />
  );
}
