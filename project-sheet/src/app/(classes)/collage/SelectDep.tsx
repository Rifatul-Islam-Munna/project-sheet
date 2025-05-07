"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"

export function SelectDep() {
    const router = useRouter()
    const HandelPushToUrl = (value:string)=>{
     const Present = new URLSearchParams(window.location.search)
     Present.set("department",value)
     router.push(window.location.pathname+"?"+Present.toString())
    }
  return (
    <Select defaultValue="science" onValueChange={HandelPushToUrl}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Department" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>department</SelectLabel>
          <SelectItem value="science">Science</SelectItem>
        
          <SelectItem value="arts">Humanity</SelectItem>
          <SelectItem value="commerce">commerce</SelectItem>
         
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
