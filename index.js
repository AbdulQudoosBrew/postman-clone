console.log("i am in postman app");
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";
let requestJsonBox = document.getElementById("requestJsonBox");
requestJsonBox.style.display = "none";
let contentParam = document.getElementById("contentParam");
contentParam.style.display = "none";
let post = document.getElementById("post");
post.addEventListener("click", () => {
  let parametersBox = document.getElementById("parametersBox");
  parametersBox.style.display = "none";
  let requestType = document.querySelector(
    "input[name='requestType']:checked"
  ).value;
  let requestJsonBox = document.getElementById("requestJsonBox");
  requestJsonBox.style.display = "block";
  let contentParam = document.getElementById("contentParam");
  contentParam.style.display = "block";
});
let get = document.getElementById("get");
get.addEventListener("click", () => {
  let parametersBox = document.getElementById("parametersBox");
  parametersBox.style.display = "none";
  let requestJsonBox = document.getElementById("requestJsonBox");
  requestJsonBox.style.display = "none";
  let contentParam = document.getElementById("contentParam");
  contentParam.style.display = "none";
});

function getElementFromString(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}
let paramsCount = 0;

// Content type
// imp
requestJsonBox = document.getElementById("requestJsonBox");
parametersBox = document.getElementById("parametersBox");
// requestJsonBox.style.display = 'block'
// parametersBox.style.display = 'none'
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
  console.log("this is jason");
  let requestJsonBox = document.getElementById("requestJsonBox");
  let parametersBox = document.getElementById("parametersBox");
  requestJsonBox.style.display = "block";
  parametersBox.style.display = "none";
});
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
  console.log("this is paramsBox");
  let requestJsonBox = document.getElementById("requestJsonBox");
  let parametersBox = document.getElementById("parametersBox");
  requestJsonBox.style.display = "none";
  parametersBox.style.display = "block";
});

// button for add params

let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
  let params = document.getElementById("params");
  let string = `<div class="row my-3">
                        <label for="url" class="col-sm-2 col-form-label">Parameter ${
                          paramsCount + 2
                        }</label>
                                <div class="col-md-4">
                                <input type="text" class="form-control" id="parameterKey${
                                  paramsCount + 2
                                }" placeholder="Enter Parameter ${
    paramsCount + 2
  } Key">
                                </div>
                                <div class="col-md-4">
                                <input type="text" class="form-control" id="parameterValue${
                                  paramsCount + 2
                                }"
                                placeholder="Enter Parameter ${
                                  paramsCount + 2
                                } Value">
                        </div>
                        <button class="btn btn-primary deleteParam col coll "> - </button>`;
  let paramElement = getElementFromString(string);
  console.log(paramElement);
  params.appendChild(paramElement);
  // to delete params
  let deleteParam = document.getElementsByClassName("deleteParam");
  for (item of deleteParam) {
    item.addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });
  }
  paramsCount++;
});
// json box value
// let requestJsonBox = document.getElementById('requestJsonBox')
// console.log(requestJsonBox)
// let requestJsonBoxValue = requestJsonBox.value
let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  document.getElementById("responsePrism").innerHTML =
    "Please wait.. Fetching response...";
  let url = document.getElementById("url").value;
  let requestType = document.querySelector(
    "input[name='requestType']:checked"
  ).value;
  let contentType = document.querySelector(
    "input[name='contentType']:checked"
  ).value;
  console.log("url is", url);
  console.log("request  is", requestType);
  console.log("content is is", contentType);
  if (contentType == "params") {
    data = {};
    for (let i = 0; i < paramsCount + 1; i++) {
      if (document.getElementById(`parameterKey` + (i + 1)) != undefined) {
        let key = document.getElementById(`parameterKey` + (i + 1)).value;
        let value = document.getElementById(`parameterValue` + (i + 1)).value;
        console.log("key is", key, "value is ", value);
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  } else {
    data = document.getElementById("requestJsonText").value;
  }
  console.log(data);
  if (requestType == "GET") {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((text) => {
        console.log(text);
        document.getElementById("responsePrism").innerHTML = text;
        Prism.highlightAll();
      });
  } else {
    fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.text())
      .then((text) => {
        document.getElementById("responsePrism").innerHTML = text;
        Prism.highlightAll();
        console.log(text);
      });
  }
});
