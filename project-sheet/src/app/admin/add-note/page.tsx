"use client"
import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import "jodit";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { useNote } from "@/zustan/notes";
import { useRouter } from "next/navigation";
import { useQuery,useQueryClient ,useMutation} from "@tanstack/react-query";
import { className, ContentPost, getClassNameBasedOnBaseName, getMainAndSubTopicFromOneEndPoint, NewTopicType, postClassName, postNewContent, PostNewSubTopic, postNewSubTopic, postNewTopic } from "@/actions/server/ForClass";
import { toast } from "sonner"
import { ResponseClass } from "@/@types/ClassType";
import { getSubjectForAdmin, PayloadForNewSubject, postNewSubject } from "@/actions/server/ForSubject";
import ImageUploadDialog from "@/components/custom/copyImageUrl/ImageUploadDialog";
import UploadTooltip from "@/components/custom/copyImageUrl/UploadTooltip";

const Editor: React.FC = () => {
  const editor = useRef<any>(null);
  const [title, setTitle] = useState("");
  const [selectBase, SetSelectBase] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedMainTopic, setSelectedMainTopic] = useState("");
  const [selectedSubTopic, setSelectedSubTopic] = useState("");
  const router = useRouter()
  // Example data - in a real app, these would come from your backend
  const [selectSubject, setSelectSubject] = useState('');
  const [mainTopics, setMainTopics] = useState(["Mathematics", "Science", "History", "English"]);
  const [subTopics, setSubTopics] = useState(["Algebra", "Geometry", "Chemistry", "Physics", "Ancient History"]);
  
  // States for new item dialogs
  const [newClass, setNewClass] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newMainTopic, setNewMainTopic] = useState("");
  const [newSubTopic, setNewSubTopic] = useState("");
  const [isClassDialogOpen, setIsClassDialogOpen] = useState(false);
  const [isMainTopicDialogOpen, setIsMainTopicDialogOpen] = useState(false);
  const [isSubTopicDialogOpen, setIsSubTopicDialogOpen] = useState(false);
 const {setNoted} = useNote((state)=>state)
  const [selectDivision,setSelectDivision] = useState('')


  const [year,setYear] = useState('')

  const [selectDivisionForSearch,setSelectDivisionForSearch] = useState('')

 const [selectYearForSearch,setSelectYearForSearch] = useState('')


  const queryClient = useQueryClient()

const {data:ClassData,error,refetch:SchoolDataRefetch} = useQuery({
  queryKey:['get-school-name-based-on-name',selectBase,selectDivisionForSearch,selectYearForSearch],
  queryFn:()=>getClassNameBasedOnBaseName(selectBase,selectDivisionForSearch,selectYearForSearch),
  enabled:  selectBase.trim().length > 0,
  staleTime:600,

  
  
})
const {data:SubjectData} = useQuery({
 queryKey:["get-subject-data",selectedClass],
 queryFn:()=>getSubjectForAdmin(selectedClass),
 enabled:selectedClass.length > 0,
 staleTime:3600
})
const {data:GetDataForTopic,isLoading:isLoadingForTopic,refetch:GetDataForTopicRefetch} = useQuery({
  queryKey:['get-Main-and-sub-topic-from-one-end-point',selectSubject],
  queryFn:  ()=>getMainAndSubTopicFromOneEndPoint(selectSubject),
  enabled:selectSubject.length > 0,
 
})

