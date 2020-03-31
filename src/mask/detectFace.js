const canvas = require('canvas');
const faceapi = require('face-api.js')
// patch nodejs environment, we need to provide an implementation of
// HTMLCanvasElement and HTMLImageElement
const { Canvas, Image, ImageData } = canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })
const detection = faceapi.detectSingleFace('./2XjqIK3FZ_blob.jpg').then(result =>{
    console.log(reuslt)
})
detection

