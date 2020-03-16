const multer = require('multer');


const DIR = './public/';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR)
  },
  filename: async (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    const { id } = req.params;
    const newFileName = id + fileName;
    cb(null, newFileName)
    console.log('fileName', fileName);
    await User.findByIdAndUpdate(id, { profileImg: newFileName })
  }
})

let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});


module.exports = upload;
