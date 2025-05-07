export interface Subject {
    _id: string;
    className: string;
    subjectName: string;
    Topic: number;
    subTopic: number;
    time: number;
  }
  
  export interface SubjectDataResponse {
    message: string;
    data: Subject[];
  }
  


  export interface ClassData {
    _id: string;
    className: string;
    division: "science" | "arts" | "commerce";
  }
  
  export interface ApiResponseClassData {
    message: string;
    data: ClassData[];
  }

  export interface classDataCard {
      _id: string;
      imageUrl: string;
      title: string;
      desc: string;
      className: string;
      base: string;
      division: string;
      subject: string;
      year: string;
      __v: number;
   
  }
  export interface ApiResponseClassDataCard {
    message: string;
    data: classDataCard[];
  }
  







  export interface SubTopic {
    name: string;
    key: string;
    _id: string;
  }
  
  export interface Topic {
    _id: string;
    topicName: string;
    SubTopic: SubTopic[];
  }
  
  export interface ApiResponse {
    message: string;
    data: Topic[];
  }








  export interface ContentData {
    _id: string;
    subTopicId: string;
    description: string;
    isPreview: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
 export interface ApiResponseForContent {
    message: string;
    data: ContentData;
  }















  interface SubjectData {
    _id: string;
    className: string;
    subjectName: string;
    Topic: number;
    subTopic: number;
    time: number;
  }
  
  export interface SubjectResponse {
    message: string;
    data: SubjectData[];
  }
  