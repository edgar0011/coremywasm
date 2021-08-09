// The wasm-pack uses wasm-bindgen to build and generate JavaScript binding file.
// Import the wasm-bindgen crate.
use wasm_bindgen::prelude::*;
use chrono::prelude::*;

// Our Add function
// wasm-pack requires "exported" functions
// to include #[wasm_bindgen]
#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
  return a + b;
}

#[wasm_bindgen(js_name = "isDivisibleBy")]
pub fn is_divisible_by(number: u32, divisor: u32) -> bool {
  if divisor == 0 {
      return false;
  }
  if number == 0 {
    return true;
  }
  number % divisor == 0
}

#[wasm_bindgen(js_name = "getClientDate")]
pub fn get_client_date() -> String {
   let now: DateTime<Utc> = Utc::now();
    // return now.timestamp();
    // now.format("%a %b %e %T %Y")
    let dt: DateTime<Utc> = now.into();
    return format!("Date: {}", dt.format("%+"));
}

#[wasm_bindgen]
pub fn crazy_method() -> String {
   // let now: DateTime<Utc> = Utc::now();
    // return now.timestamp();
    // now.format("%a %b %e %T %Y")
//     let dt: DateTime<Utc> = now.into();
    // return format!("Date: {}", dt.format("%+"));
    format!("Current Time is: 00:00:00 {}", 1)
}