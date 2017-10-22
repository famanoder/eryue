import fs from 'fs';
import path from 'path';
import formidable from 'formidable';
import Config from '../conf';

export default async function uploadFiles(cx,next){
  let {support,uploadedDir} = Config.upload;
  if (!support) return false;
  
  const form = new formidable.IncomingForm();
  form.uploadDir = uploadedDir;
  form.keepExtensions = true;
  
  async function upload(){
    
    return new Promise((a,b)=>{
      try {
        form.parse(cx.req, (err, fields, files)=> {
          var files = files.fileupload;
          a(files);
        });
      } catch(e) {
        console.log(e);
        b(e);
      }  
    });
  }
  let files=await upload();
  return files;
}