import { parentPort } from "worker_threads";

parentPort?.on("message",async (data: any) => {
  async function filter(data:any){
    let re=0;
    for(let i=0;i<6;i++){
      re++;
    }
    return re;
  }

  parentPort?.postMessage(await filter(data));
});
