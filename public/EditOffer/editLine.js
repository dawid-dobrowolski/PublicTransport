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


linesList.onchange = async () => {
    if (linesList.value == "Proszę wybrać linię") {
        addOpt.disabled = true;
        Opt_wrapper.innerHTML = '';
        return
    }

    const rawResponse = await fetch('http://localhost:3000/secret/lineStops?' + new URLSearchParams({
        lineNumber: linesList.options[linesList.selectedIndex].text
    }), {
        method: 'GET',
    });
    const content = await rawResponse.json();
    arr = (await content['stops']).split('|');
    lineType = content['lineType'];
    stops = arr

    if (lineType == 0)
        document.querySelector('#autobus').setAttribute("selected", "selected");
    else
        document.querySelector('#tram').setAttribute("selected", "selected");

    addOpt.disabled = false;
    Opt_wrapper.innerHTML = '';
    Opt = [];

    for (let a = 0; a < stops.length; a++) {
        Opt.push(newOpt.value);

        let newOpt_list = document.createElement('div');
        newOpt_list.className = 'item';
        for (let i = 0; i < Opt.length; i++) {
            newOpt_list.innerHTML = stops[a];
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
        ;
    }

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
        let line = document.createElement('option');
        line.value = lines[i];
        line.innerHTML = lines[i];
        line.className = "line";
        linesList.appendChild(line);
    }

})();

document.querySelectorAll('.item').forEach((element) => {
    element.addEventListener('click', () => {
        Opt_wrapper.removeChild(element);
    })
})

saveBtn.addEventListener('click', () => {

    if (linesList.value == "Proszę wybrać linię") {
        location.href = '/admin/editOffer';
        return;
    }


    if (!nrLinii.value || nrLinii.value < 1) {
        resBox.innerHTML = 'Niepoprawny numer linii!';
        return;
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
        resBox.innerHTML = 'Proszę dodać przystanki!';
        return;
    }

    resBox.innerHTML = '';

    if(typLinii.value == "autobus")
        typ = 0;
    else
        typ = 1;

    (async () => {
        const rawResponse = await fetch('http://localhost:3000/admin/editLine', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                line_number: nrLinii.value,
                line_type: typ,
                stops: przystanki
            })
        });
    })();

    location.href = '/admin/editOffer';

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