"use server"

import { ResponseClass } from "@/@types/ClassType";
import { GetRequestNormal, PatchRequestAxios, PostRequestAxios } from "../axios"
import { ApiResponse } from "@/@types/SubjectType";
import { redirect } from "next/navigation";

export const getClassNameBasedOnBaseName = async (base:string,selectDivisionForSearch:string,selectYearForSearch:string)=>{
    if(!base) return;
    const param = new URLSearchParams()
 if(selectDivisionForSearch)   param.append("division",selectDivisionForSearch)
    if(selectYearForSearch)  param.append("year",selectYearForSearch)
 const [data,error] = await GetRequestNormal<ResponseClass>(`/class/get-all?isForCard=true&base=${base}&${param.toString()}`,1);
 if(error){
    const d = error.response?.data as {statusCode:number,message:string}
    console.log(d);
  return{error:d.message}
 }
 return{data:data}
} 
export interface className{
imageUrl: string,
 title: string,
  desc: string,
  className: string,
  base: string,
  division?: "science" | "commerce" | "arts",
  subject?: string,
  year?: string
}
export const postClassName = async (payload:className)=>{
    if(!payload.base){
        throw new Error("Need base name")
    }
 const [data,error] = await PostRequestAxios(`/class`,payload)
 if (error) {
    console.error("Posting error on server:", error);
    throw new Error(error.message); 
  }
 return data
}



export const getMainAndSubTopicFromOneEndPoint = async (id:string)=>{   
   if(!id){
      throw new Error("Need Id")
  }
const [data,error] = await GetRequestNormal<ApiResponse>(`/topic?id=${id}`,10)
if (error) {
  console.error("Posting error on server:", error);
  throw new Error(error.message); 
}
return data
}
export type NewTopicType ={
   subjectId:string,
   topicName:string
}
export const postNewTopic = async (payload:NewTopicType)=>{
   if(!payload){
      throw new Error("Need Data for posting")
  }
const [data,error] = await PostRequestAxios(`/topic`,payload)
if (error) {
  console.error("Posting error on server:", error);
  throw new Error(error.message); 
}
return data
}
export type PostNewSubTopic ={
  
   SubTopic:{
      name:string
   }[]
   id:string
}
export const postNewSubTopic= async (payload:PostNewSubTopic)=>{
   if(!payload){
      throw new Error("Need Data for posting")
  }
const [data,error] = await PatchRequestAxios(`/topic`,payload)
console.log(error)
if (error) {
  console.error("Posting error on server:", error);
  throw new Error(error.message); 
}
return data
}

export type ContentPost = {
   subTopicId:string,
   description:string
   isPreview?:boolean
}
export const postNewContent = async (payload:{})=>{
   if(!payload){
      throw new Error("Need Data for posting")
  }
const [data,error] = await PostRequestAxios(`/content`,payload)
if (error) {
  console.error("Posting error on server:", error);
  throw new Error(error.message); 
}
return data
}


export const uploadImage = async (fromData:FormData) =>{
   const [data,error] = await PostRequestAxios(`/upload-service/upload-image`,fromData)
if (error) {
  console.error("Posting error on server:", error);
  throw new Error(error.message); 
}
return data
}
export const postForMyDocument = async (id:string)=>{
   const [data,error] = await PostRequestAxios(`/purchase`,{subjectId:id})
if (error) {
   if(error.response?.status === 401){
      redirect("/login")
   }
  console.error("Posting error on server:", error);
  throw new Error(error.message); 
}
return data
}
export const getAllMyProfileData = async ()=>{
   const [data,error] = await GetRequestNormal(`/user`)
   if (error) {
      if(error.response?.status === 401){
         redirect("/login")
        
      }
     console.error("Posting error on server:", error);
     
   }
   return {
      data:data,
      error:error?.message
   }
}

export const getMyCourse = async () =>{
   const [data,error] = await GetRequestNormal(`/purchase`)
   if (error) {
      if(error.response?.status === 401){
         redirect("/login")
        
      }
     console.error("Posting error on server:", error);
     
   }
   return {
      data:data,
      error:error?.message
   }
}