const {mutate:PostClass,isPending:IsPostClassLoading} = useMutation({
  mutationKey:['post-new-class'],
  mutationFn:(payload:className)=>postClassName(payload),
  onSuccess:()=>{
    toast("New class added successful")
    SchoolDataRefetch()
    setIsClassDialogOpen(false)
    queryClient.refetchQueries({queryKey:["get-school-name-based-on-name"],exact:false})
  },
  onError:(error)=>{
    console.log(`error in posting class`,error)
    toast(error.message)
  }
})

 const {mutate:PostNewSubject,isPending:isSubjectPending} = useMutation({
  mutationKey:['post-new-class'],
  mutationFn:(payload:PayloadForNewSubject)=>postNewSubject(payload),
  onSuccess:()=>{
    toast("New Subject added successful")
    SchoolDataRefetch()
    setIsClassDialogOpen(false)
    queryClient.refetchQueries({queryKey:["get-subject-data"],exact:false})
  },
  onError:(error)=>{
    console.log(`error in posting class`,error)
    toast(error.message)
  }
 })

 const {mutate:PostForNewTopic,isPending:IsPostingNewTopic} = useMutation({
  mutationKey:['post-new-topic-name'],
  mutationFn:(payload:NewTopicType)=>postNewTopic(payload),
  onSuccess:()=>{
    toast("New Topic added successful")
  
    setNewMainTopic("");
    setIsMainTopicDialogOpen(false);
    GetDataForTopicRefetch()
  },
  onError:(error)=>{
    console.log(`error in posting class`,error)
    toast(error.message)
  }
 })
 const {mutate:PostNewSubTopic,isPending:IsSubTopicPending} = useMutation({
  mutationKey:['post-new-topic-name'],
  mutationFn:(payload:PostNewSubTopic)=>postNewSubTopic(payload),
  onSuccess:()=>{
    toast("New Sub-Topic added successful")
  
    setNewSubTopic("");
    setIsSubTopicDialogOpen(false);
    GetDataForTopicRefetch()
  },
  onError:(error)=>{
    console.log(`error in posting class`,error)
    toast(error.message)
  }
 })

