import SubjectSidebar from '@/components/notes/Sidebar'
import React from 'react'
import { GetRequestNormal } from '@/actions/axios';
import { ApiResponse } from '@/@types/SubjectType';
const getData = async (id:string) =>{
  const [data,error] = await GetRequestNormal<ApiResponse>(`/topic?id=${id}`)
  if(error) throw new Error("f")
  return data
 }
const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>

}) => {
  const id = (await searchParams).subjectId
  const data = await getData(id as string)
  console.log("sidebar data",data)
  return (
    <div className=' sticky top-0 left-0 hidden lg:block lg:w-[20%]'>
      <SubjectSidebar topic={data?.data}/>
    </div>
  )
}

export default page