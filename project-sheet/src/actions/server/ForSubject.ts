"use server"
import { SubjectResponse } from "@/@types/SubjectType"
import { GetRequestNormal, PostRequestAxios } from "../axios"

export const getSubjectForAdmin = async  (id:string)=>{
    const [ data,error] = await GetRequestNormal<SubjectResponse>(`/subject?id=${id}`,0)
    
    return data
}
export interface PayloadForNewSubject{
    classId: string,
    className: string,
    subjectName: string,
}
export const postNewSubject = async (payload:PayloadForNewSubject)=>{
 const [data,error] = await  PostRequestAxios(`/subject`,payload)
 if(error){
    const d = error.response?.data as {statusCode:number,message:string}
    console.log(d);
  return{error:d.message}
 }
 return {data:data}
}