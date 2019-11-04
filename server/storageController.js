const multer = require("multer");
const AWS = require("aws-sdk");
const fs = require("fs");
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
  preservePath: true
});
const upload = multer({ storage }).single("file");

module.exports = {
  addURL: async (req, res) => {
    upload(req, res, err => {
      // console.log(req);
      if (err instanceof multer.MulterError) {
        return res.status(500).send(err);
      } else if (err) {
        return res.status(500).send(err);
      }
      s3 = new AWS.S3({ apiVersion: "2006-03-01" });
      let uploadParams = {
        Bucket: "listodevmountain",
        Key: req.body.file,
        Body: req.body.file
      };
      s3.upload(uploadParams, (err, data) => {
        if (err) {
          console.log(err);
        }
        if (data) {
          const { Key } = data;

          console.log("Success", data);
          return res.status(200).send(Key);
        }
      });
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
      s3 = new AWS.S3({ apiVersion: "2006-03-01" });
      let uploadParams = {
        ACL: "public-read-write",
        Bucket: "listodevmountain",
        Key: req.file.originalname,
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
