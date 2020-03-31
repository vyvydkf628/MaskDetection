
// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/ixbYZGQE9/";


// Load the image model and setup the webcam
async function init() {
    console.log("SUC")
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    resultCanvas = document.getElementById("myCanvas");
    ctx = resultCanvas.getContext("2d");
    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
    // append elements to the DOM
    window.requestAnimationFrame(loop)
    document.getElementById("webcam-container").appendChild(resultCanvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) { // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
}

async function loop() {
    await predict();
    window.requestAnimationFrame(loop);
}



async function predict() {
    // predict can take in an image, video or canvas html element
    
    const prediction = model.predict(resultCanvas);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }
}
init()