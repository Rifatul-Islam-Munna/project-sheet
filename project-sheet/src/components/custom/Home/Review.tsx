"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Star, Users, GraduationCap, Award, ThumbsUp } from "lucide-react"
import { useState } from "react"

// Sample data for reviews
const reviewsData = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Web Development",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    comment:
      "This course completely transformed my career path. The instructors are incredibly knowledgeable and supportive.",
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "UX Design",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 4,
    comment:
      "The hands-on projects really helped me build a strong portfolio. I landed my dream job right after graduation!",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Data Science",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    comment: "The curriculum is cutting-edge and the community support is amazing. Worth every penny.",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    role: "Mobile Dev",
    avatar: "https://i.pravatar.cc/150?img=9",
    rating: 5,
    comment: "I've tried other platforms, but nothing compares to the quality of instruction here. Truly exceptional.",
  },
  {
    id: 5,
    name: "David Kim",
    role: "AI Student",
    avatar: "https://i.pravatar.cc/150?img=8",
    rating: 4,
    comment:
      "The instructors break down complex concepts in a way that's easy to understand. Great learning experience!",
  },
  {
    id: 6,
    name: "Priya Patel",
    role: "Blockchain",
    avatar: "https://i.pravatar.cc/150?img=6",
    rating: 5,
    comment:
      "The networking opportunities alone are worth it. I've connected with industry leaders and found amazing mentors.",
  },
  {
    id: 7,
    name: "James Wilson",
    role: "Game Dev",
    avatar: "https://i.pravatar.cc/150?img=4",
    rating: 4,
    comment: "The project-based approach helped me build practical skills that employers are looking for.",
  },
  {
    id: 8,
    name: "Sophia Garcia",
    role: "Cybersecurity",
    avatar: "https://i.pravatar.cc/150?img=10",
    rating: 5,
    comment: "The instructors are industry veterans who provide real-world insights you can't get from textbooks.",
  },
]

// Stats data
const statsData = [
  {
    label: "Students Enrolled",
    value: "10,000+",
    icon: Users,
    color: "bg-custom-primary/10 text-custom-primary",
  },
  {
    label: "Courses Completed",
    value: "25,000+",
    icon: GraduationCap,
    color: "bg-emerald-100 text-emerald-600",
  },
  {
    label: "Satisfaction Rate",
    value: "98%",
    icon: ThumbsUp,
    color: "bg-amber-100 text-amber-600",
  },
  {
    label: "Awards Won",
    value: "15+",
    icon: Award,
    color: "bg-purple-100 text-purple-600",
  },
]

