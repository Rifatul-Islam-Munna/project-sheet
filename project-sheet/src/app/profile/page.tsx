import React from 'react';
import { User, PenSquare, LogOut, BookOpen, Code, Palette, Database, BarChart3, Calendar, Award, Play } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getAllMyProfileData, getMyCourse } from '@/actions/server/ForClass';
import { toast } from 'sonner';
import SubjectSection from '@/components/custom/classCunks/SubjectSection';

 const getMyProfile = async ()=>{
  const res = await getAllMyProfileData()
  return res
 }
 const getMyCourseAll = async ()=>{
  const res = await getMyCourse()
  return res
 }

 const UserProfile = async () => {
  
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "/api/placeholder/100/100",
    joinedDate: "January 2023",
    courses: [
      { 
        id: 1, 
        title: "Advanced React Development", 
        category: "Development", 
        date: "Feb 15, 2023",
        instructor: "Sarah Miller",
        color: "bg-blue-500",
        textColor: "text-blue-600",
        icon: Code
      },
      { 
        id: 2, 
        title: "UI/UX Design Fundamentals", 
        category: "Design", 
        date: "Mar 22, 2023",
        instructor: "Michael Chen",
        color: "bg-purple-500",
        textColor: "text-purple-600",
        icon: Palette
      },
      { 
        id: 3, 
        title: "Node.js Backend Mastery", 
        category: "Development", 
        date: "Apr 10, 2023",
        instructor: "David Wilson",
        color: "bg-green-500",
        textColor: "text-green-600",
        icon: Database
      },
      { 
        id: 4, 
        title: "Data Visualization with D3", 
        category: "Data Science", 
        date: "Jun 5, 2023",
        instructor: "Emily Rodriguez",
        color: "bg-amber-500",
        textColor: "text-amber-600",
        icon: BarChart3
      }
    ]
  };
 
  const myProfile = await getMyProfile()
  const m = await getMyCourseAll()
  console.log("my profile",m.data)
  if(myProfile.error){
    toast.error(myProfile.error)
    throw new Error(myProfile.error)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Section */}
        <div className="lg:col-span-1">
          <Card className="shadow-none border">
            <CardHeader className="flex flex-col items-center space-y-3">
              <Avatar className="h-24 w-24">
                <AvatarImage src={myProfile?.data?.findUser?.name} alt={myProfile?.data?.findUser?.name} />
                <AvatarFallback>
                  <User size={32} />
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <CardTitle>{myProfile?.data?.findUser?.name}</CardTitle>
                <CardDescription className="mt-1">{myProfile?.data?.findUser?.email}</CardDescription>
           
              </div>
            </CardHeader>
            <CardFooter className="flex justify-center gap-4 pt-2 pb-6">
              <Button className="shadow-none flex gap-2" variant="outline">
                <PenSquare size={16} />
                Edit Profile
              </Button>
              <Button className="shadow-none flex gap-2" variant="outline">
                <LogOut size={16} />
                Logout
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Main Content - Purchased Courses */}
        <div className="lg:col-span-2">
          <Card className="shadow-none border">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <BookOpen className="text-blue-600" />
                  <CardTitle className="text-xl font-semibold">My Courses</CardTitle>
                </div>
                <Badge variant="outline" className="px-3 py-1">
                  {m?.data?.data.length ?? 0} Courses
                </Badge>
              </div>
              <CardDescription>Courses you've purchased</CardDescription>
            </CardHeader>
            <CardContent>
              <SubjectSection subjectData={m?.data?.data ?? []} isview/>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Course Card Component
const CourseCard = ({ course }) => {
  const IconComponent = course.icon;
  
  return (
    <Card className="shadow-none border hover:border-blue-300 transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${course.color} bg-opacity-20`}>
            <IconComponent size={18} className={course.textColor} />
          </div>
          
          <div className="flex-1">
            <h3 className="font-medium">{course.title}</h3>
          </div>
        </div>
        
        <div className="ml-13 mt-2">
          <div className="flex items-center flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs px-2 py-0">
              {course.category}
            </Badge>
            
            <div className="flex items-center text-xs text-gray-500">
              <Award size={12} className="mr-1" />
              {course.instructor}
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center text-xs text-gray-500">
              <Calendar size={12} className="mr-1" />
              Added: {course.date}
            </div>
            
            <Button variant="outline" size="sm" className="shadow-none h-7 px-2 hover:bg-blue-50 hover:text-blue-600 transition-colors">
              <Play size={14} className="mr-1" />
              Start
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;