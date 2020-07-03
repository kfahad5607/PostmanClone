// Initialising the Node. of param elements added
let addedParamNo = 0;

// Hiding the custom parameters box as JSON is selected by default.
let parametersBox = document.getElementById('parametersBox');
let requestJsonBox = document.getElementById('requestJsonBox');
parametersBox.style.display = "none";

// Hiding the custom parameters box and showing JSON box as JSON is selected.
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    parametersBox.style.display = "none";
    requestJsonBox.style.display = "block";
});

// Hiding the JSON box and showing the custom parameters box as custom parameters radio is selected.
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    parametersBox.style.display = "block";
    requestJsonBox.style.display = "none";

});

// Adding custom parameters field when the + button is clicked!
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `        <div id="parametersBox">
    <div class="form-row">
        <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamNo + 2}</label>
        <div class="col-md-4">
            <input type="text" class="form-control" id="parameterKey${addedParamNo + 2}" placeholder="Enter Parameter ${addedParamNo + 2} Key">
        </div>
        <div class="col-md-4">
            <input type="text" class="form-control" id="parameterValue${addedParamNo + 2}" placeholder="Enter Parameter ${addedParamNo + 2} Value">
        </div>
        <button id="" class="btn btn-primary deleteParam">-</button>
        </div>
    </div>`;

    // let paramElement = string; 
    params.innerHTML += string;
    addedParamNo++;

    // Deleting the param element when - button is clicked 
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (let item of deleteParam) {
        item.addEventListener("click", (e) => {
            e.target.parentElement.remove();
        })
    }

});

let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    document.getElementById('responsePrism').innerHTML = "Fetching data....please wait";
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;
    console.log(requestType, contentType);

    let data = {};
    if (contentType == "params") {
        for (let i = 0; i < addedParamNo + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById(`parameterKey${i + 1}`).value;
                let value = document.getElementById(`parameterValue${i + 1}`).value;
                data[key] = value;
            }

        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }
    console.log(data);

    // Fetching the api 
    // let responseJsonText = document.getElementById('responseJsonText');
    if (requestType == "GET") {
        fetch(url, {
            method: "GET"

        })
            .then((response) => {
                return response.text();
            }).then((text) => {
                document.getElementById('responsePrism').innerHTML = text;

            });

    }
    else {
        fetch(url, {
            method: "POST",
            body: data,
            headers: {
                "content-type": "application/json ; charset= UTF-8"
            }
        })
            .then((response) => response.text())
            .then((text) => {
                document.getElementById('responsePrism').innerHTML = text;
            })
    }
});
