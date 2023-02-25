let buses = document.querySelector('#autobusy');
let trams = document.querySelector('#tramwaje');
let saveBtn = document.querySelector('#saveBtn');

(async () => {
    const rawResponse = await fetch('http://localhost:3000/secret/allBuses', {
        method: 'GET',
    });
    const content = await rawResponse;

    arr = [...(await content.text()).matchAll('\\d+')];
    lines_buses = []

    for (var i = 0; i < arr.length; i++) {
        lines_buses.push(arr[i][0]);
    }

    function getCurrentURL(){
        return window.location
    }
    const url = getCurrentURL();

    await lines_buses;
    for (let i = 0; i < lines_buses.length; i++) {
        let line = document.createElement('div');
        line.value = lines_buses[i];
        line.innerHTML = lines_buses[i];
        line.className = "liniaBox";
        buses.appendChild(line);
        line.addEventListener('click', () => {
            if(url == "http://localhost:3000/admin/timetable")
                location.href = '/admin/stops?' + new URLSearchParams({lineNumber: line.innerHTML});
            else if(url == "http://localhost:3000/timetable/")
                location.href = '/stops?' + new URLSearchParams({lineNumber: line.innerHTML});
            else if(url == 'http://localhost:3000/user/timetable')
                location.href = '/user/stops?' + new URLSearchParams({lineNumber: line.innerHTML});
        })
    }

})();

(async () => {
    const rawResponse = await fetch('http://localhost:3000/secret/allTrams', {
        method: 'GET',
    });
    const content = await rawResponse;

    arr = [...(await content.text()).matchAll('\\d+')];
    lines_trams = []

    for (var i = 0; i < arr.length; i++) {
        lines_trams.push(arr[i][0]);
    }

    function getCurrentURL(){
        return window.location
    }
    const url = getCurrentURL();

    await lines_trams;
    for (let i = 0; i < lines_trams.length; i++) {
        let line = document.createElement('div');
        line.value = lines_trams[i];
        line.innerHTML = lines_trams[i];
        line.className = "liniaBox";
        trams.appendChild(line);
        line.addEventListener('click',  () => {
            if(url == "http://localhost:3000/admin/timetable")
                location.href = '/admin/stops?' + new URLSearchParams({lineNumber: line.innerHTML});
            else if(url == "http://localhost:3000/timetable/")
                location.href = '/stops?number?' + new URLSearchParams({lineNumber: line.innerHTML});
            else if(url == 'http://localhost:3000/user/timetable')
                location.href = '/user/stops?' + new URLSearchParams({lineNumber: line.innerHTML});
        })
    }



})();