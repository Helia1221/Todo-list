function uploadData(source, outputClass) {
    document.querySelector(outputClass).innerHTML = ''
let activeData = JSON.parse(localStorage.getItem(source)) || [];
activeData.forEach(element => {
    let markup = `<li id="${element.id}" class="list-group-item d-flex justify-content-between">
    <span class="li-span${element.important ? ' is-important' : ''}${element.done ? ' is-done' : ''}">${element.name}</span>
    <div class="bth-actions">
        <a class="btn-important text-dark" href=""><i class="bi fs-5 bi-exclamation-circle-fill"></i></a>
        <a class="btn-delete text-dark" href=""><i class="bi fs-5 bi-x-circle-fill"></i></a>
    </div>
    </li>`
    document.querySelector(outputClass).insertAdjacentHTML('beforeend', markup);
});
setDeleteListener('.btn-delete');
setImportantListener('.btn-important');
setDoneListener('.li-span');
applyCorrectFilter();
setCornerCounter('tasks');
}


uploadData('tasks', '.list');


function setCornerCounter (source) {
    let total = 0;
    let done = 0;
    let items = JSON.parse(localStorage.getItem(source)) || [];
    if (items.length == 0) {
        document.querySelector('#active').textContent = '0';
        document.querySelector('#done').textContent = '0';
        return;
    }
    items.forEach(element => {
        total += 1;
        console.log(element)
        console.log(total)

        if (element.done == true) {
            done += 1;
            console.log(done)
        }
    })
    document.querySelector('#active').textContent = total;
    document.querySelector('#done').textContent = done;
}


function applyCorrectFilter() {
    let tempMassive = document.querySelectorAll('.btn-group .btn');
            setButtonListener('.btn-group .btn:nth-of-type(1)', filterAll)
            setButtonListener('.btn-group .btn:nth-of-type(2)', filterFocused)
            setButtonListener('.btn-group .btn:nth-of-type(3)', filterDone)
            if (tempMassive[0].classList.contains('btn-primary')) {
                filterAll();}
            if (tempMassive[1].classList.contains('btn-primary')) {
                filterFocused();}
            if (tempMassive[2].classList.contains('btn-primary')) {
                filterDone();}
}



function setButtonListener (buttonPathClass, filterFunction) {
    let tempMassive = document.querySelectorAll('.btn-group .btn');
    document.querySelector(buttonPathClass).addEventListener('click', function() {
        tempMassive.forEach((element) => {
            if (element == this) {
                if (element.classList.contains('btn-primary')) {
                    return;
                }
                else {
                    element.classList.remove('btn-outline-dark')
                    element.classList.add('btn-primary')
                }}
            else {
                if (element.classList.contains('btn-primary')) {
                    element.classList.remove('btn-primary')
                    element.classList.add('btn-outline-dark')
                }
                else {
                    return;
                }}
            filterFunction()
        })})}


function filterAll () {
    let filterList = document.querySelectorAll('.list li');
    filterList.forEach(element => {
        if (element.classList.contains('hidden')) {
            element.classList.remove('hidden');
        }})}

function filterFocused () {
    let filterList = document.querySelectorAll('.list li');
    filterList.forEach(element => {
        if (element.classList.contains('hidden')) {
            element.classList.remove('hidden');
        }
        if (!element.firstElementChild.classList.contains('is-important')) {
            element.classList.add('hidden');
        }})}

function filterDone () {
    let filterList = document.querySelectorAll('.list li');
    filterList.forEach(element => {
        if (element.classList.contains('hidden')) {
            element.classList.remove('hidden');
        }
        if (!element.firstElementChild.classList.contains('is-done')) {
            element.classList.add('hidden');
        }})}


