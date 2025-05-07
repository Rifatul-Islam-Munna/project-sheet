"use server"
import { redirect } from 'next/navigation'
import axios from 'axios';
import { PostRequestAxios } from './axios';
import { cookies } from 'next/headers';
export const SignupData = async (data: {
    username: string;
    email: string;
    password: string}) => {

    console.log(data);
    
   
    const payload ={
        name: data.username,
        email: data.email,
        password: data.password
    }
    const [k,error] = await PostRequestAxios('/user',payload)
     
    if(error){
       const d = error.response?.data as {statusCode:number,message:string}
       console.log(d);
     return{error:d.message}
    }
    if(k){
        redirect('/login')
       
    }
 
}
export const Login = async (data: {
    
    email: string;
    password: string}) => {

    
  
    if( !data.email || !data.password){
        return {error: "All fields are required"}
    }
   
     const [k,error] = await PostRequestAxios('/user/login',data)
     console.log("response",k);
     (await cookies()).set("refresh_token",k?.refresh_token);
     (await cookies()).set("access_token",k?.access_token);
     if(error){
        const d = error.response?.data as {statusCode:number,message:string}
      return{error:d.message}
     }
     if(k){
        redirect('/')
        
     }
   
}

export const getToken = async ()=>{
    const access_token = (await cookies()).get("access_token")?.value
    const refresh_token = (await cookies()).get("refresh_token")?.value
    return {access_token,refresh_token}
}