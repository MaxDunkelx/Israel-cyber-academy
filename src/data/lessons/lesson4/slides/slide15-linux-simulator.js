export const slide15LinuxSimulator = {
  id: "slide-15",
  type: "interactive",
  title: "סימולטור Linux 🖥️",
  content: {
    type: "linux-simulator",
    instructions: "נסה פקודות Linux בסימולטור בטוח",
    commands: [
      {
        command: "ls",
        description: "הצג קבצים בתיקייה",
        output: "Documents  Downloads  Pictures  Videos  Desktop"
      },
      {
        command: "pwd",
        description: "הצג מיקום נוכחי",
        output: "/home/student"
      },
      {
        command: "whoami",
        description: "הצג שם משתמש",
        output: "student"
      },
      {
        command: "date",
        description: "הצג תאריך ושעה",
        output: "Thu Dec 21 15:30:45 IST 2024"
      },
      {
        command: "echo 'Hello Linux!'",
        description: "הדפס טקסט",
        output: "Hello Linux!"
      },
      {
        command: "mkdir test_folder",
        description: "צור תיקייה חדשה",
        output: ""
      },
      {
        command: "ls -la",
        description: "הצג קבצים עם פרטים",
        output: "total 32\ndrwxr-xr-x 2 student student 4096 Dec 21 15:30 .\ndrwxr-xr-x 3 root root 4096 Dec 21 15:30 ..\n-rw-r--r-- 1 student student 1234 Dec 21 15:30 file.txt\ndrwxr-xr-x 2 student student 4096 Dec 21 15:30 test_folder"
      }
    ],
    duration: 600
  }
}; 