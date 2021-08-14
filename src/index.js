import * as cmwModule from "../pkg/core_my_wasm";

window.coreWasm = null

async function main() {

  const runWasm = async () => {
    // Instantiate our wasm module
    const cmw = await cmwModule.default("../pkg/core_my_wasm_bg.wasm");
    window.coreWasm = cmw
  
    // Call the Add function export from wasm, save the result
    const addResult = cmw.add(24, 24);
    const divisibleResult = cmw.isDivisibleBy(24, 17);

    const getDateResult = cmw.getClientDate();
    const getDateResult2 = cmwModule.getClientDate();
    const sendMessageResult = cmw.sendMessage.call(cmwModule, 'Message1');
    const sendMessageResult2 = cmwModule.sendMessage('Message2');

    
    console.log('cmw.sendMessage')
    console.log(cmw.sendMessage)
    
    console.log('cmwModule.sendMessage')
    console.log(cmwModule.sendMessage)
    
  
    // Set the result onto the body
    document.body.innerHTML = `addResult: ${addResult}</br>`;  
  
    document.body.innerHTML += `divisibleResult: ${divisibleResult}</br>`;
    
    // document.body.innerHTML += `getDateResult0: ${getDateResult0}</br>`;
    // document.body.innerHTML += `getDateResult: ${getDateResult}</br>`;
    document.body.innerHTML += `getDateResult: ${getDateResult2}</br>`;

    // document.body.innerHTML += `sendMessageResult: ${sendMessageResult}</br>`;
    document.body.innerHTML += `sendMessageResult: ${sendMessageResult2}</br>`;
  };
  const wasmReady = await runWasm();
  
  console.log('wasm ready')
  console.log('coreWasm', coreWasm)

}

main().then(() => {
  console.log('MAIN fun run, ready')
  console.log('coreWasm2', coreWasm)
})
