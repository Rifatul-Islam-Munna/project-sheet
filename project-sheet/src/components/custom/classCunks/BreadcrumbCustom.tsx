import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import React from 'react'
type BreadcrumbData = {
    
        name: string;
        href?: string;
    
}
const BreadcrumbCustom = ({BreadcrumbData}:{BreadcrumbData:BreadcrumbData[]}) => {
  return (
         <Breadcrumb className="mb-4 text-custom-text/90">
     <BreadcrumbList>
       {BreadcrumbData && BreadcrumbData.map((item, index) => (
         <React.Fragment key={index}>
           <BreadcrumbItem>
             <BreadcrumbLink href={item.href}>{item.name}</BreadcrumbLink>
           </BreadcrumbItem>
           {index !== BreadcrumbData.length - 1 && (
             <BreadcrumbSeparator />
           )}
         </React.Fragment>
       ))}
     </BreadcrumbList>
   </Breadcrumb>
  )
}

export default BreadcrumbCustom