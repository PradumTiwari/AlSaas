'use client';
import React from 'react';
import { Button } from '../ui/button';
import BgGradient from '../common/bg-gradient';
import Uploadforminput from './upload-form-input';
import UploadFormInput from './upload-form-input';

const UploadForm = () => {
  const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log("Sumitted");
    const formData=new FormData(e.currentTarget);
    const file=formData.get('file') as File;

    //Starts validating the file
    if(!file){
      alert("Please upload a file");
      return;
    }
    if(file.size>10*1024*1024){
      alert("File size exceeds 10MB");
      return;
    }
    if(file.type!=='application/pdf'){
      alert("Please upload a pdf file");
      return;
    }
    //upload the file to uploadThing
    //parse the pdf using LangChain and pdf-parse
    //summaris the pdf using openAi or gemmini
    //store the summary in the database
    //display the summary to the user
    
  }
  return (
    <UploadFormInput onSubmit={handleSubmit} />
  );
};

export default UploadForm;
