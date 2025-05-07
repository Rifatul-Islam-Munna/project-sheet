
import { Card } from "@/components/ui/card"
import SubjectSection from "../classCunks/SubjectSection"


 const mockSubjectsData = [
  {
    _id: "subj1",
    className: "Class 10",
    subjectName: "Mathematics",
    Topic: 12,
    subTopic: 36,
    time: 180 // in minutes
  },
  {
    _id: "subj2",
    className: "Class 9",
    subjectName: "Science",
    Topic: 10,
    subTopic: 28,
    time: 160
  },
  {
    _id: "subj3",
    className: "Class 8",
    subjectName: "History",
    Topic: 8,
    subTopic: 20,
    time: 120
  },
  {
    _id: "subj4",
    className: "Class 10",
    subjectName: "English",
    Topic: 15,
    subTopic: 45,
    time: 200
  },
  {
    _id: "subj5",
    className: "Class 7",
    subjectName: "Geography",
    Topic: 9,
    subTopic: 22,
    time: 140
  }
];


export default function Home() {
  

  return (
    <main>
     <div className="w-full bg-gradient-to-b from-gray-50 to-white py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm font-medium mb-3">
            Featured Courses
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-custom-text mb-4">Most Popular Courses</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our highest-rated and most popular learning experiences
          </p>
        </div>

      
         <SubjectSection subjectData={mockSubjectsData}/>
        

       
      </div>
    </div>
    </main>
  )
}
