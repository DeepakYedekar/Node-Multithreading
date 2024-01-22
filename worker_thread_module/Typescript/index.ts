import path from "path";
import {Worker} from "worker_threads";

let res:any = [],promises:any = [];
for (let i = 0; i < 4; i++) {
  const worker:any = new Worker(path.join(__dirname,"worker_thread.js"));
  worker.postMessage({ data: `This is parent data ${i}` });
  promises.push(
    new Promise((resolve:any, reject:any) => {
      worker.on("message", (data:any) => {
        res.push(data);
        resolve();
        worker.terminate();
      });
    })
  );
}

Promise.all(promises)
  .then(() => {
    console.log(res);
  })
  .catch(error => {
    console.error(error);
  });
