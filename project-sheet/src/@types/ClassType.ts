interface Class {
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
  
  export interface ResponseClass {
    message: string;
    data: Class[];
    error:string
  }
  