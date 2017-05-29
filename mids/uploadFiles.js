import fs from 'fs';
import path from 'path';
import formidable from 'formidable';
import Config from '../conf';

export default async function uploadFiles(cx,next){
	let {support,uploadedDir} = Config.upload;
	if (!support) return false;
	
	let body = {
		success:true,
		result:'ok'
	}
  	const form = new formidable.IncomingForm();
  	form.uploadDir = uploadedDir;
    try {
    	form.parse(cx.req, (err, fields, files)=> {
    		var files = files.fileupload;
      		fs.rename(files.path,path.resolve(process.cwd(),uploadedDir,Date.now()+'.'+files.size+'.'+files.name));
    	});
    } catch(e) {
    	console.log(e);
    	body={
    		success:false,
			result:e.message
    	}
    }
	cx.response.body=body;
}