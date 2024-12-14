import axios from "axios"
import { useEffect, useState } from "react"
import Common from "../common/captalize"



function User(){
    const [user,setUser]=useState([])
    var common = new Common()

    const token=localStorage.getItem('token')
    const email=localStorage.getItem('email')
    console.log(email)

        useEffect(()=>{
        common.getApi('http://localhost:2000/auth/getAllUser',{headers:{Authorization:token}}).then((data,err)=>{
            if(data.code){
                setUser(data.response)
            }
        })

    },[])
    return(<>
            <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">name</th>
      <th scope="col">email</th>
      <th scope="col">mobile</th>
    </tr>
  </thead>
  <tbody>
        {user.map((user,ind)=>(
            <tr>
            <th scope="row">{ind}</th>
            <td>{`${common.Capital(user.first_name)}-${user.last_name}`}</td>
            <td>{user.email}</td>
            <td>{user.mobile}</td>
          </tr>
        ))}
    
  </tbody>
</table>
    </>)
}


export default User