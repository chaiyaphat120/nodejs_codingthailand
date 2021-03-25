//upload picture
const fs = require('fs');  //ระบบ file sytems ของ nodejs
const uuidv4 = require('uuid');
const path = require('path');
const { promisify } = require('util')
const writeFileAsync = promisify(fs.writeFile) //ใช้ util แปลง fs.whitefile ให้เป็น asynchonus จะได้ใช้ async await ได้

async function saveImageToDisk(baseImage) {
    //หา path จริงของโปรเจค
    const projectPath = path.resolve('./') ;
    //โฟลเดอร์และ path ของการอัปโหลด
    const uploadPath = `${projectPath}/public/images/`;

    //หานามสกุลไฟล์
    const ext = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));
    //ex."imagebase64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/  จะได้ substring ระหว่าง / อันแรก และ ;base64 
    //เลยได้นามสกุลไฟล์  jpeg
    //ถ้า svg มันจะได้    data:image/svg+xml;base64,/fdfdsf........
    //สุ่มชื่อไฟล์ใหม่ พร้อมนามสกุล
    let filename = '';
    if (ext === 'svg+xml') {
        filename = `${uuidv4.v4()}.svg`;
    } else {
        filename = `${uuidv4.v4()}.${ext}`;
    }

    //Extract base64 data ออกมา
    // ex. baseimage     =>   "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/ ....
    let image = decodeBase64Image(baseImage);  //decode ให้เป็นรูปภาพ จาก string ยาวๆ

    //เขียนไฟล์ไปไว้ที่ path
    await writeFileAsync(uploadPath+filename, image.data, 'base64');  //เขียนไฟล์รูป โดยการแปลง base64
    //return ชื่อไฟล์ใหม่ออกไป
    return filename;
}

function decodeBase64Image(base64Str) {
    var matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var image = {};
    if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 string');
    }

    image.type = matches[1];  // image/jpeg
    console.log(image.type)
    image.data = matches[2];   ///9j/4AAQSkZJRgABAQEAYABgAAD/ ....  จะได้ข้อมูลจริงๆ หลัง comma


    return image;
}

module.exports = saveImageToDisk