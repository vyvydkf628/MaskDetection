

let model, webcam, labelContainer, maxPredictions,resultCanvas,ctx,canvas,videoEl;

async function onPlay() {
    videoEl = $('#inputVideo').get(0)

    if(videoEl.paused || videoEl.ended || !isFaceDetectionModelLoaded())
    return setTimeout(() => onPlay())


    const options = getFaceDetectorOptions()

    const result = await faceapi.detectSingleFace(videoEl, options)
    

    const flag = false
    if (result) {
        canvas = $('#overlay').get(0)
        cx= canvas.getContext("2d")
        const dims = faceapi.matchDimensions(canvas, videoEl, true)
        const {x,y,width,height} = faceapi.resizeResults(result, dims)._box
        faceapi.draw.drawDetections(canvas, faceapi.resizeResults(result, dims))

        ctx.drawImage(videoEl,x+20,y-30,width-30,height-10,0,0,148,121)
        if(faceapi.resizeResults(result, dims)._score>0.5){
            if(flag===false){
                checkMask()
            }

            flag=true
        }
        
    
    }
        setTimeout(async () => {

            onPlay()
        })
    
}

async function run() {
    // load face detection model
    await changeFaceDetector(TINY_FACE_DETECTOR)
    changeInputSize(128)

    // try to access users webcam and stream the images
    // to the video element
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} })
    const videoEl = $('#inputVideo').get(0)
    videoEl.srcObject = stream
}

$(document).ready(function() {

    resultCanvas = document.getElementById("myCanvas");
    ctx = resultCanvas.getContext("2d");

//   renderNavBar('#navbar', 'webcam_face_detection')
    initFaceDetectionControls()
    run()
})


 async function checkMask(){
    const img = resultCanvas.toDataURL("image/png");
    const sample = new Image();
    sample.src= img

    const blob = await new Promise(resolve => resultCanvas.toBlob(resolve, 'image/jpeg'));
    const form = new FormData()
    form.append("image",blob)
    let response = await fetch('/checkMask', {
      method: 'POST',
      body: form
    });

    const result = await response.json()
    alert(result.result)
    location.reload()
 }