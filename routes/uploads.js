const express = require('express');
const router = express.Router();
const multer = require("multer");
const path = require("path");
var opDB = require(__lib + '/database').opDB;
var logger = require(__lib + '/logger');
var common = require('../lib/common');


var upload = multer({storage: multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "uploads/")
    },
    filename: function (req, file, callback) {
        callback(null, new Date().valueOf() + path.extname(file.originalname));
    }
}),
});


// 뷰 페이지 경로
// router.get('/show', function (req, res, next) {
//     res.render("index")
// });

// 2. 파일 업로드 처리
router.post('/create', upload.single("imgFile"), function (req, res, next) {

    var user_id = req.body.user_id
    var image = "http://18.217.130.157:3000/" + req.file.filename
   // var image = req.file.path
    var image_usage = req.body.image_usage
    var image_date = req.body.image_date
    var image_check = req.body.image_check
    // var image_id = req.body.image_id
    var delete_image = req.body.delete_image

    if (image_check != "1") {
        opDB.insert_image(user_id, image, image_usage, "NULL", image_date, function (err, result) {
            if (err) console.log(err)
            else {
                console.log("insert"+req.file.filename + user_id+"이미지체크숫자"+image_check)
                res.redirect("/views/mypage")
            }
        })
    } else {
        opDB.deleteByCond("image", "user_id='" + user_id + "'", function (err, result) {
            if (err) console.log(err)
            else {
                opDB.insert_image(user_id, image, image_usage, "NULL", image_date, function (err, result) {
                    if (err) console.log(err)
                    else {
                        // fs.unlink("uploads/"+delete_image, (err) => {
                        //     if(err) console.log(err)
                        //     else {
                        //       var object = new Object()
                        //       object.result = "success"
                        //       res.send(object)
                        //     }
                        //   })
                        console.log("delete"+req.file.filename + user_id+"이미지체크숫자"+image_check)
                        res.redirect("/views/mypage")
                    }
                })
            }
        })
    }
});

module.exports = router;