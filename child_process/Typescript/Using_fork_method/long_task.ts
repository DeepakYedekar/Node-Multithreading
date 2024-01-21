function longComputation() {
  return new Promise((resolve, reject) => {
    let sum:number = 0;
    for (let i: number = 0; i < 100000; i++) {
      sum += i;
    }
    resolve(sum);
  });
}

process.on("message", async (message:any) => {
  let { event, data } = message;
  console.log(data);
    // receiving the message from main process
    if(event==='start'){
    const sum = await longComputation();
    (<any>process).send({event:'done',data:sum});
    }
});
