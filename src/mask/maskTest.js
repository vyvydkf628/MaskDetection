const ts = require('@tensorflow/tfjs');
const tmImage = require('@teachablemachine/image')
const canvas = require('canvas')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
global.fetch = require('node-fetch')
global.document = new JSDOM('https://127.0.0.1:80/face').window.document;
const URL = 'https://teachablemachine.withgoogle.com/models/ixbYZGQE9/';


const modelURL = URL + 'model.json';
const metadataURL = URL + 'metadata.json';

// Load the image model and setup the webcam
const detectMask = async (image) => {
    const img = await canvas.loadImage(`./src/mask/out/${image}`)
    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    const model = await tmImage.load(modelURL, metadataURL);
    // const maxPredictions = model.getTotalClasses();
    const prediction = await model.predict(img);
    console.log(prediction)
}
detectMask('bgXMgFB2p_0_0_aidai_0043.jpg')
