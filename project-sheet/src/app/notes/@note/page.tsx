
import React from "react";

import { ApiResponse, ApiResponseForContent } from '@/@types/SubjectType';
import { GetRequestNormal } from "@/actions/axios";
const getData = async (id:string)=>{
  
  const url = id ? `/content/all?id=${id}` :"/content/get-for-preview"
  const [data,error] = await GetRequestNormal<ApiResponseForContent>(url,1)
  if (error || !data ) {
    return null; 
  }
   return data
  }
const page =  async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>

}) => {
  
  const id = (await searchParams).topicId
  const data = await getData(id as string)
  console.log('contetnt data',data)
  if (!data) {
    return (
      <div className="flex min-h-screen flex-1">
        <main className="px-6 py-5">
          <h1>No data at this moment</h1>
        </main>
      </div>
    );
  }
  return (
    <div className="flex  min-h-screen flex-1">
      
      <main className=" px-6  py-5 ">
        <div dangerouslySetInnerHTML={{ __html: data?.data.description as string }}  className="w-full flex flex-wrap whitespace-pre-wrap t "
        >
         
         
        </div>
        <style>
          {
            `
             table {
            border-collapse: collapse;
            width: 100%;
            max-width: 100%;
          }
          
          table, th, td {
            border: 1px solid #808080;
          }
          
          th, td {
            padding: 8px;
          }
            `
          }
        </style>
        
      </main>
    </div>
  );
};

export default page;
