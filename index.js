const fs = require('fs');
const path = require('path');

// jpgファイルが格納されているフォルダ
const jpgFolder = './jpg';

// RAWファイルが格納されているフォルダ
const rawFolder = './raw';

// RAWファイルをコピーするフォルダ
const outputFolder = './output';

// jpgファイルからファイル名を取得し、RAWファイルと一致するものを抜き出す
fs.readdir(jpgFolder, (err, files) => {
  if (err) {
    console.error(err);
    return;
  }

  const selectedFiles = [];

  files.forEach((jpgFile) => {
    if (jpgFile.endsWith('.jpg')) {
      const rawFile = jpgFile.replace('.jpg', '.raw');
      const rawFilePath = path.join(rawFolder, rawFile);
      if (fs.existsSync(rawFilePath)) {
        selectedFiles.push(rawFile);
      }
    }
  });

  // 抜き出したファイルをコピーする
  selectedFiles.forEach((rawFile) => {
    const srcPath = path.join(rawFolder, rawFile);
    const destPath = path.join(outputFolder, rawFile);
    fs.copyFileSync(srcPath, destPath);
  });
});