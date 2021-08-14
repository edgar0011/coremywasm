// The wasm-pack uses wasm-bindgen to build and generate JavaScript binding file.
// Import the wasm-bindgen crate.
use chrono::prelude::*;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn return_string() -> String {
    "hello".into()
}

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
    format!("Date: {}", dt.format("%+")).into()
}

#[wasm_bindgen(js_name = "sendMessage")]
pub fn send_message(input_string: String) -> String {
    let result = format!("Message sent: {} {}", input_string, ".");
    return result.into();
}


#[wasm_bindgen(js_name = "isDivisibleBy2")]
pub fn is_divisible_by2(number: u32, divisor: u32) -> bool {
    if divisor == 0 {
        return false;
    }
    if number == 0 {
        return true;
    }
    number % divisor == 0
}