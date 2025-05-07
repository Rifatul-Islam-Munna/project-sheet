import { Subject } from '@/@types/SubjectType'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge, Bookmark, BookOpen, Clock, Eye, FileText, ShoppingBag,Lock } from 'lucide-react'
import React from 'react'
import BuyButton from './BuyButton'
export type subjectsData = {
    id: string;
    name: string;
    banner: string;
    description: string;
    requirements: string[];
    chapters: {
        id: string;
        title: string;
        topics: number;
        pages: number;
        duration: string;
        difficulty: string;
    }[];
}
const SubjectSection = ({subjectData,isview=false}:{subjectData:Subject[],isview?:boolean}) => {
  return (
    <div className="mb-12">
    
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {subjectData?.map((chapter) => (
        <Card key={chapter._id} className="shadow-none border border-gray-100/80 rounded  ">
          <CardHeader className="bg-gray-50/10 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 p-4">
            <CardTitle className="text-xl text-custom-text">{chapter?.subjectName}</CardTitle>
          </CardHeader>
          
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-y-3">
              <div className="flex items-center">
                <FileText className="h-4 w-4 text-indigo-600 mr-2" />
                <span className="text-sm text-custom-text/80">{chapter?.Topic} Topics</span>
              </div>
              <div className="flex items-center">
                <Bookmark className="h-4 w-4 text-indigo-600 mr-2" />
                <span className="text-sm">{chapter?.subTopic} Pages</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 text-indigo-600 mr-2" />
                <span className="text-sm">{chapter?.time}</span>
              </div>
             
            </div>
          </CardContent>
          
          <CardFooter className="p-4 bg-gray-50/10 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
            <div className="w-full flex justify-between items-center">
              <Button variant="outline" className=" shadow-none text-custom-primary hover:bg-indigo-50 dark:hover:bg-gray-700">
                Preview
                <Eye />
              </Button>
             <BuyButton subjectId={chapter._id} isview={isview}/>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>


  </div>
  )
}

export default SubjectSection