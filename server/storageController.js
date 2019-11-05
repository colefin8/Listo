require("dotenv").config();
const multer = require("multer");
const AWS = require("aws-sdk");
const fs = require("fs");
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, BUCKET_NAME } = process.env;
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
  preservePath: true
});
const upload = multer({ storage }).single("file");

module.exports = {
  signs3: (req, res) => {
    AWS.config = {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY
    };
    const s3 = new AWS.S3();
    const fileName = req.query["file-name"];
    const fileType = req.query["file-type"];
    const params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: "public-read"
    };

    s3.getSignedUrl("putObject", params, (err, data) => {
      if (err) {
        console.log(err);
        res.end();
      }
      const dataToSend = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
      return res.send(dataToSend);
    });
  },
  add: async (req, res) => {
    upload(req, res, err => {
      // console.log(req);
      if (err instanceof multer.MulterError) {
        return res.status(500).send(err);
      } else if (err) {
        return res.status(500).send(err);
      }
      const fileStream = fs.createReadStream(req.file.path);
      let fileType = req.file.path.split(`.`);
      fileType = fileType[fileType.length - 1];
      s3 = new AWS.S3({ apiVersion: "2006-03-01" });
      let uploadParams = {
        ACL: "public-read-write",
        Bucket: BUCKET_NAME,
        Key: req.file.originalname,
        ContentType: `image/${fileType}`,
        Body: fileStream
      };
      s3.upload(uploadParams, (err, data) => {
        if (err) {
          console.log(err);
        }
        if (data) {
          const { Key } = data;

          // console.log("Success", data);
          return res.status(200).send(Key);
        }
      });
    });
  },
  getImage: async (req, res) => {
    const { data } = req.body;
    // console.log(`key: ${data}`);
    const params = {
      Bucket: "listodevmountain",
      Key: data
    };
    s3 = new AWS.S3({ apiVersion: "2006-03-01" });
    s3.getObject(params, (err, data) => {
      if (err) console.log(err);
      else {
        // console.log(data);
        res.status(200).send(data);
      }
    });
  }
};
