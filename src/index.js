import init from "../pkg/core_my_wasm.js";

window.coreWasm = null

async function main() {

  const runWasm = async () => {
    // Instantiate our wasm module
    const cmw = await init("../pkg/core_my_wasm_bg.wasm");
    window.coreWasm = cmw
  
    // Call the Add function export from wasm, save the result
    const addResult = cmw.add(24, 24);
    const divisibleResult = cmw.isDivisibleBy(24, 24);

    const getDateResult = cmw.getClientDate();
    const crazy_method = cmw.crazy_method();
  
    // Set the result onto the body
    document.body.innerHTML = `addResult: ${addResult}</br>`;
  
  
    document.body.innerHTML += `divisibleResult: ${divisibleResult}</br>`;
    
    document.body.innerHTML += `getDateResult: ${getDateResult}</br>`;
    document.body.innerHTML += `crazy_method: ${crazy_method}`;
  };
  const wasmReady = await runWasm();
  
  console.log('wasm ready')
  console.log('coreWasm', coreWasm)

}

main().then(() => {
  console.log('MAIN fun run, ready')
  console.log('coreWasm2', coreWasm)
})
