"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { School, Home, User, BookOpen, GraduationCap, LogIn } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { getToken } from "@/actions/auth"

// School classes data
const schoolClasses = [
  {
    title: "Class 6",
    href: "/subject/class-6",
    description: "Foundation learning for young students starting their academic journey.",
  },
  {
    title: "Class 7",
    href: "/subject/class-7",
    description: "Building on foundations with more advanced concepts across all subjects.",
  },
  {
    title: "Class 8",
    href: "/subject/class-8",
    description: "Transitional year preparing students for higher-level academic challenges.",
  },
  {
    title: "Class 9",
    href: "/subject/class-9",
    description: "Preparing for board examination with focused subject specialization.",
  },
  {
    title: "Class 10",
    href: "/subject/class-9",
    description: "Final year of secondary education with comprehensive board exam preparation.",
  },
]

// College classes data
const collegeClasses = [
  {
    title: "Class 11",
    href: "/collage",
    description: "First year of higher secondary with stream specialization and focused learning.",
  },
  {
    title: "Class 12",
    href: "/collage",
    description: "Final year of higher secondary with board examination and college entrance preparation.",
  },
]

// University years data
const universityYears = [
  {
    title: "1st Year",
    href: "/university/year-1",
    description: "Foundation year of undergraduate education with core subject introduction.",
  },
  {
    title: "2nd Year",
    href: "/university/year-2",
    description: "Building on fundamentals with more specialized coursework and projects.",
  },
  {
    title: "3rd Year",
    href: "/university/year-3",
    description: "Advanced studies with specialized electives and research opportunities.",
  },
  {
    title: "4th Year",
    href: "/university/year-4",
    description: "Final year focused on capstone projects, research, and career preparation.",
  },
]

export function EducationalNavbar() {
  const [token, setToken] = React.useState<string | undefined>(undefined);
  const router = useRouter();
  React.useEffect(() => {
    const fetchToken = async () => {
      const { access_token } = await getToken();
      setToken(access_token);
    };

    fetchToken();
  }, []);
  return (
    <div className="w-full  shadow-none">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center text-custom-primary justify-center gap-2">
          <BookOpen className="h-6 w-6  " />
          <span className="font-bold text-xl  ">EduPortal</span>
        </div>

        {/* Navigation Menu */}
        <NavigationMenu className="shadow-none hidden md:block">
          <NavigationMenuList  className="shadow-none">
            {/* Home */}
            <NavigationMenuItem className=" text-gray-800 bg-orange-50">
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            
            {/* School */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <School className="h-4 w-4 mr-2" />
                School
              </NavigationMenuTrigger>
              <NavigationMenuContent className=" shadow-none">
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {schoolClasses.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                    >
                      <Link href={item.href}>
                      {item.description}
                      </Link>
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            {/* College */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <GraduationCap className="h-4 w-4 mr-2" />
                College
              </NavigationMenuTrigger>
              <NavigationMenuContent className=" shadow-none">
                <ul className="grid w-[600px] gap-3 p-4">
                  {collegeClasses.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            {/* University */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <BookOpen className="h-4 w-4 mr-2" />
                University
              </NavigationMenuTrigger>
              <NavigationMenuContent className=" shadow-none">
                <ul className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
                  {universityYears.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            {/* About Us */}
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <User className="h-4 w-4 mr-2" />
                  About Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Login Button */}
        {
           token ? (
            <Button onClick={() => router.push("/profile")} className=" flex justify-center items-center gap-1 bg-gradient-to-br from-custom-primary/80 to-custom-primary text-white">Profile <User /></Button>
           ):(
            <Button onClick={() => router.push("/login")} size={"lg"} className="flex text-xs items-center gap-2  bg-gradient-to-br from-custom-primary/80 to-custom-primary text-white px-6 py-2 ">
            <LogIn  size={18}  />
            Login
          </Button>
           )
        }
      
      </div>
    </div>
  )
}

// ListItem component (same as the example)
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none hover:bg-custom-background no-underline outline-none transition-colors focus:bg-accent focus:text-accent-foreground text-custom-text",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none ">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default EducationalNavbar