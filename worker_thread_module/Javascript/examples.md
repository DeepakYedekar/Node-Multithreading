<!-- 1. CPU-Intensive Tasks -->
For tasks that require significant computational power and would otherwise block the main event loop, 
using worker threads can greatly improve performance and responsiveness. Examples include:

* Example: Image Processing

<!-- ============================================= -->
// main.js
const { Worker } = require('worker_threads');

const worker = new Worker('./imageProcessor.js', {
  workerData: { imagePath: 'path/to/image.jpg' }
});

worker.on('message', (message) => {
  console.log('Processed image path:', message.processedImagePath);
});

worker.on('error', (error) => {
  console.error('Error:', error);
});

worker.on('exit', (code) => {
  if (code !== 0) {
    console.error(new Error(`Worker stopped with exit code ${code}`));
  }
});
<!-- ============================================= -->

<!-- ============================================= -->
// imageProcessor.js
const { workerData, parentPort } = require('worker_threads');
const sharp = require('sharp'); // An image processing library

sharp(workerData.imagePath)
  .resize(800, 600)
  .toFile('path/to/processed_image.jpg', (err, info) => {
    if (err) {
      parentPort.postMessage({ error: err.message });
    } else {
      parentPort.postMessage({ processedImagePath: 'path/to/processed_image.jpg' });
    }
  });
<!-- ============================================= -->

-------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------

<!-- 2. Parallel Processing -->
Breaking down a large task into smaller, parallelizable tasks can speed up processing time. This is useful for tasks such as:

* Example: Web Scraping

<!-- ============================================= -->
// main.js
const { Worker } = require('worker_threads');

const urls = ['http://example.com', 'http://example.org', 'http://example.net'];
const workers = urls.map(url => new Worker('./scraper.js', { workerData: { url } }));

workers.forEach(worker => {
  worker.on('message', (data) => {
    console.log('Scraped data:', data);
  });

  worker.on('error', (error) => {
    console.error('Error:', error);
  });

  worker.on('exit', (code) => {
    if (code !== 0) {
      console.error(new Error(`Worker stopped with exit code ${code}`));
    }
  });
});
<!-- ============================================= -->

<!-- ============================================= -->
// scraper.js
const { workerData, parentPort } = require('worker_threads');
const axios = require('axios');

axios.get(workerData.url)
  .then(response => {
    parentPort.postMessage({ url: workerData.url, data: response.data });
  })
  .catch(error => {
    parentPort.postMessage({ url: workerData.url, error: error.message });
  });
<!-- ============================================= -->

-------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------

<!-- 3. Real-Time Data Processing -->
For applications that need to process a continuous stream of data in real-time, such as:

* Example: Log Processing

<!-- ============================================= -->
// main.js
const { Worker } = require('worker_threads');
const fs = require('fs');

fs.watch('path/to/log/file', (eventType, filename) => {
  if (eventType === 'change') {
    const worker = new Worker('./logProcessor.js', { workerData: { filePath: 'path/to/log/file' } });
    worker.on('message', (processedData) => {
      console.log('Processed log data:', processedData);
    });
    worker.on('error', (error) => {
      console.error('Error:', error);
    });
    worker.on('exit', (code) => {
      if (code !== 0) {
        console.error(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  }
});
<!-- ============================================= -->

<!-- ============================================= -->
// logProcessor.js
const { workerData, parentPort } = require('worker_threads');
const fs = require('fs');

fs.readFile(workerData.filePath, 'utf8', (err, data) => {
  if (err) {
    parentPort.postMessage({ error: err.message });
    return;
  }

  const processedData = data.split('\n').filter(line => line.includes('ERROR')).join('\n');
  parentPort.postMessage({ processedData });
});
<!-- ============================================= -->

-------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------

<!-- 4. Offloading Blocking Tasks -->
Using worker threads to handle tasks that block the main thread can improve the overall performance of your application. Examples include:

* Example: File System Operation

<!-- ============================================= -->
// main.js
const { Worker } = require('worker_threads');

const worker = new Worker('./fileProcessor.js', { workerData: { filePath: 'path/to/large/file.txt' } });

worker.on('message', (result) => {
  console.log('File processed result:', result);
});

worker.on('error', (error) => {
  console.error('Error:', error);
});

worker.on('exit', (code) => {
  if (code !== 0) {
    console.error(new Error(`Worker stopped with exit code ${code}`));
  }
});
<!-- ============================================= -->

<!-- ============================================= -->
// fileProcessor.js
const { workerData, parentPort } = require('worker_threads');
const fs = require('fs');

fs.readFile(workerData.filePath, 'utf8', (err, data) => {
  if (err) {
    parentPort.postMessage({ error: err.message });
    return;
  }

  // Perform some intensive processing
  const processedData = data.split('\n').map(line => line.toUpperCase()).join('\n');
  parentPort.postMessage({ processedData });
});
<!-- ============================================= -->

-------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------

<!-- 5. Background Tasks -->
Worker threads can be used to handle background tasks that should not interfere with the main thread's operation. Examples include:

* Example: Scheduled Job

<!-- ============================================= -->
// main.js
const { Worker } = require('worker_threads');

const scheduleJob = () => {
  const worker = new Worker('./job.js', { workerData: { jobName: 'DailyBackup' } });

  worker.on('message', (result) => {
    console.log('Job result:', result);
  });

  worker.on('error', (error) => {
    console.error('Error:', error);
  });

  worker.on('exit', (code) => {
    if (code !== 0) {
      console.error(new Error(`Worker stopped with exit code ${code}`));
    }
  });
};

// Schedule the job to run every 24 hours
setInterval(scheduleJob, 24 * 60 * 60 * 1000);
<!-- ============================================= -->

<!-- ============================================= -->
// job.js
const { workerData, parentPort } = require('worker_threads');

// Simulate a background job, e.g., backing up a database
setTimeout(() => {
  parentPort.postMessage({ jobName: workerData.jobName, status: 'Completed' });
}, 2000);
These use cases demonstrate the flexibility and power of the worker_threads module in Node.js, enabling the development of high-performance, concurrent applications.
<!-- ============================================= -->

-------------------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------------------