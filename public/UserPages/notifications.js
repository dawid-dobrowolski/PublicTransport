let powiadomienia = document.querySelector('.powiadomienia');

(async () => {
    const rawResponse = await fetch('http://localhost:3000/secret/getNotifi', {
        method: 'GET',
    });

    const content = await rawResponse;
    text = (await content.text())
    arr = text.split('|');

    console.log(arr[0]);
    if(text == "") {
        let newOpt_list = document.createElement('div');
        newOpt_list.className = 'notificationBox';
        newOpt_list.innerHTML = "Aktualnie nie masz żadnego powiadomienia!";
        powiadomienia.appendChild(newOpt_list);
        return;
    }

    for (let a = 0; a < arr.length; a++) {
        let newOpt_list = document.createElement('div');
        newOpt_list.className = 'notificationBox';
        newOpt_list.innerHTML = arr[a];
        powiadomienia.appendChild(newOpt_list);
    }
})
();
