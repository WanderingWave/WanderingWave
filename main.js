const electron = require('electron')
const { app, BrowserWindow } = electron
const server = require("./server")
var childProc = require('child_process');

app.on('ready', () => {
  let win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL('http://localhost:3000')


})

exports.openTerminal = () => {
  childProc.exec('open "/Applications/Skype.app"')
}
