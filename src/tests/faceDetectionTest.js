const fs = require('fs');
const dir = 'image/masked';
const {detectSingle} = require('../tests/faceDetection')
const files = fs.readdirSync(dir); // 디렉토리를 읽어온다
console.log(files);
console.log(files.length)

const countFace = async () =>{
    count=0
    for(var i = 0; i < files.length; i++){
        
        var file = files[i];
        console.log(file);
        try {
            
            const flag= await detectSingle(file)

            if(flag) count=count+1
           
            console.log(files.length)
            console.log((count/files.length)*100)
        } catch (error) {
            
        }
    }

    return count
}

countFace()

