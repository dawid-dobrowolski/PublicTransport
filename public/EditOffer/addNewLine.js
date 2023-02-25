let Opt_wrapper = document.querySelector('.wrapper');
let newOpt = document.querySelector('.bus_stop_name');
let addOpt = document.querySelector('.add_bus_stop');
let saveBtn = document.querySelector('#saveBtn');
let resBox = document.querySelector('#res');

let nrLinii = document.querySelector('#nrlin');
let typLinii = document.querySelector('#typ');


let Opt = [];
let height = 0;
let maxHeight = 320;

saveBtn.addEventListener('click', () => {

    if (!nrLinii.value || nrLinii.value < 1) {
        resBox.innerHTML = 'Niepoprawny numer linii!';
        return;
    }

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
            if (lines[i] == nrLinii.value) {
                resBox.innerHTML = "Linia o podanym numerze już istnieje!";
                return;
            }
        }

        przystanki = '';
        let item = document.querySelectorAll('.item');
        for (let j = 0; j < item.length; j++) {
            if (j == item.length - 1)
                przystanki += item[j].textContent;
            else
                przystanki += item[j].textContent + "|";
        }

        przystanki = przystanki.replaceAll("X", '')
        if (przystanki === "") {
            resBox.innerHTML = 'Nie można utworzyć linii bez przystanków!';
            return;
        }


        resBox.innerHTML = '';

        (async () => {
            const rawResponse = await fetch('http://localhost:3000/admin/addNewLine', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    line_number: nrLinii.value,
                    line_type: typLinii.value,
                    stops: przystanki
                })
            });
        })();

        location.href='/admin/editOffer';

    })();

})


addOpt.addEventListener('click', () => {
    if (newOpt.value != '') {
        Opt.push(newOpt.value);

        let newOpt_list = document.createElement('div');
        newOpt_list.className = 'item';

        for (let i = 0; i < Opt.length; i++) {
            newOpt_list.innerHTML = newOpt.value;
            Opt_wrapper.appendChild(newOpt_list);
        }
        if (Opt.length > 0) {
            let item = document.querySelectorAll('.item');
            for (let j = 0; j < item.length; j++) {
                let delete_Opt = document.createElement('div');
                delete_Opt.className = 'delete';
                delete_Opt.innerHTML = "X";
                item[j].appendChild(delete_Opt);

                delete_Opt.addEventListener('click', () => {
                    Opt_wrapper.removeChild(item[j]);
                })
            }
        }
        newOpt.value = '';
    }
})

new Sortable(Opt_wrapper, {
    animation: 300
})