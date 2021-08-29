import * as cmwModule from "../pkg/core_my_wasm";
import './styles.scss'

window.coreWasm = null;

async function loadWasm() {
  // Instantiate our wasm module
  const cmw = await cmwModule.default("../pkg/core_my_wasm_bg.wasm");
  window.coreWasm = cmwModule;

  // Call the Add function export from wasm, save the result
  const addResult = cmw.add(24, 24);
  const divisibleResult = cmw.isDivisibleBy(24, 17);

  const getDateResult = cmw.getClientDate();
  const getDateResult2 = cmwModule.getClientDate();
  const sendMessageResult = cmw.sendMessage.call(cmwModule, 'Message1');
  const sendMessageResult2 = cmwModule.sendMessage('Message2');

  
  console.log('cmw.sendMessage');
  console.log(cmw.sendMessage);
  
  console.log('cmwModule.sendMessage');
  console.log(cmwModule.sendMessage);
  
  const app = document.getElementById('app');
  console.log('APP:', app);
  // Set the result onto the body
  app.innerHTML = `addResult: ${addResult}</br>`;  

  app.innerHTML += `divisibleResult: ${divisibleResult}</br>`;
  
  // app.innerHTML += `getDateResult0: ${getDateResult0}</br>`;
  // app.innerHTML += `getDateResult: ${getDateResult}</br>`;
  app.innerHTML += `getDateResult: ${getDateResult2}</br>`;

  // app.innerHTML += `sendMessageResult: ${sendMessageResult}</br>`;
  app.innerHTML += `sendMessageResult: ${sendMessageResult2}</br>`;

  cmwModule.getGithubCommits('edgar0011/coremywasm').then((data) => {
    console.log('GitHub, edgar0011/coremywasm')
    console.log(data)
    app.innerHTML += `GitHub: ${JSON.stringify(data)}</br>`;
  })

  
  cmwModule.getWorldTime().then((data) => {
    console.log('getWorldTime')
    console.log(data)
    app.innerHTML += `WorldTime: ${JSON.stringify(data)}</br>`;
  })

  


  app.classList.add('main');

  return coreWasm
}

window.coreWasmReady = new Promise((resolve, reject) => {
  
  document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOMContentLoaded:', event);
  
    loadWasm().then((ready) => {
      console.log('MAIN fun run, ready')
      console.log('coreWasm', coreWasm)
      console.log('coreWasm?.getClientDate()', coreWasm?.getClientDate())
      resolve(ready)
    })
  
  });  
});

coreWasmReady.then((result) => {
  console.log('coreWasmReady', result)
  console.log('result?.getClientDate()', result?.getClientDate())

})