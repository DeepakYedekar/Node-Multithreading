function longComputation() {
  return new Promise((resolve,reject)=>{
    let sum=0;
    for(let i=0;i<100000;i++){
      sum+=i;
    }
    resolve(sum);
  });
}



process.on('message', async (message) => {
  let {event,data}=message;
  console.log(data);
  if (event === 'start') {   // receiving the message from main process
    const sum = await longComputation();
    process.send({event:'done',data:sum});
  }
});
