const {parentPort}=require('worker_threads');
parentPort.on('message',(data)=>{
    let s=data.data+' '+'child';
    parentPort.postMessage(s);

})
