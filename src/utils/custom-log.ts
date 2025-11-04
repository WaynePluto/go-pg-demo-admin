const SHOWLOG = () => Boolean((window as any).SHOWLOG);

function stack() {
  const e = new Error();
  const lines = e.stack?.split("\n");
  lines?.shift();
  const result: any[] = [];
  lines?.forEach(function (line) {
    result.push(line);
  });
  return result.length > 4 ? result[3] : "";
}
function getDateString() {
  const d = new Date();
  let str = d.getHours().toString();
  let timeStr = "";
  timeStr += (str.length === 1 ? "0" + str : str) + ":";
  str = d.getMinutes().toString();
  timeStr += (str.length === 1 ? "0" + str : str) + ":";
  str = d.getSeconds().toString();
  timeStr += (str.length === 1 ? "0" + str : str) + ":";
  str = d.getMilliseconds().toString();
  if (str.length === 1) str = "00" + str;
  if (str.length === 2) str = "0" + str;
  timeStr += str;
  timeStr = "[" + timeStr + "]";
  return timeStr;
}
function addStack(args: any[]) {
  const info = SHOWLOG() ? "\n" + getDateString() + stack() + "\n" : "";
  return [...args, info];
}

export function log(...args) {
  if (!SHOWLOG()) {
    return;
  }
  const backLog = (...params) => {
    const [tag, ...others] = params;
    console.log(`%c ${tag}`, "color: green;", ...others);
  };

  backLog.apply(console.log, addStack(args));
}
export function info(...args) {
  if (!SHOWLOG()) {
    return;
  }
  const backLog = (...params) => {
    const [tag, ...others] = params;
    console.info(`%c ${tag}`, "color: blue;border: 2px solid #87cefa;padding: 2px;margin: 2px;", ...others);
  };
  backLog.apply(backLog, addStack(args));
}
export function warn(...args) {
  if (!SHOWLOG()) {
    return;
  }
  const backLog = (...params) => {
    const [tag, ...others] = params;
    console.log(`%c ${tag}`, "color: yellow;", ...others);
  };
  backLog.apply(backLog, addStack(args));
}
export function err(...args) {
  if (!SHOWLOG()) {
    return;
  }
  const backLog = (...params) => {
    const [tag, ...others] = params;
    console.log(`%c ${tag}`, "color: red;", ...others);
  };

  backLog.apply(backLog, addStack(args));
}
