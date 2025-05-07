import axios from "axios"
import { AxiosError } from "axios"
import { redirect } from 'next/navigation'
import { getToken } from "./auth"



const baseUrl = process.env.BASE_URL

export const PostRequestAxios = async <T>(url: string, payload: T) : Promise<[T | null, AxiosError | null]> => {
    const {access_token,refresh_token} = await getToken()
    try{
        const {data} = await axios.post(`${baseUrl}${url}`, payload,{
            headers:{
                access_token:access_token,
            refresh_token:refresh_token
            }
            
        })
        return [data,null];

    }catch(error ){
        if (axios.isAxiosError(error)) {
            return [null, error]; 
        }
       
        return [null, null];
    }
}
export const PatchRequestAxios = async <T>(url: string, payload: T) : Promise<[T | null, AxiosError | null]> => {
    const {access_token,refresh_token} = await getToken()
    try{
        const {data} = await axios.patch(`${baseUrl}${url}`, payload,{
            headers:{
                access_token:access_token,
            refresh_token:refresh_token
            }
            
        })
        return [data,null];

    }catch(error ){
        if (axios.isAxiosError(error)) {
            return [null, error]; 
        }
       
        return [null, null];
    }
}
export const GetRequestAxios = async <T>(url: string, ) : Promise<[T | null, AxiosError | null]> => {
    try{
        const {data} = await axios.get(`${baseUrl}${url}`)
        return [data,null];

    }catch(error ){
        if (axios.isAxiosError(error)) {
            return [null, error]; 
        }
       
        return [null, null];
    }
}
export const GetRequestNormal = async <T>(url: string,revalidate=3 ) : Promise<[T | null, AxiosError | null]> => {
    const {access_token,refresh_token} = await getToken()
    
    try{
        const response = await fetch(`${baseUrl}${url}`,{next:{revalidate:0},headers:{
               
                access_token:access_token,
                refresh_token:refresh_token
               

        }})
        let data = await response.json()
        return [data,null];

    }catch(error ){
        if (axios.isAxiosError(error)) {
           
            if(error.status === 401){
             redirect('/login')
            }
         
            return [null, error]; 
        }
       
        return [null, null];
    }
}



