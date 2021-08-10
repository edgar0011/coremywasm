/* tslint:disable */
/* eslint-disable */
/**
* @returns {string}
*/
export function return_string(): string;
/**
* @param {number} a
* @param {number} b
* @returns {number}
*/
export function add(a: number, b: number): number;
/**
* @param {number} number
* @param {number} divisor
* @returns {boolean}
*/
export function isDivisibleBy(number: number, divisor: number): boolean;
/**
* @returns {string}
*/
export function getClientDate(): string;
/**
* @param {string} input_string
* @returns {string}
*/
export function sendMessage(input_string: string): string;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly return_string: (a: number) => void;
  readonly add: (a: number, b: number) => number;
  readonly isDivisibleBy: (a: number, b: number) => number;
  readonly getClientDate: (a: number) => void;
  readonly sendMessage: (a: number, b: number, c: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number) => void;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
