const timeFixZero = (num, max = 10) => {
  return num < max ? `0${num}` : num;
};

/**
 * [dateFormat 根据模板格式化日期]
 * @param time 时间戳
 * @param template 'yyyy-MM-dd' 'yyyy-MM-dd hh:mm:ss'
 * @param useUtc 是否使用utc时间.
 * @returns {string}
 */
function dateFormat(time = 0, template = "dd/MM/yyyy", useUtc = false) {
  time = time.toString().length >= 10 ? time * 1000 : time;
  time = new Date(time);
  const month = useUtc ? time.getUTCMonth() + 1 : time.getMonth() + 1;
  const date = useUtc ? time.getUTCDate() : time.getDate();
  const hours = useUtc ? time.getUTCHours() : time.getHours();
  const minutes = useUtc ? time.getUTCMinutes() : time.getMinutes();
  const seconds = useUtc ? time.getUTCSeconds() : time.getSeconds();
  const o = {
    "M+": timeFixZero(month),
    "d+": timeFixZero(date),
    "h+": timeFixZero(hours),
    "m+": timeFixZero(minutes),
    "s+": timeFixZero(seconds),
  };
  if (/(y+)/.test(template)) {
    const year = useUtc ? time.getUTCFullYear() : time.getFullYear();
    template = template.replace(
      RegExp.$1,
      (year + "").substr(4 - RegExp.$1.length)
    );
  }
  for (const k in o) {
    if (new RegExp("(" + k + ")").test(template)) {
      template = template.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return template;
}

/**
 * 获取某天日期
 * @param n 昨天-1，今天0，明天1，以此类推
 * @param useUtc 是否使用utc时间
 * @returns {Date} yyyy-mm-dd
 */
function getSomeday(n, useUtc = false) {
  let uom = new Date(new Date() - 0 + n * 86400000);
  const year = useUtc ? uom.getUTCFullYear() : uom.getFullYear();
  const month = useUtc ? uom.getUTCMonth() + 1 : uom.getMonth() + 1;
  const date = useUtc ? uom.getUTCDate() : uom.getDate();
  uom = year + "-" + month + "-" + date;
  return uom;
}

export { dateFormat, getSomeday };
