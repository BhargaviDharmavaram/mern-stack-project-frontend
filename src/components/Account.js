import React, {useState, useEffect, useContext} from "react";
import axios from 'axios'
import { RoleContext } from "./NavBar";
const Account = (props) => {
    const [user, setUser] = useState({})
    const {userLoggedIn} = useContext(RoleContext)
    useEffect(()=>{
        if(userLoggedIn){
        axios.get('http://localhost:3800/api/users/account', {
            headers : {
                "x-auth" : localStorage.getItem('token')
            }
        })
            .then((res)=>{
                console.log('account-res',res.data)
                setUser(res.data)
            })
            .catch((err)=>{
                console.log(err.message)
            })
        }
    },[userLoggedIn])
    return(
        <>
            <h1> User Account Details </h1>
            <p> User Name - {user.username} </p>
            <p> Email - {user.email} </p>
        </>
    )
}
export default Account