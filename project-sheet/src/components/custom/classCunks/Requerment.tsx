import { BarChart } from 'lucide-react'
import React from 'react'
import { subjectsData } from './SubjectSection'

const Requerment = ({subjectData}:{subjectData:subjectsData}) => {
  return (
     <div className="mb-12">
    <h2 className="text-2xl font-bold mb-6 flex items-center">
      <BarChart className="mr-2 h-6 w-6 text-custom-primary" />
      Subject Requirements
    </h2>
    
    <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
      <ul className="space-y-4">
        {subjectData?.requirements?.map((requirement, index) => (
          <li key={index} className="flex items-start">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-custom-primary/20 dark:bg-indigo-900 text-custom-primary dark:text-indigo-300 flex items-center justify-center mr-3 mt-0.5">
              {index + 1}
            </div>
            <div>{requirement}</div>
          </li>
        ))}
      </ul>
    </div>
  </div>
  )
}

export default Requerment