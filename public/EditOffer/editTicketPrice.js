let saveBtn = document.querySelector('#saveBtn');
let resBox = document.querySelector('#res');
let tickettype = document.querySelector('#typ');
let ticketperiod = document.querySelector('#okres');
let ticketlines = document.querySelector('#typ_linie');
let price = document.querySelector('.price_box');

saveBtn.addEventListener("click", () => {
    if (price.value < 1) {
        resBox.innerHTML = 'Niepoprawna cena!';
        return;
    }

    if(tickettype.value == "normalny")
        typ = 0;
    else
        typ = 1;

    if(ticketperiod.value == "3dni")
        okres = 3;
    else if(ticketperiod.value == "7dni")
        okres = 7;
    else if(ticketperiod.value == "1mies")
        okres = 1;
    else if(ticketperiod.value == "2mies")
        okres = 2;
    else if(ticketperiod.value == "6mies")
        okres = 5;

    if(ticketlines.value == "1linia")
        linie = 1;
    else(ticketlines.value == "wszystkie_linie")
        linie = 0;

    (async () => {
        const rawResponse = await fetch('http://localhost:3000/admin/editTicketPrice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ticket_type: typ,
                ticket_period: okres,
                ticket_lines: linie,
                ticket_price: price.value
            })
        });
    })();

    location.href='/admin/editOffer';

})();