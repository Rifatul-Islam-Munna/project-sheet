"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { Eye, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { postForMyDocument } from '@/actions/server/ForClass'
import { toast } from 'sonner'

const BuyButton = ({subjectId,isview}:{subjectId:string,isview?:boolean}) => {
  const {mutate,isPending} = useMutation({
    mutationKey: ['postNewContent'],
    mutationFn:()=>postForMyDocument(subjectId),
    onSuccess:()=>{
      toast.success("Purchased successfully")
    },
    onError:(error)=>{
      toast.error(error.message)
    }
  })
    const router  = useRouter()
    const handelBuyOrPush = ()=>{
      if(isview){
        router.push(`/notes?subjectId=${subjectId}`)
      }else{
        mutate()
      }
    }
  return (
    <Button onClick={handelBuyOrPush} className= "bg-custom-primary/80 hover:bg-custom-primary">
      {
        isview ? (
          <span className=' flex justify-center items-center gap-1'>View <Eye className="ml-2 h-4 w-4" /></span>
        ):(
          <span className=' flex justify-center items-center gap-1'>    Buy <Lock className="ml-2 h-4 w-4" /></span>
      
        )
      }
  
   </Button>
  )
}

export default BuyButton