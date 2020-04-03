const express = require('express')
const path = require('path')
const multer = require('multer')
const shortId = require('shortid');   
const {PythonShell} = require('python-shell')

const viewsPath = path.join(__dirname,'../templates/views')
const {detectSingle} = require('./mask/faceDetection')
const requestToMaskApi = require('./util/requestToMaskDetection')
const app = express()

app.set('view engine','hbs')
app.set('views',viewsPath)
app.use('/js', express.static(__dirname + './../public/js'));
app.use('', express.static(__dirname + './../public'));
app.use(express.json())


// app.get('/',async(req,res)=>{
//     res.render('index')
// })
// app.get('/face',async(req,res)=>{
//     res.render('facereco')
// })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './image')
    },
    filename: function (req, file, cb) {

        const uniqueFileName = shortId.generate();
        cb(null,uniqueFileName+ "_" +file.originalname) //Appending .jpg
    }
})
const upload = multer({
    storage,
    limits: {
        fileSize: 1000000
    }
    ,
    fileFilter(req, file, cb) {
        if(!file){
            return cb(new Error('must be file'))
        }
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('must be png, jpg or jpeg'))
        }
        cb(undefined, true)
    }
    
})
app.post('/checkmask',upload.single('image'),async(req,res)=>{
    if(!req.file) {res.status(400).send({error: "must have image"})}
    else{
    try {

        const isPerson = await detectSingle(`${req.file.filename}`)
        if(!isPerson) res.status(400).send({error:"can't find the face"});
        else{
            const result = await requestToMaskApi(req.file.filename)
            res.status(200).send(result)

            // PythonShell.run('src/py/predict.py',{args: [`--image=src/mask/out/${req.file.filename}`]},(err,result)=>{
            //     result = JSON.parse(result)
            //     if(err) {
            //         console.log(err)
            //         res.status(400).send({err})}
            //     else{
            //         res.status(200).send({result})
            //     }
            // })
        }
        
    } catch (error) {
        res.status(400).send
    }
}
},(error,req,res,next)=>{
    res.status(400).send({error: error.message})
})
module.exports = app
