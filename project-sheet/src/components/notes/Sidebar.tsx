"use client"
import React, { useState } from 'react';
import { 
  BookOpen, 
  FileText, 
  Search,
  Star,
  Download,
  FileQuestion
} from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SubTopic, Topic } from '@/@types/SubjectType';
import { useRouter } from 'next/navigation';



const demoData = [
  {
    chapterName: "Mechanics and Motion",
    topics: [
      { name: "Newton's Laws of Motion", id: "1" },
      { name: "Kinematics", id: "2" },
      { name: "Dynamics", id: "3" },
    ],
    difficulty: "Beginner",
  },
  {
    chapterName: "Thermodynamics",
    topics: [
      { name: "Temperature and Heat", id: "4" },
      { name: "Ideal Gas Laws", id: "5" },
    ],
    difficulty: "Intermediate",
  },
  {
    chapterName: "Electromagnetism",
    topics: [
      { name: "Electric Charge", id: "6" },
      { name: "Magnetic Fields", id: "7" },
    ],
    difficulty: "Advanced",
  },
  {
    chapterName: "Electromagnetism",
    topics: [
      { name: "Electric Charge", id: "6" },
      { name: "Magnetic Fields", id: "7" },
    ],
    difficulty: "Advanced",
  },
  {
    chapterName: "Electromagnetism",
    topics: [
      { name: "Electric Charge", id: "6" },
      { name: "Magnetic Fields", id: "7" },
    ],
    difficulty: "Advanced",
  },
  {
    chapterName: "Electromagnetism",
    topics: [
      { name: "Electric Charge", id: "6" },
      { name: "Magnetic Fields", id: "7" },
    ],
    difficulty: "Advanced",
  },
  {
    chapterName: "Electromagnetism",
    topics: [
      { name: "Electric Charge", id: "6" },
      { name: "Magnetic Fields", id: "7" },
    ],
    difficulty: "Advanced",
  },
  {
    chapterName: "Electromagnetism",
    topics: [
      { name: "Electric Charge", id: "6" },
      { name: "Magnetic Fields", id: "7" },
    ],
    difficulty: "Advanced",
  },
];

const SubjectSidebar = ({topic}:{topic:Topic[] | undefined}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const getFilteredTopics = (topics: SubTopic[]) => {
    if (!searchTerm) return topics;
    return topics.filter(topic => 
      topic.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  const router = useRouter()
  const pushToSubTopic = (topicId:string)=>{
    const url = new URLSearchParams(window.location.search)
    url.set("topicId",topicId)
    router.push(`${window.location.pathname}?${url.toString()}`);
  }
  return (
    <aside className="  left-0  w-full border-r border-gray-200 dark:border-gray-700 h-screen sticky top-0">
      <div className="h-full flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold flex items-center mb-4">
            <BookOpen className="mr-2 h-5 w-5 text-custom-primary" />
            Subject Notes
          </h2>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search topics..."
              className="pl-9 bg-gray-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <ScrollArea className="flex-1 px-4 py-2">
          <Accordion type="multiple" className="w-full" defaultValue={['item-0']}> 
            {topic?.map((chapter, index) => {
              const filteredTopics = getFilteredTopics(chapter.SubTopic);
              if (searchTerm && filteredTopics.length === 0) return null;

              return (
                <AccordionItem key={chapter._id} value={`item-${chapter._id}`} className="border-b border-gray-200 dark:border-gray-700">
                  <AccordionTrigger className="hover:bg-gray-50 dark:hover:bg-gray-800 px-2 rounded">
                    <div className="flex items-center text-left">
                      <FileText className="mr-2 h-4 w-4 text-custom-primary/90" />
                      <span className=' text-custom-text/90'>{chapter.topicName}</span>
                      
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-1 ml-6">
                      {filteredTopics.map((topic,index) => (
                        <li onClick={()=>pushToSubTopic(topic._id)} key={topic._id} className="py-1 px-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded text-sm">
                          <a href="#" className="flex items-center text-gray-700 dark:text-gray-300 hover:text-custom-primary">
                            <div className="h-1.5 w-1.5 rounded-full bg-gray-400 dark:bg-gray-600 mr-2"></div>
                            {topic.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </ScrollArea>
        
        {/* <div className="p-4 border-t mt-auto space-y-3">
          <Button variant="outline" className="w-full justify-start text-custom-primary">
            <Star className="mr-2 h-4 w-4" />
            Saved Notes
          </Button>
          <Button variant="outline" className="w-full justify-start text-custom-primary">
            <FileQuestion className="mr-2 h-4 w-4" />
            Practice Questions
          </Button>
          <Button className="w-full bg-custom-primary/80 hover:bg-custom-primary">
            <Download className="mr-2 h-4 w-4" />
            Download All Notes
          </Button>
        </div> */}
      </div>
    </aside>
  );
};

export default SubjectSidebar;
