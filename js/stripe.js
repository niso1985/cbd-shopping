var createOrder = function() {
    var name_ = document.getElementById("name").innerText;
    var email_ = document.getElementById("email").innerText;
    var tell_ = document.getElementById("tell").innerText;
    var postalcode_ = document.getElementById("postalcode").innerText;
    var address_ = document.getElementById("address").innerText;

    if(name_ == "" || name_ == undefined
    || email_ == "" || email_ == undefined
    || tell_ == "" || tell_ == undefined
    || postalcode_ == "" || postalcode_ == undefined
    || address_ == "" || address_ == undefined
    ) return;

    var oil = document.getElementsByName("oil")[0].value
    var cream = document.getElementsByName("cream")[0].value
    var roll = document.getElementsByName("roll")[0].value
    var pack = document.getElementsByName("pack")[0].value
    var oil_n, cream_n, roll_n;
    if (!oil) { oil_n = 0; } else { oil_n = parseInt(oil); }
    if (!cream) { cream_n = 0; } else { cream_n = parseInt(cream); }
    if (!roll) { roll_n = 0; } else { roll_n = parseInt(roll); }
    if (!pack) { pack_n = 0;} else { pack_n = parseInt(pack); }



    var button = document.getElementById("order");
    button.classList.add("is-loading");
    var cancelBtn = document.getElementById("cancel")
    cancelBtn.disabled = true;
    var shipping = document.getElementById("shipping")
    var success = document.getElementById("success")
    var failed = document.getElementById("failed")

    var url = "/api/"
    var data = {
        name: name_,
        email: email_,
        tell: tell_,
        postalcode: postalcode_,
        address: address_,
        oil: oil_n,
        bodycream: cream_n,
        rollon: roll_n,
        pack: pack_n
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
