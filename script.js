function uploadData(source, outputClass) {
let activeData = JSON.parse(localStorage.getItem(source)) || [];
activeData.forEach(element => {
    let markup = `<li class="list-group-item d-flex justify-content-between">
    <span>${element.name}</span>
    <div class="bth-actions">
        <a class="btn-important text-dark" href=""><i class="bi fs-5 bi-exclamation-circle-fill"></i></a>
        <a class="btn-delete text-dark" href=""><i class="bi fs-5 bi-x-circle-fill"></i></a>
    </div>
    </li>`
    document.querySelector(outputClass).insertAdjacentHTML('beforeend', markup);});
}

function addItem(markup, outputClass) {
document.querySelector(outputClass).insertAdjacentHTML('beforeend', markup)
}

function clearInput(input) {
    input.value = ''
}

function addItemToLS(name, source, params = null) {
    let items = JSON.parse(localStorage.getItem(source)) || [];
    let newItem;
    if (items.length == 0) {
        newItem = {id:1, name, ...params};
    }
    else {
        const id = items[items.length-1].id + 1;
        newItem = {id, name, ...params}
    }
    items.push(newItem);
    localStorage.setItem(source, JSON.stringify(items))
}

document.querySelector('.btn-add').addEventListener('click', function(event) {
const input = event.target.parentElement.querySelector('input');
const li = `<li class="list-group-item d-flex justify-content-between">
<span>${input.value}</span>
<div class="bth-actions">
    <a class="btn-important text-dark" href=""><i class="bi fs-5 bi-exclamation-circle-fill"></i></a>
    <a class="btn-delete text-dark" href=""><i class="bi fs-5 bi-x-circle-fill"></i></a>
</div>
</li>`
addItemToLS(`${input.value}`, 'tasks')
addItem(li, '.list');
clearInput(input)
})

//function deleteItemFromLS() {}

document.querySelector('.btn-delete').addEventListener('click', function(event) {
    event.preventDefault();
    console.log(event.target);
    //deleteItemFromLS();
    //deleteItem();
})

uploadData('tasks', '.list');