const handelPostNewSubject = ()=>{
 const findOneClass = ClassData?.data?.data.find((item)=>item._id === selectedClass)
 if(!findOneClass )  {
  return toast("class not found")
 }
 if(newSubject.length < 3){
  return toast("Subject Name should be at least 3 letter")
 }
 const payload:PayloadForNewSubject ={
  classId:findOneClass?._id as string,
  className:findOneClass.className,
  subjectName:newSubject
 }
 PostNewSubject(payload)
}
 const {mutate:PostNewContent,isPending:IsNewContentPosting} = useMutation({
  mutationKey:['post-new-content'],
  mutationFn:(payload:ContentPost) =>postNewContent(payload),
  onSuccess:()=>{
    toast("New content Posted")
    editor.current.value = "";
  
    
  },
  onError:(error)=>{
    console.log(`error in posting class`,error)
    toast(error.message)
  }
 })

  const getEditorContent = () => {
    if (editor.current) {
      const content = editor.current.value;
      
      
      setNoted(content)
      const payload ={
        subTopicId:selectedSubTopic,
        description:content
      }
      console.log(content)
      //PostNewContent(payload)
      // Here you would send the data to your backend
    }
  };
  

  const handleAddClass = () => {
    const payload:className ={
      imageUrl:'',
      title: newClass,
      desc:"test",
      className:newClass.split(" ").join("-"),
      base:selectBase,
      division:selectDivision.length > 2 ? selectDivision as  "science" : "science" ,
      year:year,
      subject: selectBase === "university" ? newClass.toLowerCase() : undefined

    }
    PostClass(payload)
  };
  
 
  const handleAddMainTopic = () => {
    if (newMainTopic.trim()) {
      const payload ={
        subjectId:selectSubject,
        topicName:newMainTopic
      }
      PostForNewTopic(payload)
    }
  };
  
  const handleAddSubTopic = () => {
    if (newSubTopic.trim()) {
     const findTopic = GetDataForTopic?.data?.find((item)=>item._id ===selectedMainTopic )
     const payload= {
     
      id:selectedMainTopic,
      SubTopic:[ ...(findTopic?.SubTopic ?? []),{
        name:newSubTopic
      }],
     }
     PostNewSubTopic(payload)
    }
  };


 

  return (
    <div className="w-full min-h-dvh flex flex-col bg-gray-50 p-4">
      <div className="bg-white rounded-lg p-4 mb-4">
        <div className="flex flex-col w-full  md:flex-row md:items-center justify-between gap-4 mb-4">
          <div className="flex-grow grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          <Select value={selectBase} onValueChange={SetSelectBase} >
                <SelectTrigger id="class-select" className="w-full  shadow-none">
                  <SelectValue placeholder="Select Base School" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    
                      <SelectItem  value={'school'}>
                        School
                      </SelectItem>
                      <SelectItem  value={'collage'}>
                        Collage
                      </SelectItem>
                      <SelectItem  value={'university'}>
                        University
                      </SelectItem>
                    
                  </SelectGroup>
                </SelectContent>
              </Select>


        {["collage","university"].includes(selectBase) && 
         <Select value={selectDivisionForSearch} onValueChange={setSelectDivisionForSearch} >
         <SelectTrigger id="class-select" className="w-full  shadow-none">
           <SelectValue placeholder="select Division" />
         </SelectTrigger>
         <SelectContent>
           <SelectGroup>
             
               <SelectItem  value={'science'}>
               Science
               </SelectItem>
               <SelectItem  value={'arts'}>
                 Humanity
               </SelectItem>
               <SelectItem  value={'commerce'}>
               Commerce
               </SelectItem>
             
           </SelectGroup>
         </SelectContent>
       </Select>
        }     

{selectBase === "university" && <Select value={selectYearForSearch} onValueChange={setSelectYearForSearch} >
                <SelectTrigger id="class-select" className="w-full  shadow-none">
                  <SelectValue placeholder="select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    
                      <SelectItem  value={'year-1'}>
                      Year 1
                      </SelectItem>
                      <SelectItem  value={'year-2'}>
                      Year 2
                      </SelectItem>
                      <SelectItem  value={'year-3'}>
                      Year 3
                      </SelectItem>
                      <SelectItem  value={'year-4'}>
                      Year 4
                      </SelectItem>
                    
                  </SelectGroup>
                </SelectContent>
              </Select>  }  

          </div>
          
          <Button 
            size="lg" 
            onClick={getEditorContent}
            className=" bg-custom-primary/80 hover:bg-custom-primary  text-white"
            disabled={IsNewContentPosting}

          >
            {
              IsNewContentPosting && <Loader2 className="animate-spin mr-2"/> 
            }
            Save Note
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Class Select */}
          <div>
            <Label htmlFor="class-select" className="text-sm font-medium mb-1 block">Class</Label>
            <div className="flex gap-2">
              <Select disabled={!ClassData?.data?.data}  value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger id="class-select" className="w-full  shadow-none">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {ClassData?.data?.data.map((cls) => (
                      <SelectItem key={cls._id} value={cls._id}>
                        {cls.className}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <Dialog open={isClassDialogOpen} onOpenChange={setIsClassDialogOpen}>
                <DialogTrigger asChild>
                  <Button disabled={!ClassData?.data} variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Class</DialogTitle>
                    <DialogDescription>
                      Enter the name of the new class you want to add.
                    </DialogDescription>
                  </DialogHeader>
                  <div className=" flex flex-col justify-center items-center gap-4">

                  
                  <Input
                    value={newClass}
                    onChange={(e) => setNewClass(e.target.value)}
                    placeholder="Enter new class name"
                  />

      {["collage","university"].includes(selectBase) && <Select value={selectDivision} onValueChange={setSelectDivision} >
                <SelectTrigger id="class-select" className="w-full  shadow-none">
                  <SelectValue placeholder="select Division" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    
                      <SelectItem  value={'science'}>
                      Science
                      </SelectItem>
                      <SelectItem  value={'arts'}>
                        Humanity
                      </SelectItem>
                      <SelectItem  value={'commerce'}>
                      Commerce
                      </SelectItem>
                    
                  </SelectGroup>
                </SelectContent>
              </Select>  } 
     


    {selectBase === "university" && <Select value={year} onValueChange={setYear} >
                <SelectTrigger id="class-select" className="w-full  shadow-none">
                  <SelectValue placeholder="select Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    
                      <SelectItem  value={'year-1'}>
                      Year 1
                      </SelectItem>
                      <SelectItem  value={'year-2'}>
                      Year 2
                      </SelectItem>
                      <SelectItem  value={'year-3'}>
                      Year 3
                      </SelectItem>
                      <SelectItem  value={'year-4'}>
                      Year 4
                      </SelectItem>
                    
                  </SelectGroup>
                </SelectContent>
              </Select>  }   
  

 

                  </div>
                  <DialogFooter>
                    <Button disabled={IsPostClassLoading} onClick={handleAddClass}> {IsPostClassLoading && <Loader2 className=" animate-spin"/>} Add Class</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Select Subject */}
          <div>
            <Label htmlFor="class-select" className="text-sm font-medium mb-1 block">Subject</Label>
            <div className="flex gap-2">
              <Select disabled={!ClassData?.data?.data} value={selectSubject} onValueChange={setSelectSubject} >
                <SelectTrigger id="class-select" className="w-full  shadow-none">
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {SubjectData?.data?.map((cls) => (
                      <SelectItem key={cls._id} value={cls._id}>
                        {cls.subjectName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <Dialog >
                <DialogTrigger asChild>
                  <Button disabled={!ClassData?.data?.data} variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Subject</DialogTitle>
                    <DialogDescription>
                      Enter the name of the Subject you want to add
                    </DialogDescription>
                  </DialogHeader>
                  <Input
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder="Enter new Subject Name"
                  />
                  <DialogFooter>
                    <Button onClick={handelPostNewSubject} >{isSubjectPending && <Loader2 className=" animate-spin"/>} Add Class</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          {/* Main Topic Select */}
          <div>
            <Label htmlFor="main-topic-select" className="text-sm font-medium mb-1 block">Main Topic</Label>
            <div className="flex gap-2">
              <Select value={selectedMainTopic} onValueChange={setSelectedMainTopic}>
                <SelectTrigger id="main-topic-select" className="w-full  shadow-none">
                  <SelectValue placeholder="Select Main Topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {GetDataForTopic?.data?.map((topic) => (
                      <SelectItem key={topic._id} value={topic._id}>
                        {topic.topicName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <Dialog open={isMainTopicDialogOpen} onOpenChange={setIsMainTopicDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Main Topic</DialogTitle>
                    <DialogDescription>
                      Enter the name of the new main topic you want to add.
                    </DialogDescription>
                  </DialogHeader>
                  <Input
                    value={newMainTopic}
                    onChange={(e) => setNewMainTopic(e.target.value)}
                    placeholder="Enter new main topic name"
                  />
                  <DialogFooter>
                    <Button disabled={IsPostingNewTopic} onClick={handleAddMainTopic}>{IsPostingNewTopic && <Loader2 className=" animate-spin"/>} Add Topic</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          {/* Sub Topic Select */}
          <div>
            <Label htmlFor="sub-topic-select" className="text-sm font-medium mb-1 block">Sub Topic</Label>
            <div className="flex gap-2">
              <Select value={selectedSubTopic} onValueChange={setSelectedSubTopic}>
                <SelectTrigger id="sub-topic-select" className="w-full  shadow-none">
                  <SelectValue placeholder="Select Sub Topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {GetDataForTopic?.data?.find((item) => item._id === selectedMainTopic)?.SubTopic.map((topic) => (
                      <SelectItem key={topic._id} value={topic._id}>
                        {topic.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <Dialog open={isSubTopicDialogOpen} onOpenChange={setIsSubTopicDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Plus className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Sub Topic</DialogTitle>
                    <DialogDescription>
                      Enter the name of the new sub topic you want to add.
                    </DialogDescription>
                  </DialogHeader>
                  <Input
                    value={newSubTopic}
                    onChange={(e) => setNewSubTopic(e.target.value)}
                    placeholder="Enter new sub topic name"
                  />
                  <DialogFooter>
                    <Button disabled={IsSubTopicPending} onClick={handleAddSubTopic}> {IsSubTopicPending && <Loader2 className=" animate-spin"/>} Add Topic</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-grow bg-white  overflow-hidden">
        <div className=" w-full flex justify-start items-center my-3">

        <ImageUploadDialog/>
        <UploadTooltip/>
        </div>
        <JoditEditor
          ref={editor}
          config={{
            toolbar: true,
           
            askBeforePasteFromWord: true,
            language: "en",
            toolbarSticky: true,
            askBeforePasteHTML: true,
            showTooltip: true,
            showXPathInStatusbar: false,
            showCharsCounter: true,
            showWordsCounter: true,
            height: "65dvh",
            autofocus: true,
            spellcheck: true,
            enableDragAndDropFileToEditor: true,
            useSearch: true,
            statusbar: false,
            placeholder: "Write your note here",
            events:{
              
            }
          }}
        />
      </div>
    </div>
  );
};

export default Editor;