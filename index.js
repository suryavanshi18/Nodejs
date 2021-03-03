const http=require('http');
const fs=require('fs');
const path=require('path');

const hostname="localhost";
const port=3000;

const server=http.createServer((req,res)=>{
    //console.log(req.headers);
    console.log('Request for '+req.url+'by method '+req.method);
    if(req.method=='GET'){
        var fileURL;
        if(req.url=='/'){
            fileURL="/index.html";
        }
        else{
            fileURL=req.url;
        }
        var filePath=path.resolve('./public'+fileURL);//Makes an absolute path
        const fileExt=path.extname(filePath);
        if(fileExt=='.html'){               //Checking if index.html exists
            fs.exists(filePath,(exists)=>{  //Call back function
                if(!exists){
                    res.statusCode=404;//everything is not fine
                    res.setHeader('Content-Type','text/html');
                    res.end('<html><body><h1>error 404: '+fileURL+' does not exists</h1></body></html>');
                }
                
                res.statusCode=200;//everything is fine
                res.setHeader('Content-Type','text/html');
                fs.createReadStream(filePath).pipe(res);//Converts into streams of byte
            })
        }
        else{
            res.statusCode=404;//everything is not fine
            res.setHeader('Content-Type','text/html');
            res.end('<html><body><h1>error 404: '+fileURL+' not a html file</h1></body></html>');
        }
    }
    else{//req coming through POST and PUT
        res.statusCode=404;//everything is not fine
        res.setHeader('Content-Type','text/html');
        res.end('<html><body><h1>error 404: '+fileURL+' not supported</h1></body></html>');
    }
    


});

server.listen(port,hostname,()=>{
    console.log(`server running at http://${hostname}:${port}`);
})