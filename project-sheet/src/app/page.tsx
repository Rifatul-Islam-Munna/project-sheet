import CategoryExplorer from "@/components/custom/Home/CategoryExplorer";
import CoachingSection from "@/components/custom/Home/CoachingSection";
import Hero from "@/components/custom/Home/Hero";
import PopularCoursesSection from "@/components/custom/Home/PopularCoursesSection";
import Review from "@/components/custom/Home/Review";
import StatsSection from "@/components/custom/Home/State";
import TeachersSection from "@/components/custom/Home/TeachersSection";
import Image from "next/image";

export default function Home() {
  return (
    <main className=" w-full ">
     <Hero/>
     <CategoryExplorer/>
     <CoachingSection/>
     <TeachersSection/>
     <PopularCoursesSection/>
     <Review/>
     <StatsSection/>
    </main>
  );
}
