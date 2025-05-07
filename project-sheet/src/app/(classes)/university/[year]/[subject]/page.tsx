import BreadcrumbCustom from '@/components/custom/classCunks/BreadcrumbCustom'
import Requerment from '@/components/custom/classCunks/Requerment';
import SubjectSection from '@/components/custom/classCunks/SubjectSection';
import { BookOpen } from 'lucide-react';
import React from 'react'

import { ApiResponseClassData, SubjectDataResponse } from '@/@types/SubjectType';
import { GetRequestNormal,GetRequestAxios } from '@/actions/axios';

const subjectsData = {
   
    
    id: "mathematics",
    name: "Mathematics",
    banner: "/api/placeholder/1200/300",
    description: "Complete study notes for Mathematics covering all major topics and concepts.",
    requirements: [
      "Basic understanding of high school mathematics",
      "Prior knowledge of fundamental mathematical operations",
      "Recommended for students in grades 11-12 or undergraduate level"
    ],
    chapters: [
      {
        id: "chap1",
        title: "Calculus",
        topics: 12,
        pages: 50,
        duration: "5-6 hours",
        difficulty: "Advanced",
      },
      {
        id: "chap2",
        title: "Algebra",
        topics: 10,
        pages: 42,
        duration: "4-5 hours",
        difficulty: "Intermediate",
      },
      {
        id: "chap3",
        title: "Geometry",
        topics: 9,
        pages: 38,
        duration: "3-4 hours",
        difficulty: "Intermediate",
      },
      {
        id: "chap4",
        title: "Statistics",
        topics: 8,
        pages: 35,
        duration: "3-4 hours",
        difficulty: "Intermediate",
      },
      {
        id: "chap5",
        title: "Trigonometry",
        topics: 7,
        pages: 30,
        duration: "3-4 hours",
        difficulty: "Intermediate",
      },
      {
        id: "chap6",
        title: "Number Theory",
        topics: 6,
        pages: 28,
        duration: "2-3 hours",
        difficulty: "Advanced",
      },
    ]
  
};

const getData = async (className:string,id?:string) =>{
  const query = id ? `/subject?id=${id}`:`/subject?className=${className}`

  const [data,error] = await GetRequestNormal<SubjectDataResponse>(query)
  if(error || !data){
    throw new Error("Subject not found");
  }
  return data
}



const page =  async ({
    params,
    searchParams,
  }: {
    params: Promise<{ subject: string,year:string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }) => {
   const subject =  (await params).subject
    const Sparam =  await searchParams
    const dep =  Sparam.department as string;
    const SubjectData = await  getData(subject,dep) 
    const year = (await params).year
    const BreadcrumbData =[
        {
          name: "Home",
          href: "/",
        },
        {
          name: year,
          href: `/university/${year}`,
        },
        {
          name: subject,
       
        },
       
       ]
      
       
      

  return (

    <div className=' w-full  min-h-dvh'>
        <div 
          className="w-full h-48 bg-cover bg-center relative" 
         
        >
          <div className="absolute inset-0 bg-custom-background bg-opacity-70 flex flex-col justify-end p-6">
    

             <BreadcrumbCustom BreadcrumbData={BreadcrumbData}/>
            <h1 className="text-3xl md:text-4xl font-bold text-custom-text">University  Notes</h1>
            <p className="text-custom-text/90 text-lg max-w-3xl mt-2">You have to learn everything</p>
          </div>

        </div>
        <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-5">
        <h2 className=" text-2xl font-bold flex items-center">
                  <BookOpen className="mr-2 h-6 w-6 text-custom-primary" />
                  Available Books
                </h2>
                


            </div>

               <SubjectSection subjectData={SubjectData.data}/>     
              <Requerment subjectData={subjectsData}/>

            </div>



    </div>
  )
}

export default page