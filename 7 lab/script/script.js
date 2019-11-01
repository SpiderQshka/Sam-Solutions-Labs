const output = document.getElementById('output');
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');
const btn4Stop = document.getElementById('btn4Stop');
const select = document.getElementById('select');

btn1.onclick = () => firstTask()

btn2.onclick = () => secondTask()

btn3.onclick = () => thirdTask()

btn4.onclick = () => fourthTask()

btn4Stop.onclick = () => stop()

const firstTask = async () => {
    select.innerHTML = '';

    const response = await fetch('https://api.github.com/users/spiderqshka/repos');

    const result = await response.json()

    result.sort((a, b) => 
        new Date(a.created_at) - new Date(b.created_at)
    )

    result.forEach(repo => {
        const option = document.createElement('option');
        option.innerHTML = `Name: ${repo.name}, creationTime: ${new Date(repo.created_at)}`;
        select.appendChild(option);
    })
}

const secondTask = async () => {
    const xhr = new XMLHttpRequest();
    let xhrResult;

    xhr.open('GET', 'https://api.github.com/users/spiderqshka/repos');

    xhr.send();

    xhr.onload = () => {
        output.innerHTML = '';
        xhrResult = (JSON.parse(xhr.response))
        const bestRepo = xhrResult.reduce(
            (result, current) =>
                current.created_at > (result.created_at || 0) ? 
                    current :
                    result
        )
        const element = document.createElement('p');
        element.innerHTML = `Newest repo: ${bestRepo.name}. <br> P.S. Sorted by creation date cause github 
        has some troubles with updating watches, approved by mentor`;
        output.appendChild(element);
    }
}

const thirdTask = async () => {
    output.innerHTML = '';

    const response = await fetch('https://api.github.com/users/spiderqshka/repos');

    const result = await response.json()

    const detailInfo = document.createElement('ul');

    randomRepo = result[0];

    for(let key in randomRepo){
        const li = document.createElement('li');
        li.innerHTML = `${key}: ${randomRepo[key]}`;
        detailInfo.appendChild(li);
    }
    
    output.appendChild(detailInfo)

}

// ______________________________________________________________________________

const fourthTask = () => recursion()

let timeout;

function recursion(){
    firstTask();
    secondTask();
    timeout = setTimeout(recursion, 1000);
}

function stop(){
    clearTimeout(timeout)
}