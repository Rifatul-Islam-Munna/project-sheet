import React from 'react';
import { BookOpen,  CircleCheck } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const CoachingSection = () => {
  return (
    <div className="w-full container  bg-white mt-8 text-blue-950 py-10 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
      {/* Left side with image and book shop button */}
      <div className="relative mb-8 md:mb-0 md:w-1/2 flex justify-center">
        <div className="absolute -z-10 w-72 h-72 rounded-full bg-pink-100 top-0 left-1/2 transform -translate-x-1/2 md:left-0 md:translate-x-0"></div>
        <div className="flex flex-col items-center">
          <Image 
            src="/coc.png" 
            alt="Male advisor" 
            width={2000}
            height={2000}
            className=" w-96 h-96 object-cover mix-blend-multiply z-10"
            loading='lazy'
          />
          <div className="absolute bottom-4 right-0 md:right-20 bg-white p-2 rounded-lg shadow-md z-20">
            <div className="flex items-center gap-2 px-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-pink-50">
                <BookOpen size={18} className="text-pink-400" />
              </div>
              <span className="font-medium text-sm">Book Shop</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side with text content */}
      <div className="md:w-1/2 md:pl-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-custom-text">
          We Offering Live Coaching<br />
          by Skilled Advisors
        </h2>
        
        <p className="mb-4 text-gray-600 text-sm">
          Education also provides educational consulting services for student-clients who want to study in Canada, and require help with the application process.
        </p>
        
        <p className="mb-6 text-gray-600 text-sm">
          Consulting services for student-clients who want to study in Canada, and require help with the application process.
        </p>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-custom-primary/80 to-custom-primary ">
              <CircleCheck size={20} className="text-white" />
            </div>
            <span className="font-medium text-sm">Industry Expert Instructor</span>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-6 h-6 rounded-full  bg-gradient-to-br from-custom-primary/80 to-custom-primary">
              <CircleCheck size={20} className="text-white" />
            </div>
            <span className="font-medium text-sm">Course Certificate for particular Course</span>
          </div>
        </div>
        
        <Button size={"lg"} className="px-6 py-3 bg-gradient-to-br from-custom-primary/80 to-custom-primary text-white rounded-lg">
          Read More
        </Button>
      </div>
    </div>
  );
};

export default CoachingSection;