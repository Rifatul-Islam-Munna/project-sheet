import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Code, Calculator, FlaskConical, Globe, Microscope, GraduationCap, School } from "lucide-react"

const CategoryExplorer = () => {
  const educationLevels = [
    {
      title: "School & College",
      icon: <School className="h-10 w-10 text-blue-600" />,
      description: "Elementary to Higher Secondary Education",
      border: "border-blue-300",
      background: "bg-blue-300/10",
      categories: [
        {
          name: "Class 6",
          icon: <BookOpen className="h-6 w-6 text-blue-600" />,
          description: "Mathematics, Science, Language Arts",
          url: "/subject/class-6",
          border: "border-blue-200",
          background: "bg-blue-200/10",
        },
        {
          name: "Class 7",
          icon: <Calculator className="h-6 w-6 text-blue-600" />,
          description: "Algebra, Biology, Literature",
          url: "/subject/class-7",
          border: "border-blue-200",
          background: "bg-blue-200/10",
        },
        {
          name: "Class 8",
          icon: <FlaskConical className="h-6 w-6 text-blue-600" />,
          description: "Chemistry, Geometry, History",
          url: "/subject/class-8",
          border: "border-blue-200",
          background: "bg-blue-200/10",
        },
        {
          name: "Class 9-10",
          icon: <Globe className="h-6 w-6 text-blue-600" />,
          description: "Physics, Calculus, Foreign Languages",
          url: "/subject/class-9",
          border: "border-blue-200",
          background: "bg-blue-200/10",
        },
        {
          name: "Class 11",
          icon: <Microscope className="h-6 w-6 text-purple-600" />,
          description: "Science, Arts, Commerce Streams",
          url: "/college",
          border: "border-purple-200",
          background: "bg-purple-200/10",
        },
        {
          name: "Class 12",
          icon: <Code className="h-6 w-6 text-purple-600" />,
          description: "Board Exams, College Preparation",
          url: "/college",
          border: "border-purple-200",
          background: "bg-purple-200/10",
        },
      ],
    },
    {
      title: "University",
      icon: <GraduationCap className="h-10 w-10 text-green-600" />,
      description: "Graduate and post-graduate programs",
      border: "border-green-300",
      background: "bg-green-300/10",
      categories: [
        {
          name: "Year 1",
          icon: <BookOpen className="h-6 w-6 text-green-600" />,
          description: "Foundation courses and core subjects",
          url: "/university/year-1",
          border: "border-green-200",
          background: "bg-green-200/10",
        },
        {
          name: "Year 2",
          icon: <FlaskConical className="h-6 w-6 text-green-600" />,
          description: "Specialized courses and research methods",
          url: "/university/year-2",
          border: "border-green-200",
          background: "bg-green-200/10",
        },
        {
          name: "Year 3",
          icon: <Microscope className="h-6 w-6 text-green-600" />,
          description: "Advanced topics and thesis preparation",
          url: "/university/year-3",
          border: "border-green-200",
          background: "bg-green-200/10",
        },
        {
          name: "Year 4",
          icon: <GraduationCap className="h-6 w-6 text-green-600" />,
          description: "Final year projects and specializations",
          url: "/university/year-4",
          border: "border-green-200",
          background: "bg-green-200/10",
        },
      ],
    },
  ]

  return (
    <div className="w-full bg-gradient-to-b from-custom-background to-custom-background/50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl tracking-normal md:text-6xl font-bold mb-3 text-custom-text/90">
            Explore By Education Level
          </h2>
          <p className="text-gray-500 max-w-2xl text-sm md:text-lg mx-auto">
            Find courses tailored to your educational journey, from elementary school to university.
          </p>
        </div>

        <div className="space-y-16">
          {educationLevels.map((level, levelIndex) => (
            <div key={levelIndex} className="mb-12">
              <div className="flex items-center gap-4 mb-8">
                <div className={`${level.background} ${level.border} p-3 rounded-full`}>{level.icon}</div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-800">{level.title}</h3>
                  <p className="text-gray-500">{level.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {level.categories.map((category, index) => (
                  <Link href={category.url} key={index}>
                    <Card
                      className={`overflow-hidden border ${level.border} rounded-lg shadow-none hover:shadow-md transition-all bg-gradient-to-tr from-custom-background/20 to-custom-background/30 duration-300 ease-in-out cursor-pointer h-full`}
                    >
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <div className={`mb-4 ${category.background} ${category.border} p-3 rounded-full`}>
                            {category.icon}
                          </div>
                          <h3 className="font-bold text-xl mb-2 text-gray-700">{category.name}</h3>
                          <p className="text-sm text-gray-500">{category.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryExplorer
