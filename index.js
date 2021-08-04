import init from "./pkg/core_my_wasm.js";

const runWasm = async () => {
  // Instantiate our wasm module
  const cmw = await init("./pkg/core_my_wasm_bg.wasm");

  // Call the Add function export from wasm, save the result
  const addResult = cmw.add(24, 24);
  const divisibleResult = cmw.isDivisibleBy(24, 24);

  // Set the result onto the body
  document.body.innerHTML = `addResult: ${addResult}</br>`;


  document.body.innerHTML += `divisibleResult: ${divisibleResult}`;
};
runWasm();