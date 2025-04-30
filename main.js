const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const nodemailer = require('nodemailer');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// Handle email sending from renderer process
ipcMain.handle('send-email', async (event, emailData) => {
  const { senderEmail, senderPassword, recipients, subject, text } = emailData;

  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: senderEmail,
        pass: senderPassword,
      },
    });

    let info = await transporter.sendMail({
      from: senderEmail,
      to: recipients.join(','),
      subject: subject,
      text: text,
    });

    return { success: true, info: info };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
