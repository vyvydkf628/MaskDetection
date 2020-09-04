const express = require('express');
const multer = require('multer');
const shortId = require('shortid');

const { detectSingle } = require('./mask/faceDetection');
const requestToMaskApi = require('./util/requestToMaskDetection');
const app = express();
const cors = require('cors');

// CORS
app.use(cors());

app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './image');
  },
  filename: function (req, file, cb) {
    const uniqueFileName = shortId.generate();
    cb(null, uniqueFileName + '_' + file.originalname); //Appending .jpg
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file) {
      return cb(new Error('must be file'));
    }
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('must be png, jpg or jpeg'));
    }
    cb(undefined, true);
  },
});

app.post(
  '/checkmask',
  upload.single('image'),
  async (req, res) => {
    console.log(req.file);
    if (!req.file) {
      res.status(400).send({ error: 'must have image' });
    } else {
      try {
        const isPerson = await detectSingle(`${req.file.filename}`);
        if (!isPerson) res.status(400).send({ error: "can't find the face" });
        else {
          const result = await requestToMaskApi(req.file.filename);
          res.status(200).send(result);
        }
      } catch (error) {
        res.status(400).send;
      }
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  },
);
module.exports = app;
