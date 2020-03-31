import * as tf from '@tensorflow/tfjs-node';
import * as tmImage from '@teachablemachine/image';

import { canvas, saveFile } from './commons';
// const URL = './src/model/';
const URL = 'https://teachablemachine.withgoogle.com/models/ixbYZGQE9/';


const modelURL = URL + 'model.json';
const metadataURL = URL + 'metadata.json';

// Load the image model and setup the webcam
export async function detectMask(image) {
    const img = await canvas.loadImage(`./src/mask/out/${image}`)
    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    const model = await tmImage.load(modelURL, metadataURL);
    // const maxPredictions = model.getTotalClasses();
    const prediction = await model.predict(canvas);
    console.log(prediction)
}
