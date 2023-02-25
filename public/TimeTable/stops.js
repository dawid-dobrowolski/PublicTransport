let linie = document.querySelector('.linieBox');
let boxKierunek1 = document.querySelector('#kierunek1');
let boxKierunek2 = document.querySelector('#kierunek2');


    (async () => {
        const queryString = window.location.href.split('=')[1];
        document.getElementById("rozklad_linia").append(queryString);

        const rawResponse = await fetch('http://localhost:3000/secret/lineStops?' + new URLSearchParams({
            lineNumber: queryString
        }), {
            method: 'GET',
        });
        const content = await rawResponse.json();
        arr = (await content['stops']).split('|');
        stops = arr

        for (let a = 0; a < stops.length; a++) {
            let newOpt_list = document.createElement('div');
            let sign = document.createElement('i')
            sign.className = 'fas fa-chevron-down';
            newOpt_list.className = 'przystanek';
            newOpt_list.innerHTML = stops[a];
            boxKierunek1.appendChild(newOpt_list);
            if(a != stops.length-1){
                boxKierunek1.append(sign);
                sign.classList.add("przystanek");
            }

            if(a == stop.length){
                document.getElementById("title1").textContent += stops[stops.length-1];
            }
        }

        for (let a = 0; a < stops.length; a++) {
            let newOpt_list = document.createElement('div');
            let sign = document.createElement('i')
            sign.className = 'fas fa-chevron-down';
            newOpt_list.className = 'przystanek';
            newOpt_list.innerHTML = stops[stops.length-a-1];
            boxKierunek2.appendChild(newOpt_list);
            if(a != stops.length-1){
                boxKierunek2.append(sign);
                sign.classList.add("przystanek");
            }

            if(a == stop.length){
                document.getElementById("title2").textContent += stops[a];
            }
        }


})();
