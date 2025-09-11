
const fs=require('fs');
const path=require('path');

function handleRequest(req, res) {
const ext=path.extname(req.url);

if(ext){
    const staticFilepath=path.join(__dirname, '..', req.url);
    fs.readFile(staticFilepath, (err, content)=>{
        if(err){
            res.writeHead(404);
            res.end('archivo no encontrado');
        } else{
            let contentType= 'text/plain';

        switch(ext){
                       case '.jpg':
        case '.jpeg':
          contentType = 'image/jpeg';
          break;
        case '.png':
          contentType = 'image/png';
          break;
        case '.css':
          contentType = 'text/css';
          break;
        case '.js':
          contentType = 'text/javascript';
          break;
            }

            res.writeHead(200, {'content-type': contentType})
            res.end(content);
        }
    });
    return;
}

let file='';

switch(req.url.toLowerCase()){

    case '/':
    case '/home':
        file='index.html';
        break;  
    
    case '/valores':
        file='valores.html';
        break;   
        
    case '/skills':
        file='skills.html';
        break;  

    case '/proyectos':
        file='proyectos.html';
        break;    

    case '/contacto':
        file='contacto.html';
        break;

    default:
      file = '';
  
}
const filePath= path.join(__dirname,'..', file);
fs.readFile(filePath, (err, content)=>{
    if(err){
        res.writeHead(500);
        res.end('Error del servidor');
    }
    else{
        res.writeHead(200, {'content-type': 'text/html'});
        res.end(content)
    }
  })

}

module.exports=handleRequest;