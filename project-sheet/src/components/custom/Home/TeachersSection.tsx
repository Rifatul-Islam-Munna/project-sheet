import React from 'react';
import { GraduationCap, Building, Briefcase, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const TeachersSection = () => {
  const teachers = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      image: "/teacher.png",
      expertise: ["Mathematics", "Statistics"],
      experience: "12 years",
      institute: "Cambridge University"
    },
    {
      id: 2,
      name: "Prof. James Wilson",
      image: "/teacher.png",
      expertise: ["Computer Science", "AI"],
      experience: "8 years",
      institute: "MIT"
    },
    {
      id: 3,
      name: "Dr. Amara Patel",
      image: "/teacher.png",
      expertise: ["Biology", "Chemistry"],
      experience: "15 years",
      institute: "Stanford University"
    }
  ];

  return (
    <div className="w-full  bg-custom-background/70 py-16 px-4 md:px-8">
      {/* Section Header */}
      <div className="max-w-6xl mx-auto mb-16 text-center">
        <div className="inline-block bg-custom-primary/10 px-4 py-2 rounded-full mb-4">
          <span className=" text-custom-primary font-medium flex items-center">
            <GraduationCap size={20} className="mr-2" />
            Our Exceptional Faculty
          </span>
        </div>
        <h2 className="text-4xl font-bold text-custom-text mb-4">Meet Our Teachers</h2>
        <p className="text-custom-text/70 max-w-2xl text-s font-normal 2xl:m lg:text-sm mx-auto">
          Learn from industry leaders and academic experts who bring real-world experience to every lesson
        </p>
      </div>

      {/* Teachers Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="group">
            <div className="relative overflow-hidden rounded-xl  bg-white   transition-all duration-300 ">
              {/* Teacher Image with Background */}
              <div className=" h-48 flex justify-center items-center">
              
               
                  <Image 
                    src={teacher.image} 
                    alt={teacher.name} 
                    className="w-44 h-44 bg-slate-50/10 backdrop-blur-md object-cover rounded-full "
                    width={500}
                    height={500}
                    loading='lazy'
                  />
                
              </div>
              
              {/* Teacher Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-custom-text mb-2">{teacher.name}</h3>
                
                {/* Expertise Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {teacher.expertise.map((skill, index) => (
                    <Badge key={index} className=" bg-custom-primary/10 text-custom-primary/80 hover:bg-custom-primary/20 border-0 shadow-none">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                {/* Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                      <Briefcase size={16} className="text-amber-600" />
                    </div>
                    <span className="text-gray-700">{teacher.experience} Experience</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                      <Building size={16} className="text-pink-600" />
                    </div>
                    <span className="text-gray-700">{teacher.institute}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* View More Button */}
      <div className="flex justify-center mt-12">
        <Button size={"lg"} className="group flex justify-center items-center shadow-none bg-gradient-to-br from-custom-primary/80 to-custom-primary">
          View More Teachers
          <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};

export default TeachersSection;