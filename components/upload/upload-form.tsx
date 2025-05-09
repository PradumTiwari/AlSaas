'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import BgGradient from '../common/bg-gradient';

import UploadFormInput from './upload-form-input';
import { useUploadThing } from '@/utils/uploadthing';
import { generatePdfSummary } from '@/actions/upload-action';

const UploadForm = () => {
  const [summary,setSummary]=useState("");

  const {startUpload,routeConfig}=useUploadThing('pdfUploader',{
    onClientUploadComplete:()=>{
      alert("Upload complete");
    },
    onUploadError:(error)=>{
      alert(`Error uploading file: ${error.message}`);
    },
    onUploadBegin:(file)=>{
      console.log("Upload has Began for file",file);
      
    }
  })

  const handleSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
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
    
    const uploadResponse=await startUpload([file]);
    if (!uploadResponse || uploadResponse.length === 0) {
      alert('Upload failed');
      return;
    }

    const fileUrl=uploadResponse[0].ufsUrl;
    console.log("File URL",fileUrl);
    const summary=await generatePdfSummary(uploadResponse);
    console.log("Summary Of data is",summary);
    console.log("Type of SUmmary",typeof summary);
    
    const res=await fetch("/api/gemini-summary",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",

      },
      body:JSON.stringify({
       
        text:summary.data
      })
   
    })
   console.log("Response of the Backedn",res);
   
    const result=await res.text();

  console.log("Summary from backend: Pradumaaa", result);

    const data=result
   setSummary(data);
  }
  return (
  <>
    {!summary ? (
      <UploadFormInput onSubmit={handleSubmit} />
    ) : (
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold">Summary:</h2>
        <p>{summary}</p>
        <Button onClick={() => setSummary("")} className="mt-4">Upload Another</Button>
      </div>
    )}
  </>
);

};

export default UploadForm;
