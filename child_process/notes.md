<!-- What is child process -->
The child process module spawn new thread.

<!-- Spawn -->
// Usage //
i. It is use to run command line arguments.
ii. It is suitable for long-running processes or streaming large amounts of data.


<!-- exec -->
// Usage //
i. It is use to execute shell commands.
ii. It's useful for running commands that don't require streaming I/O and for capturing the entire output of the command.


<!-- execFile -->
// Usage //
i. It is use to execute shell commands file.
ii. It's suitable for running executables with arguments.


<!-- fork -->
// Usage //
i. This function is specifically designed for creating child processes that run Node.js modules.
ii. It's useful for creating separate instances of the Node.js runtime, each with its own memory space and event loop.