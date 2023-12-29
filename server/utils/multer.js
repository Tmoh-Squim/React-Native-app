const multer = require('multer')

const storage = multer.diskStorage({
    destinaton : function (req,file,cb) {
        cb(null,"uploads/")
    },
    filename : function(req,file,cb){
        const filename = file.originalname
        cb(null,Date.now() + "-" + filename)
    }
})
exports.upload = multer({storage:storage})
