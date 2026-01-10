(function(){"use strict";self.onmessage=t=>{const r=t.data;try{const e=[],l=console.log;console.log=(...c)=>{e.push(c.map(s=>{try{return JSON.stringify(s,null,2)}catch{return String(s)}}).join(" "))};const n=new Function(r)();console.log=l;let o=e.join(`
`);n!==void 0&&(o+=(o?`
`:"")+`Return value: ${JSON.stringify(n,null,2)}`),o||(o="Code executed with no output."),self.postMessage({output:o})}catch(e){e instanceof Error?self.postMessage({error:e.message}):self.postMessage({error:"An unknown error occurred."})}}})();
