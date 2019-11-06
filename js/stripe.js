var createOrder = function() {
    var button = document.getElementById("order");
    button.classList.add("is-loading");
    var cancelBtn = document.getElementById("cancel")
    cancelBtn.disabled = true;
    var shipping = document.getElementById("shipping")
    var success = document.getElementById("success")
    var failed = document.getElementById("failed")

    var url = "/api/"
    var data = {
        name: "aaa",
        email: "bbb",
        tell: "ccc",
        postalcode: "ddd",
        address: "eee",
        oil: 1,
        bodycream: 2,
        rollon: 0,
        pack: 0
    }
    var request = new XMLHttpRequest();
    request.open('POST', url);
    request.setRequestHeader("Accept", "application/json");
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = function () {
        if (request.readyState != 4) {
            // リクエスト中
        } else if (request.status != 200) {
            button.classList.remove("is-loading");
            button.disabled = true;
            shipping.classList.add("is-hidden")
            failed.classList.remove("is-hidden")
            cancelBtn.disabled = false;
        } else {
            button.classList.remove("is-loading");
            button.disabled = true;
            shipping.classList.add("is-hidden")
            success.classList.remove("is-hidden")
            cancelBtn.disabled = false;
        }
    };
    request.send(JSON.stringify(data));
}
