// The wasm-pack uses wasm-bindgen to build and generate JavaScript binding file.
// Import the wasm-bindgen crate.
use chrono::prelude::*;
use wasm_bindgen::prelude::*;

use serde::{Deserialize, Serialize};
use wasm_bindgen::JsCast;
use wasm_bindgen_futures::JsFuture;
use web_sys::{Request, RequestInit, RequestMode, Response};


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

#[derive(Debug, Serialize, Deserialize)]
pub struct Branch {
    pub name: String,
    pub commit: Commit,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Commit {
    pub sha: String,
    pub commit: CommitDetails,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CommitDetails {
    pub author: Signature,
    pub committer: Signature,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Signature {
    pub name: String,
    pub email: String,
}

#[wasm_bindgen(js_name = "getGithubCommits")]
pub async fn get_github_commits(repo: String) -> Result<JsValue, JsValue> {
    let mut opts = RequestInit::new();
    opts.method("GET");
    opts.mode(RequestMode::Cors);

    let url = format!("https://api.github.com/repos/{}/branches/main", repo);

    let request = Request::new_with_str_and_init(&url, &opts)?;

    request
        .headers()
        .set("Accept", "application/vnd.github.v3+json")?;

    let window = web_sys::window().unwrap();
    let resp_value = JsFuture::from(window.fetch_with_request(&request)).await?;

    // `resp_value` is a `Response` object.
    assert!(resp_value.is_instance_of::<Response>());
    let resp: Response = resp_value.dyn_into().unwrap();

    // Convert this other `Promise` into a rust `Future`.
    let json = JsFuture::from(resp.json()?).await?;

    // Use serde to parse the JSON into a struct.
    let branch_info: Branch = json.into_serde().unwrap();

    // Send the `Branch` struct back to JS as an `Object`.
    Ok(JsValue::from_serde(&branch_info).unwrap())
}


#[derive(Debug, Default, Serialize, Deserialize)]
pub struct WorldTime {
    pub abbreviation: String,
}

#[wasm_bindgen(js_name = "getWorldTime")]
pub async fn get_world_time(timezone: Option<String>) -> Result<JsValue, JsValue> {
    let mut opts = RequestInit::new();
    opts.method("GET");
    opts.mode(RequestMode::Cors);

    let url = format!("http://worldtimeapi.org/api/timezone/{}", timezone.unwrap_or("Europe/Prague".into()));

    let request = Request::new_with_str_and_init(&url, &opts)?;

    request
        .headers()
        .set("Accept", "application/json")?;

    let window = web_sys::window().unwrap();
    let resp_value = JsFuture::from(window.fetch_with_request(&request)).await?;

    // `resp_value` is a `Response` object.
    assert!(resp_value.is_instance_of::<Response>());
    let resp: Response = resp_value.dyn_into().unwrap();

    // Convert this other `Promise` into a rust `Future`.
    let json = JsFuture::from(resp.json()?).await?;

    // Use serde to parse the JSON into a struct.
    //let world_time: WorldTime = json.into_serde().unwrap();

    // Send the `world_time` struct back to JS as an `Object`.
    Ok(json.into())
}