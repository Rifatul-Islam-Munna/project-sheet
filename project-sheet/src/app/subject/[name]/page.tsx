
import React from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { 
  BookOpen, 
  FileText, 
 
  Clock,
  BarChart,
  
  Bookmark,
  ShoppingBag,
  Lock,
  Eye
} from 'lucide-react';

import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

import { 
  Button 
} from "@/components/ui/button";

import { 
  Badge 
} from "@/components/ui/badge";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import SubjectSection from '@/components/custom/classCunks/SubjectSection';
import Requerment from '@/components/custom/classCunks/Requerment';
import BreadcrumbCustom from '@/components/custom/classCunks/BreadcrumbCustom';
import { GetRequestNormal } from '@/actions/axios';

import { SubjectDataResponse } from '@/@types/SubjectType';
import { redirect } from 'next/navigation';
const getSchoolData = async (value:string)=>{
  const [data,error] = await GetRequestNormal<SubjectDataResponse>(`/subject?className=${value}`,0)
  if (error || !data) {
    console.log("error data",error) 
    throw new Error("Subject not found"); 
       
  }
  if(data?.statusCode === 401){
    redirect('/login')
  }
  return data
}



export default async function page({
    params,
    
  }: {
    params: Promise<{ name: string }>
    
  }) {

  const  subjectId  = (await params).name
  const data:SubjectDataResponse = await getSchoolData(subjectId)
  console.log(`data`,data);
 
  
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

  // Handle loading state when subjectId is not yet available
  if (!subjectId) {
    return <div className="min-h-screen flex items-center justify-center">Loading subject information...</div>;
  }


 

 const BreadcrumbData =[
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Subjects",
    href: "/subjects",
  },
  {
    name:subjectId
  }
 ]
  

  return (
    <>
      <Head>
        <title>{subjectId} Notes | Study Materials</title>
        <meta name="description" content={subjectsData.description} />
      </Head>
     

      <div className="min-h-screen bg-white dark:bg-slate-900">
        {/* Header Section */}
        <div 
          className="w-full h-48 bg-cover bg-center relative" 
          style={{ backgroundImage: `url(${subjectsData.banner})` }}
        >
          <div className="absolute inset-0 bg-custom-background bg-opacity-70 flex flex-col justify-end p-6">
    

             <BreadcrumbCustom BreadcrumbData={BreadcrumbData}/>
            <h1 className="text-3xl md:text-4xl font-bold text-custom-text">{subjectId} Notes</h1>
            <p className="text-custom-text/90 text-lg max-w-3xl mt-2">{subjectsData.description}</p>
          </div>
        </div>

       
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-5">
                <h2 className=" text-2xl font-bold flex items-center">
                  <BookOpen className="mr-2 h-6 w-6 text-custom-primary" />
                  Available Books
                </h2>
              {/*   <div className="flex space-x-2">
                  <Button className=" bg-custom-primary/90 hover:bg-custom-primary">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                   
                    Get All (-20%)off
                  </Button>
                </div> */}
              </div>
          <SubjectSection subjectData={data.data}/>

          
       
         <Requerment subjectData={subjectsData}/>
          

         


        </div>
      </div>
    </>
  );
}