(function () {
    var stripe = Stripe('pk_test_6dgYUoFefhkUiXQos4EmPEaL');
    var elements = stripe.elements();

    // Element作成時に options から スタイルを調整できます.
    var style = {
        base: {
            // ここでStyleの調整をします。
            fontSize: '16px',
            color: "#32325d",
        }
    };

    // card Element のインスタンスを作成
    var card = elements.create('card', { style: style });

    // マウント
    card.mount('#card-element');

    card.addEventListener('change', function (event) {
        var displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = event.error.message;
        } else {
            displayError.textContent = '';
        }
    });

    function stripeTokenHandler(token) {
        // tokenをフォームへ包含し送信
        var form = document.getElementById('payment-form');
        var hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'stripeToken');
        hiddenInput.setAttribute('value', token.id);
        form.appendChild(hiddenInput);

        // Submit します
        form.submit();
    }

    //トークン作成もしくはエラー表示
    var form = document.getElementById('payment-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        stripe.createToken(card).then(function (result) {
            if (result.error) {
                // エラー表示.
                var errorElement = document.getElementById('card-errors');
                errorElement.textContent = result.error.message;
            } else {
                // トークンをサーバに送信
                stripeTokenHandler(result.token);
            }
        });
    });

})();

