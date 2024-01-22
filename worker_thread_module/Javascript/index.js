const {Worker}=require('worker_threads');

let res=[],promises=[];
for(let i=0;i<4;i++){
    const worker=new Worker('./worker_thread.js');
    worker.postMessage({data:`This is parent data ${i}`});
    promises.push(new Promise((resolve,reject)=>{
        worker.on('message',(data)=>{
        res.push(data);
        resolve();
        worker.terminate();
        });
    }));
}

Promise.all(promises).then(()=>{
    console.log(res);
}).catch((error)=>{console.error(error)});
