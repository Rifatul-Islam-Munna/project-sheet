'use client';

import { 
  GraduationCap, 
  Star, 
  BookOpen, 
  UserCheck
} from 'lucide-react';


export default function StatsSection() {
  return (
    <section className=" bg-custom-background text-custom-text/80 py-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-around">
        <div className="text-center p-4">
          <GraduationCap className="w-10 h-10  text-custom-primary mx-auto mb-3" />
          <p className="text-4xl font-bold">550+</p>
          <p className="text-sm opacity-90">Students Enrolled</p>
        </div>
        
        <div className="text-center p-4">
          <Star className="w-10 h-10  text-custom-primary mx-auto mb-3" />
          <p className="text-4xl font-bold">100+</p>
          <p className="text-sm opacity-90">Satisfaction Rate</p>
        </div>
        
        <div className="text-center p-4">
          <BookOpen className="w-10 h-10  text-custom-primary mx-auto mb-3" />
          <p className="text-4xl font-bold">300+</p>
          <p className="text-sm opacity-90">Academic Programs</p>
        </div>
        
        <div className="text-center p-4">
          <UserCheck className="w-10 h-10  text-custom-primary mx-auto mb-3" />
          <p className="text-4xl font-bold">40+</p>
          <p className="text-sm opacity-90">Online Instructor</p>
        </div>
      </div>
    </section>
  );
}