const Review = () => {
  const [activeReview, setActiveReview] = useState<number | null>(null)

  return (
    <div className="w-full min-h-[80dvh] relative flex flex-col justify-center overflow-hidden">
      {/* Background pattern - keeping your original pattern but making it more subtle */}
      <div className="absolute inset-0 bg-white bg-opacity-60 bg-[radial-gradient(#5d8ca2_1px,_transparent_1px),_radial-gradient(#5d8ca2_1px,_white_1px)] bg-[size:40px_40px] bg-[position:0_0,_20px_20px] opacity-20 z-0"></div>

      <div className="w-full h-full py-3 flex flex-col justify-center items-center gap-10">
        {/* Heading */}
        <div className="relative z-10 text-center mb-4">
          <h1 className="text-custom-text/80 text-4xl lg:text-6xl font-bold">
            Our <span className="text-custom-primary">Student</span> Reviews
          </h1>
          <div className="w-20 h-1 bg-custom-primary mx-auto mt-4"></div>
        </div>

        {/* Main content area */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
          {/* Review display area */}
          <div className="w-full h-48 mb-12 flex items-center justify-center">
            {activeReview !== null ? (
              <div className="text-center max-w-2xl transition-all duration-300 animate-fadeIn">
                <div className="flex justify-center mb-3">
                  {Array.from({ length: reviewsData[activeReview].rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-custom-primary text-custom-primary" />
                  ))}
                </div>
                <p className="text-lg text-custom-text/80 italic">"{reviewsData[activeReview].comment}"</p>
                <div className="mt-4">
                  <h3 className="text-custom-primary font-medium">{reviewsData[activeReview].name}</h3>
                  <p className="text-sm text-custom-text/60">{reviewsData[activeReview].role}</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-custom-text/50 animate-fadeIn">
                <p>Hover over a student to see their review</p>
              </div>
            )}
          </div>

          {/* Avatar circles - first row */}
          <div className="flex justify-center flex-wrap gap-8 mb-10">
            {reviewsData.slice(0, 4).map((review, index) => (
              <div
                key={review.id}
                className="relative group"
                onMouseEnter={() => setActiveReview(index)}
                onMouseLeave={() => setActiveReview(null)}
              >
                <div
                  className={cn(
                    "absolute -inset-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100",
                    "bg-gradient-to-r from-custom-primary/10 via-custom-primary/20 to-custom-primary/10",
                  )}
                ></div>
                <div
                  className={cn(
                    "absolute -inset-1 rounded-full transition-all duration-300",
                    activeReview === index
                      ? "bg-custom-primary/20 scale-110"
                      : "bg-transparent group-hover:bg-custom-primary/10 group-hover:scale-105",
                  )}
                ></div>
                <Avatar className="w-20 h-20 border-2 transition-all duration-300 cursor-pointer relative z-10 group-hover:border-custom-primary">
                  <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                  <AvatarFallback className="bg-custom-primary text-white text-xl">
                    {review.name.charAt(0)}
                    {review.name.split(" ")[1]?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full border-2 border-custom-primary/20 flex items-center justify-center text-xs text-custom-primary transition-all duration-300 group-hover:border-custom-primary group-hover:scale-110">
                  {review.rating}
                </div>
              </div>
            ))}
          </div>

          {/* Avatar circles - second row (offset) */}
          <div className="flex justify-center flex-wrap gap-8 ml-9">
            {reviewsData.slice(4, 8).map((review, index) => (
              <div
                key={review.id}
                className="relative group"
                onMouseEnter={() => setActiveReview(index + 4)}
                onMouseLeave={() => setActiveReview(null)}
              >
                <div
                  className={cn(
                    "absolute -inset-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100",
                    "bg-gradient-to-r from-custom-primary/10 via-custom-primary/20 to-custom-primary/10",
                  )}
                ></div>
                <div
                  className={cn(
                    "absolute -inset-1 rounded-full transition-all duration-300",
                    activeReview === index + 4
                      ? "bg-custom-primary/20 scale-110"
                      : "bg-transparent group-hover:bg-custom-primary/10 group-hover:scale-105",
                  )}
                ></div>
                <Avatar className="w-20 h-20 border-2 transition-all duration-300 cursor-pointer relative z-10 group-hover:border-custom-primary">
                  <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                  <AvatarFallback className="bg-custom-primary text-white text-xl">
                    {review.name.charAt(0)}
                    {review.name.split(" ")[1]?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white rounded-full border-2 border-custom-primary/20 flex items-center justify-center text-xs text-custom-primary transition-all duration-300 group-hover:border-custom-primary group-hover:scale-110">
                  {review.rating}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats section */}
        <div className="relative z-10 w-full mt-16 pt-16 border-t border-custom-primary/10">
          <h2 className="text-center text-2xl font-bold text-custom-text/80 mb-10">Our Impact</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
            {statsData.map((stat, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg border border-custom-primary/10 p-6 transition-all duration-300 hover:border-custom-primary/30 hover:-translate-y-1"
              >
                <div
                  className={`absolute top-0 right-0 w-16 h-16 -mr-6 -mt-6 rounded-full ${stat.color} opacity-20 transition-all duration-300 group-hover:opacity-40`}
                ></div>

                <div className="flex items-center mb-4">
                  <div className={`p-2 rounded-lg ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-custom-text mb-1">{stat.value}</h3>
                <p className="text-sm text-custom-text/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Review
