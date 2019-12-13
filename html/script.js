let amount = 0;
let sodas = {};
$(document).ready(function () {
    updateMoneyReadout(amount);
    updateCoinReturnButton();
    updateInventoryList()
});

function updateMoneyReadout() {
    // console.log(amount);
    $('#amt').text(`$ ${amount.toFixed(2)}`);
}

function addQuarter() {
    amount += .25;
    updateCoinReturnButton();
    updateMoneyReadout(amount);
}

function updateCoinReturnButton() {
    if (amount > 0) {
        $('#coin-return').show();
    } else {
        $('#coin-return').hide();
    }
}

function returnCoins() {
    amount = 0;
    updateCoinReturnButton();
    updateMoneyReadout(amount);
}

function getSoda(soda) {
    console.log(`User would like a ${soda}`);
    // check if soda is in stock
    console.log(`${soda}'s available: ${sodas[soda].remaining}`);
    if (sodas[soda].remaining > 0) {
        // TODO check if inserted amount is sufficient to buy the item
        if (amount >= sodas[soda].price) {
            // Sufficient funds. Dispense soda
            alert(`Dispensing ${soda}`);
            // Subtract price of soda from amount of money
            amount -= sodas[soda].price;
            // tell the server we have sold an item!
            reportSoldItem(sodas[soda]);
        } else {
            // Alert user of insufficient funds.
            alert(`Insufficient Funds! ${soda} costs $${sodas[soda].price}`);
            // dispense nothing
        }
        updateMoneyReadout();
        updateCoinReturnButton();
    } else {
        // Crush user's hopes and dreams by telling them the machine is out of their desired soda
        alert(`${soda} out of stock!`);
        // FIXME perhaps use a modal or something that looks cleaner
    }
    console.log(sodas[soda]);
}

function reportSoldItem(item) {
    // console.warn("write code for reportSoldItem");
    $.post("/ws/soda-service", item, function(data){
        console.log(data);
    }).always(function(){
        updateInventoryList();
    });
}

function updateInventoryList(){
    $.getJSON("/ws/soda-service", function (data) {
        sodas = data;
        console.log(data);
    });
}