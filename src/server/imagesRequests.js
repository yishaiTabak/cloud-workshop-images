import axios from "axios";

const URL = "http://cloud-images-env.eba-spme8zp4.eu-west-1.elasticbeanstalk.com/"

export const uploadImage = async (formData) =>{
    try{
        const result = await axios.post(URL+"upload", formData, {
            headers:{
                "Content-Type": "multipart/form-data"
            }
        })
        return result.data
    }catch(err){
        console.log(err);
    }
}

export const getImagesData = async ()=>{
    try{
        const res = await axios.get(URL+"get-images")

        return res.data
    }catch(err){
        console.log(err);
    }
}

export const deleteImage = async(id, key)=>{
    try{
        await axios.delete(URL+"delete-image", {data:{id,key}})
        return
    }catch (err){
        console.log(err);
    }
}