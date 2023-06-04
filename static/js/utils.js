const timestampToDate= (timestamp) => {
    let date = new Date(timestamp*1000)
    const yyyy = date.getFullYear();
    const MM = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    const DD = date.getDate();
    return `${yyyy}-${MM}-${DD}`
}

const dateToTimestamp = (date) =>{
    return Date.parse(date)/1000
}
