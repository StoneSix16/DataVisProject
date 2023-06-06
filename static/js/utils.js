const timestampToDate = (timestamp) => {
  let date = new Date(timestamp * 1000);
  const yyyy = date.getFullYear();
  const MM =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  const DD = date.getDate();
  return `${yyyy}-${MM}-${DD}`;
};

const dateToTimestamp = (date) => {
  return Date.parse(date) / 1000;
};

const getMonthFromTimestamp = (timestamp) => {
  let date = new Date(timestamp * 1000);
  const yyyy = date.getFullYear();
  const MM =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1;
  return `${yyyy}-${MM}`;
};

const getMonthIndex = (data) => {
    //实际上有少量更早时间的数据，这里懒得额外处理直接忽略了
  let retIndex = [26];
  for (let i = 27; i < data.length && retIndex.length < 12; i++) {
    if (
      getMonthFromTimestamp(data[i][4]) != getMonthFromTimestamp(data[i - 1][4])
    )
      retIndex.push(i);
  }
  retIndex.push(data.length)
  return retIndex;
};
