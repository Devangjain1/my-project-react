import { toast } from "react-toastify"
import axios from "axios"

class Common{
    Capital(text){
        let b=[]
        for(let i=0;i<text.length;i++){
            b.push(text[i])
        }
        b[0]=b[0].toUpperCase()
        let c=""
        c=b.join("")

        return c 
    }

    getApi(url){
        return axios.get(url).then((data,err)=>{
            if(data){
                return data.data
            }
            else{
                return err
            }
        })
    }
}

export default Common