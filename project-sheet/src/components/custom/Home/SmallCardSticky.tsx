import { cn } from '@/lib/utils'
import React from 'react'

const SmallCardSticky = ({Heading,content,Icon,color,ClassName}:{Heading:string,content:string,Icon:React.JSX.ElementType,color:string,ClassName:string}) => {
  return (
    <div className={cn(' w-fit px-4  py-4 backdrop-blur-2xl gap-3 rounded-lg  bg-gradient-to-r from-white to-gray-100 shadow-sm flex justify-between items-center',ClassName)}>
    <div className= {`${color} text-gray-50 rounded-md p-2 `}>
        <Icon size={25}/>
    </div>
    <div className=' flex flex-col justify-center items-start'>
        <h1 className=' text-sm text-gray-600 font-normal'>{Heading}</h1>
        <p className=' text-xs text-gray-400'>{content}</p>
    </div>

    </div>
  )
}

export default SmallCardSticky