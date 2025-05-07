import React from 'react'

const layout = ({
    children,
    note
  }: {
    children: React.ReactNode
    note:React.ReactNode
  }) => {
  return (
    <div className=' w-full flex justify-center items-start '>
     {children}
     {note}
    </div>
  )
}

export default layout