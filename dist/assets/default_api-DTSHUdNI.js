const s={"README.md":`# Mock Project
This is a mock project for demonstration.`,"src/main.tsx":`import React from 'react';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <div>Hello World</div>
  </React.StrictMode>,
)`,"src/styles.css":"body { font-family: sans-serif; }","package.json":'{ "name": "mock-project", "version": "1.0.0" }'},l=e=>(console.log(`[mock] list_files called with path: ${e}`),new Promise(t=>{setTimeout(()=>{t({result:Object.keys(s)})},500)})),r=e=>(console.log(`[mock] read_file called with path: ${e}`),new Promise((t,o)=>{setTimeout(()=>{s[e]?t({result:s[e]}):o({error:"File not found"})},500)})),i=(e,t)=>(console.log(`[mock] write_file called with path: ${e}`),new Promise(o=>{setTimeout(()=>{s[e]=t,o({result:"File saved successfully"})},500)})),c=e=>(console.log(`[mock] delete_file called with path: ${e}`),new Promise((t,o)=>{setTimeout(()=>{s[e]?(delete s[e],t({result:"File deleted successfully"})):o({error:"File not found"})},500)})),n=e=>(console.log(`[mock] run_terminal_command called with command: ${e}`),new Promise(t=>{setTimeout(()=>{if(e.trim()==="ls")t({result:Object.keys(s).join(`
`)});else if(e.trim().startsWith("cat")){const o=e.trim().split(" ")[1];o&&s[o]?t({result:s[o]}):t({result:`cat: ${o}: No such file or directory`})}else t({result:`zsh: command not found: ${e}`})},500)}));export{r as a,c as d,l,n as r,i as w};
