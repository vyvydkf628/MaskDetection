import * as faceapi from 'face-api.js';

import { canvas, faceDetectionNet, faceDetectionOptions, saveFile } from '../mask/commons';

import {createCanvas} from 'canvas';
export async function detectSingle(image){

  await faceDetectionNet.loadFromDisk('src/mask/weights')
  let img
  try {
    img = await canvas.loadImage(`./image/masked/${image}`)
    
  } catch (error) {
    return false  
  }
  const detect = createCanvas(148,121)
  const ctx = detect.getContext('2d')
  
  const detections = await faceapi.detectSingleFace(img, faceDetectionOptions)

  if(!detections){
    return false
  }else{
  const {x,y,width,height} = detections.box
  ctx.drawImage(img,x,y,width,height,0,0,148,121)
  // const out = faceapi.createCanvasFromMedia(img) as any
  console.log(detections)
  // faceapi.draw.drawDetections(out, detections)

  saveFile(detections.score+"score"+image, detect.toBuffer('image/jpeg'))
  console.log('done, saved results to out/faceDetection.jpg')
  return true
  }
}
