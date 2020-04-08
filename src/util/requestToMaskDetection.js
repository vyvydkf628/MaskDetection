const request = require('request-promise')
const url = "https://evalmask.vyvydkf628.endpoint.ainize.ai/evalmask"
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
    console.log("asd")
    const result = await request(options)
    
    return result
}

module.exports = requestToMaskApi   