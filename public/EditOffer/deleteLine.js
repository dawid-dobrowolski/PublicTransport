let Opt_wrapper = document.querySelector('.wrapper');
let newOpt = document.querySelector('.bus_stop_name');
let addOpt = document.querySelector('.add_bus_stop');
let linesList = document.querySelector('#lines');
let typTrans = document.querySelector('#typtrans');
let linesSelect = document.querySelector('.line');
let saveBtn = document.querySelector('#saveBtn');
let resBox = document.querySelector('#res');
let nrLinii = document.querySelector('#lines');
let typLinii = document.querySelector('#typ');

let Opt = [];
let height = 0;
let maxHeight = 320;

(async () => {
    const rawResponse = await fetch('http://localhost:3000/secret/allLines', {
        method: 'GET',
    });
    const content = await rawResponse;

    arr = [...(await content.text()).matchAll('\\d+')];
    lines = []

    for (var i = 0; i < arr.length; i++) {
        lines.push(arr[i][0]);
    }

    await lines;
    for (let i = 0; i < lines.length; i++) {
        let line = document.createElement('option');
        line.value = lines[i];
        line.innerHTML = lines[i];
        line.className = "line";
        linesList.appendChild(line);
    }

})();

saveBtn.addEventListener('click', () => {

    if (linesList.value == "Proszę wybrać linię") {
        location.href = '/admin/editOffer';
        return;
    }

    resBox.innerHTML = '';

    (async () => {
        const rawResponse = await fetch('http://localhost:3000/admin/deleteLine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                line_number: nrLinii.value,
            })
        });
    })();

    location.href = '/admin/editOffer';

})