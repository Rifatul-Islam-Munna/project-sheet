import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Notebook, Beaker, Calculator, Globe, Code, BrainCircuit, Lightbulb, Home, TrendingUp } from "lucide-react";

import { GetRequestNormal } from '@/actions/axios';
import { ApiResponseClassDataCard } from '@/@types/SubjectType';

const getData = async (year:string)=>{

  const [data,error] = await GetRequestNormal<ApiResponseClassDataCard>(`/class/get-all?isForCard=true&year=${year}&base=university`)
  if(error){
    throw new Error("Subject not found");
  }
  return data
}

// Define types for our data
interface Department {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  linkTo: string;
}
const icons = [BookOpen, Notebook, Beaker, Calculator, Globe, Code, BrainCircuit, Lightbulb, Home, TrendingUp]
const colorClasses = {
  "blue": "bg-blue-100 text-blue-800",
  "purple": "bg-purple-100 text-purple-800",
  "green": "bg-green-100 text-green-800",
  "indigo": "bg-indigo-100 text-indigo-800",
  "red": "bg-red-100 text-red-800",
  "yellow": "bg-yellow-100 text-yellow-800",
  "orange": "bg-orange-100 text-orange-800",
  "cyan": "bg-cyan-100 text-cyan-800",
  "teal": "bg-teal-100 text-teal-800",
  "pink": "bg-pink-100 text-pink-800",
  "amber": "bg-amber-100 text-amber-800",
};
interface DepartmentCardProps {
  title: string;
  description: string;
 
  
  linkTo: string;
  index:number
}

const DepartmentCard: React.FC<DepartmentCardProps> =  ({ 
  title, 
  description, 
  index,
  
  linkTo 
}) => {
  const I = icons[index % icons.length];
  const colors = Object.keys(colorClasses);
  const color = colors[index % colors.length] as keyof typeof colorClasses;
  return (
    <Card className=" overflow-hidden transition-all border border-gray-100/90  shadow-none duration-300">
      <CardHeader className={colorClasses[color]}>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
         <I size={24}/>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <CardDescription className="text-sm line-clamp-2">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Link href={linkTo} className="w-full">
          <div className="w-full text-center py-2 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors">
            View Subjects
          </div>
        </Link>
      </CardFooter>
    </Card>
  );
};

const NavLink: React.FC<{href: string; icon: React.ElementType; children: React.ReactNode}> = ({ 
  href, 
  icon: Icon, 
  children 
}) => (
  <Link 
    href={href} 
    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
  >
    <Icon size={18} />
    <span>{children}</span>
  </Link>
);

const Page =  async ({
    params,
    searchParams,
  }: {
    params: Promise<{ year: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  }) => {
  const year = (await params).year
  const data = await getData(year)
 
  

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Choose Your Department</h1>
          <p className="text-gray-500 mt-2">Select a department to view available subjects for your year</p>
        </div>
        <div className="flex gap-6 mt-4 md:mt-0">
          <NavLink href="/dashboard" icon={Home}>
            Dashboard
          </NavLink>
          <NavLink href="/subjects/popular" icon={TrendingUp}>
            Popular Subjects
          </NavLink>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        {data?.data.map((department,index) => (
          <DepartmentCard
            key={department._id}
            title={department.title}
            description={department.desc}
           
           
            linkTo={`/university/${year}/${department.className}?department=${department._id}`}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;