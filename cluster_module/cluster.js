const cluster=require('cluster');

if(cluster.isMaster){
    console.log(`Master process ${process.pid} is running`);
    cluster.fork();
    cluster.fork();
}else{
    console.log(`Worker ${process.pid} started`);
    const http=require('http');
const server = http.createServer((req,res)=>{
    if(req.url==='/'){
        res.writeHead(200, {'Content-Type':'text/plain'});
        res.end('Home page');
    }else if(req.url==='/slow-page'){
        for(let i=0;i<600000;i++){};
        res.writeHead(200,{'Content-Type':'text/plain'});
        res.send('Slow page');
    }
})

server.listen(3000,()=>console.log("Server is running on port 8000"));
}