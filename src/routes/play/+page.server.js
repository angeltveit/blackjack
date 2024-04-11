import fs from 'fs';
import path from 'path';


export async function load({ params }) {
  const directoryPath = './static/images/cards';
  try {
    // Read the contents of the directory
    const files = await fs.promises.readdir(directoryPath);

    // Filter out only the files (exclude directories)
    const fileList = files.filter(file => {
      return fs.statSync(path.join(directoryPath, file)).isFile();
    });

    return { cards: fileList };
  } catch (error) {
    console.error('Error reading directory:', error);
    throw error;
  }

}