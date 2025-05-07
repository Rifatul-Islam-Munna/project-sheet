import { Button } from '@/components/ui/button'
import React from 'react'
import Image from 'next/image'
import SmallCardSticky from './SmallCardSticky'
import { ArrowUpRight, Calendar } from 'lucide-react'
import { WordRotate } from '@/components/magicui/word-rotate'
const Hero = () => {
  
  return (
    <section className=' min-h-dvh overflow-y-hidden lg:h-dvh w-full py-4 md:py-0 bg-custom-background  '>
        <div  className='  h-full container mx-auto grid lg:grid-cols-2 justify-center items-center'>
            <div className=' w-full py-10 lg:py-0 flex flex-col justify-center lg:justify-start items-start lg:items-start gap-5'>
                <h1 className=' text-5xl  capitalize tracking-wide font-bold sm:text-6xl  xl:text-7xl text-custom-text/90'> <WordRotate words={[" Learn Easier","Learn Smarter","Learn Better","Learn Faster"]}  className=' text-custom-primary/80 w-full'/> Way rather then Watching class</h1>
              <Button variant={"ghost"} className=' text-gray-50 mt-4 flex justify-center items-center gap-2 group hover:text-gray-100  px-10 py-6  text-sm bg-gradient-to-br from-custom-primary/80 to-custom-primary'>Start Today <ArrowUpRight className=' group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300' /></Button>
            </div>
            <div className=' -order-1  lg:order-1 w-full relative flex justify-center items-center'>
              <SmallCardSticky color='bg-cyan-500' Heading='Upcoming Class' content=' Join Our Class an explore  more' Icon={Calendar } ClassName=' absolute left-3 top-[30%] bg-white z-1 select-none pointer-events-none'/>
              <SmallCardSticky color='bg-cyan-500' Heading='Upcoming Class' content=' Join Our Class an explore  more' Icon={Calendar } ClassName=' absolute backdrop-blur-3xl right-0 top-[50%] bg-white z-1 select-none pointer-events-none'/>
              
              <Image src={'/artist.png'} loading='lazy' className=' relative   h-[600px] lg:h-[700px] ' width={1200} height={1200} alt='artist'/>
            </div>

        </div>

    </section>
  )
}

export default Hero