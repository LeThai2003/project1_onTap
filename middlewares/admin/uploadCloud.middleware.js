const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

// const upload = multer({ storage: storageHelper()})

cloudinary.config({ 
    cloud_name: 'dd7gd4ks8', 
    api_key: '783351968479747', 
    api_secret: 'nussVuhVmlGejoYmsMAIY3ySzwU' 
  });



module.exports.uploadSingle = (req, res, next) => {
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
  
}