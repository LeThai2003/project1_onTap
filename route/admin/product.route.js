const express = require("express");
const router = express();
const controller = require("../../controller/admin/product.controller");
const multer  = require('multer')
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
// const storageHelper = require("../../helper/storageMulter.helper");
const validate = require("../../validates/admin/product.validate")

// const upload = multer({ storage: storageHelper()})

cloudinary.config({ 
    cloud_name: 'dd7gd4ks8', 
    api_key: '783351968479747', 
    api_secret: 'nussVuhVmlGejoYmsMAIY3ySzwU' 
  });

const upload = multer();
router.get("/", controller.index);

router.patch("/changeStatus/:status/:id", controller.changeStatus);

router.patch("/changeMulti", controller.changeMulti);

router.patch("/delete/:id", controller.deleteOne);

router.get("/create", controller.create);

router.post(
    "/create", 
    upload.single('thumbnail'), 
    function (req, res, next) {
        if(req.file)
        {
            let streamUpload = (req) => {
                return new Promise((resolve, reject) => {
                    let stream = cloudinary.uploader.upload_stream(
                      (error, result) => {
                        if (result) {
                          resolve(result);
                        } else {
                          reject(error);
                        }
                      }
                    );
        
                  streamifier.createReadStream(req.file.buffer).pipe(stream);
                });
            };
        
            async function upload(req) {
                let result = await streamUpload(req);
                req.body[req.file.fieldname] = result.url;
                next();
            }
        
            upload(req);
        }
        else
        {
            next();
        }
      
    },
    validate.createPost,
    controller.createPOST
);

router.get(
    "/edit/:id",
    controller.edit
)

router.patch(
    "/edit/:id",
    upload.single('thumbnail'),
    validate.createPost,
    controller.editPATCH
)

router.get("/detail/:id", controller.detail)

module.exports = router;