/*document.querySelector('.btn-group .btn:nth-of-type(1)').addEventListener('click', function() {
    let tempMassive = this.parentElement.querySelectorAll('.btn');
    tempMassive.forEach(element => {
        console.log(this);
        console.log(element == this)
        element.classList.remove('btn-primary');
        element.classList.remove('btn-outline-dark');
    })
    this.classList.add('btn-primary');
    tempMassive.forEach(element => {
        if (!element.classList.contains('btn-primary')) {
            element.classList.add('btn-outline-dark');
        }
    })
    filterFunction
});*/
/*document.querySelector('.btn-group .btn:nth-of-type(2)').addEventListener('click', function() {
    let tempMassive = this.parentElement.querySelectorAll('.btn');
    tempMassive.forEach(element => {
        element.classList.remove('btn-primary');
        element.classList.remove('btn-outline-dark');
    })
    this.classList.add('btn-primary');
    tempMassive.forEach(element => {
        if (!element.classList.contains('btn-primary')) {
            element.classList.add('btn-outline-dark');
        }
    })
    let filterList = document.querySelectorAll('.list li');
    filterList.forEach(element => {
        if (element.classList.contains('hidden')) {
            element.classList.remove('hidden');
        }
        if (!element.firstElementChild.classList.contains('is-important')) {
            element.classList.add('hidden');
        }
    })
});*/
/*document.querySelector('.btn-group .btn:nth-of-type(3)').addEventListener('click', function() {
    let tempMassive = this.parentElement.querySelectorAll('.btn');
    tempMassive.forEach(element => {
        element.classList.remove('btn-primary');
        element.classList.remove('btn-outline-dark');
    })
    this.classList.add('btn-primary');
    tempMassive.forEach(element => {
        if (!element.classList.contains('btn-primary')) {
            element.classList.add('btn-outline-dark');
        }
    })
    let filterList = document.querySelectorAll('.list li');
    filterList.forEach(element => {
        if (element.classList.contains('hidden')) {
            element.classList.remove('hidden');
        }
        if (!element.firstElementChild.classList.contains('is-done')) {
            element.classList.add('hidden');
        }
    })
});*/


document.querySelector('.search-form').oninput = function () {
    let searchValue = this.value.trim();
    let searchList = document.querySelectorAll('.list li');
    if (searchValue != '') {
        searchList.forEach(function(element){
            if (element.firstElementChild.textContent.search(searchValue) == -1) {
                element.classList.add('hidden-by-search');
            }
            else {
                element.classList.remove('hidden-by-search');
            }
        });
    }
    else {
        searchList.forEach(function(element){
            element.classList.remove('hidden-by-search');
    })}
}

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
const searchInput = document.querySelector('.search-form');
if (input.value === '') {
    return;
}
/*const li = `<li id="${globalIdCounter('tasks')}" class="list-group-item d-flex justify-content-between">
<span>${input.value}</span>
<div class="bth-actions">
    <a class="btn-important text-dark" href=""><i class="bi fs-5 bi-exclamation-circle-fill"></i></a>
    <a class="btn-delete text-dark" href=""><i class="bi fs-5 bi-x-circle-fill"></i></a>
</div>
</li>`*/
addItemToLS(`${input.value}`, 'tasks');
clearInput(input);
clearInput(searchInput);
dropFilter();
uploadData('tasks', '.list');
})

function dropFilter () {
    let tempMassive = document.querySelectorAll('.btn-group .btn');
    for (let i = 1; i<tempMassive.length; i++) {
        if (tempMassive[i].classList.contains('btn-primary')) {
            tempMassive[i].classList.toggle('btn-primary');
            tempMassive[i].classList.toggle('btn-outline-dark');
            tempMassive[0].classList.toggle('btn-outline-dark');
            tempMassive[0].classList.toggle('btn-primary');
        }}}

function setDeleteListener(groupClass) {
    let tempMassive = document.querySelectorAll(groupClass);
    tempMassive.forEach((element) => {
        element.addEventListener('click', function(event) {
            event.preventDefault();
            deleteItemFromLS(element.offsetParent.id, 'tasks');
        })})}

function setImportantListener(groupClass) {
    let tempMassiveTwo = document.querySelectorAll(groupClass);
    tempMassiveTwo.forEach((element) => {
        element.addEventListener('click', function(event) {
            event.preventDefault();
            //element.offsetParent.querySelector('span').classList.toggle('bold-text');
            editImportantKey(element.offsetParent.id, 'tasks')
        })})}

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

function setDoneListener (groupClass) {
    let tempMassive = document.querySelectorAll(groupClass);
    tempMassive.forEach(element => {
        element.addEventListener('click', function(event) {
            editDoneKey(element.offsetParent.id, 'tasks', 'done')
        })})}

function editDoneKey (itemId, source, keyName) {
    let items = JSON.parse(localStorage.getItem(source));
   items.forEach(element => {
        if (element.id == itemId) {
            if (element[keyName] == false) {
                delete element[keyName];
                element[keyName] = true;
            }
            else {
                delete element[keyName];
                element[keyName] = false;
            }
        }
      localStorage.setItem(source, JSON.stringify(items));   
    })
    uploadData('tasks', '.list');
}