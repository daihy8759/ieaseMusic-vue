import { app, BrowserWindow, globalShortcut } from "electron";
import isDev from "electron-is-dev";
import windowStateKeeper from "electron-window-state";
import agent from "random-useragent";

const isOsx = process.platform === "darwin";
let mainWindow: BrowserWindow|null;

function installDevTools() {
  if (isDev) {
    require("electron-debug")({
      showDevTools: true,
    });
    require("vue-devtools").install();
    require("devtron").install();
  }
}

app.on("ready", () => {
  const mainWindowState = windowStateKeeper({
    defaultWidth: 740,
    defaultHeight: 480,
  });
  mainWindow = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: 740,
    height: 480,
    resizable: false,
    vibrancy: "medium-light",
    backgroundColor: "none",
    // Headless
    frame: !isOsx,
    webPreferences: {
      webSecurity: false,
    },
  });

  installDevTools();

  mainWindow.webContents.session.webRequest.onBeforeSendHeaders({
    urls: ["http://music.163.com/*"],
  }, (
    details: any, callback: any) => {
      // session.defaultSession!.cookies.get({}, (error, cookies) =>{
      //   console.log(cookies)
      // })
    callback({
      requestHeaders: {
        ...details.requestHeaders,
        "Connection": "keep-alive",
        "Referer": "http://music.163.com",
        "Origin": "http://music.163.com",
        "Host": "music.163.com",
        "User-Agent": agent.getRandom(),
        // Cookie: session.defaultSession.cookies
      },
    });
  });

  const winURL = isDev
  ? "http://localhost:9080"
  : `file://${__dirname}/index.html`;

  mainWindow.setMenu(null);
  mainWindow.loadURL(winURL);

  globalShortcut.register("Command+right", () => {
    mainWindow!.webContents.send("next");
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

app.on("window-all-closed", app.quit);
