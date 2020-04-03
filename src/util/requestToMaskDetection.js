const request = require('request-promise')
const url = "http://127.0.0.1:3010/mask"
const fs = require('fs')

const requestToMaskApi = async (image)=>{

    const options = {
        method: "POST",
        url,
        headers: {
            "Content-Type": "multipart/form-data"
        },
        formData : {
            "image" : fs.createReadStream(`src/mask/out/${image}`)
        }
    };
    const result = await request(options)
    return result
}

module.exports = requestToMaskApi