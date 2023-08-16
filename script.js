function uploadData(source, outputClass) {
    document.querySelector(outputClass).innerHTML = ''
let activeData = JSON.parse(localStorage.getItem(source)) || [];
activeData.forEach(element => {
    let markup = `<li id="${element.id}" class="list-group-item d-flex justify-content-between">
    <span ${element.important ? 'class="bold-text"' : ''}>${element.name}</span>
    <div class="bth-actions">
        <a class="btn-important text-dark" href=""><i class="bi fs-5 bi-exclamation-circle-fill"></i></a>
        <a class="btn-delete text-dark" href=""><i class="bi fs-5 bi-x-circle-fill"></i></a>
    </div>
    </li>`
    document.querySelector(outputClass).insertAdjacentHTML('beforeend', markup);
});
setDeleteListener('.btn-delete');
setImportantListener('.btn-important');
}


uploadData('tasks', '.list');


function clearInput(input) {
    input.value = ''
}

function addItemToLS(name, source, important = false, done = false) {
    let items = JSON.parse(localStorage.getItem(source)) || [];
    let newItem;
    if (items.length == 0) {
        newItem = {id:1, name, important, done};
    }
    else {
        const id = items[items.length-1].id + 1;
        newItem = {id, name, important, done}
    }
    items.push(newItem);
    localStorage.setItem(source, JSON.stringify(items))
}

function globalIdCounter(source) {
    let items = JSON.parse(localStorage.getItem(source)) || [];
    let itemId = 1 || items[items.length-1].id + 1 
    return itemId
}


function deleteItemFromLS(itemId, source) {
    let items = JSON.parse(localStorage.getItem(source));
    for (let k=0; k<items.length; k++) {
        if (items[k].id == itemId) {
        items.splice(k,1);    
        }
    localStorage.setItem(source, JSON.stringify(items));
    }
    uploadData('tasks', '.list');
}


document.querySelector('.btn-add').addEventListener('click', function(event) {
const input = event.target.parentElement.querySelector('input');
const li = `<li id="${globalIdCounter('tasks')}" class="list-group-item d-flex justify-content-between">
<span>${input.value}</span>
<div class="bth-actions">
    <a class="btn-important text-dark" href=""><i class="bi fs-5 bi-exclamation-circle-fill"></i></a>
    <a class="btn-delete text-dark" href=""><i class="bi fs-5 bi-x-circle-fill"></i></a>
</div>
</li>`
addItemToLS(`${input.value}`, 'tasks')
clearInput(input)
uploadData('tasks', '.list');
})


function setDeleteListener(groupClass) {
    let tempMassive = document.querySelectorAll(groupClass);
    console.log(tempMassive);
    tempMassive.forEach((element) => {
        element.addEventListener('click', function(event) {
            event.preventDefault();
            deleteItemFromLS(element.offsetParent.id, 'tasks');
        })
    })
}

function setImportantListener(groupClass) {
    let tempMassiveTwo = document.querySelectorAll(groupClass);
    console.log(tempMassiveTwo);
    tempMassiveTwo.forEach((element) => {
        element.addEventListener('click', function(event) {
            event.preventDefault();
            //element.offsetParent.querySelector('span').classList.toggle('bold-text');
            editImportantKey(element.offsetParent.id, 'tasks')
        })
    })
}

function editImportantKey(itemId, source) {
    let items = JSON.parse(localStorage.getItem(source));
    for (let k=0; k<items.length; k++) {
        if (items[k].id == itemId) {
            if (items[k].important == false) {
                delete items[k].important;
                items[k].important = true;
            }
            else {
                delete items[k].important;
                items[k].important = false;
            }
        }
    localStorage.setItem(source, JSON.stringify(items));
    }
    uploadData('tasks', '.list');
}