let phoneBook = [
    {firstname: 'Hanna, Смачного!, please go to Add link, fill in the form',
    lastname: 'and add a new contact',  
    tel: 'then go back to the List',
    email: '',
    group: '',
    inf: 'Thank you!'}
];

let root = document.querySelector('#root');
let container = document.querySelector('.container');

let listLink = document.querySelector('#listLink');
let addLink = document.querySelector('#addLink');

root.append(phoneListMaker(phoneBook));


listLink.onclick = function(e) {
    e.preventDefault();
    root.innerHTML = '';
    root.append(phoneListMaker(phoneBook)); 

    let phBook = document.querySelector('#phBook');
    let contactIds = document.querySelectorAll('#contactId');

    phBook.onclick = function(e){
        e.preventDefault();
        let phoneNum;
        for(let a of contactIds){
            a.classList.remove('active');
            }
        if(e.target.tagName === 'A') {
            e.target.classList.add('active');
            phoneNum = e.target.querySelector('#telId').innerText;
        } else if (e.target.tagName === 'DIV' || e.target.tagName === 'P') {
            e.target.parentElement.classList.add('active');
            phoneNum = e.target.parentElement.querySelector('#telId').innerText;
        }else if(e.target.parentElement.tagName = 'DIV'){
            e.target.parentElement.parentElement.classList.add('active');
            phoneNum = e.target.parentElement.parentElement.querySelector('#telId').innerText;        
        } 

        let displayContact = phoneBook.find(function(item){
            return item.tel === phoneNum;
        })

        if(root.querySelector('#details')){
            root.querySelector('#details').remove();
        }
        root.append(detailsMaker(displayContact));
    }
}

function phoneListMaker(arr) {
    let divList = elemMaker('div');
    divList.id = 'phBook';
    divList.className = 'list-group col-sm-6';

    arr.forEach(function(contact){
        let a = elemMaker('a');
        a.id = 'contactId';
        a.href = '#';
        a.className = 'list-group-item list-group-item-action';

        let div = elemMaker('div');
        div.className = 'd-flex w-100 justify-content-between';

        let h5 = elemMaker('h5');
        h5.className = 'mb-1';
        h5.innerText = contact.firstname + ' ' + contact.lastname; 

        let small = elemMaker('small');
        small.innerText = contact.group;

        let p = elemMaker('p');
        p.id = 'telId';
        p.className = 'mb-1';
        p.innerText = contact.tel

        div.append(h5, small);
        a.append(div, p);
        divList.append(a);
    })
return divList;
}


function detailsMaker(obj) {
    let div = elemMaker('div');
    div.id = 'details';
    div.className = 'list-group col-sm-3';

    let a = elemMaker('a');
    a.href = '#';
    a.className = 'list-group-item list-group-item-action active';

    let divFlex = elemMaker('div');
    divFlex.className = 'd-flex w-100 justify-content-between';

    let h5 = elemMaker('h5');
    h5.className = 'mb-1';
    h5.innerText = obj.firstname + ' ' + obj.lastname; 

    let small = elemMaker('small');
    small.innerText = obj.group;

    let p1 = elemMaker('p');
    p1.className = 'mb-1';
    p1.innerText = obj.tel

    let p2 = elemMaker('p');
    p2.className = 'mb-1';

    let small2 = elemMaker('small');
    small2.innerText = 'inf:';

    let p3 = elemMaker('p');
    p3.className = 'mb-1'
    p3.innerText = obj.inf;

    divFlex.append(h5, small);
    a.append(divFlex, p1, p2, small2, p3);
    div.append(a);

    return div;
}




addLink.onclick = function() {
    root.innerHTML = '';
    root.append(form);

    return addBtn.onclick = function() {
        phoneBook.push({
            firstname: firstname.querySelector('#firstname').value,
            lastname: lastname.querySelector('#lastname').value,
            tel: tel.querySelector('#tel').value,
            email: email.querySelector('#email').value,
            group: select.querySelector('#group').value,
            inf: textArea.querySelector('#inf').value       
        })
        // firstname.querySelector('#firstname').value = '';
        // lastname.querySelector('#lastname').value = '';
        // tel.querySelector('#tel').value = '';
        // email.querySelector('#email').value = '';
        // select.querySelector('#group').value = '';
        // textArea.querySelector('#inf').value = '';
    }
}

let firstname = formItemMaker('First Name', 'firstname', 'Enter First name, please');
let lastname = formItemMaker('Last Name', 'lastname', 'Enter Last name, please');
let tel = formItemMaker('Telephone number', 'tel', 'Enter telephone number, please');
let email = formItemMaker('Email address', 'email', 'Enter email, please');
let select = selectMaker('Family', 'Friends', 'Work', 'Church');
let textArea = textAreatMaker('Additional information', 'inf');

let addBtn = elemMaker('button');
addBtn.type = 'submit';
addBtn.id = 'addBtn';
addBtn.className = 'btn btn-primary';
addBtn.innerText = 'Add';


let form = elemMaker('form');
form.className = 'col-sm-4';
form.append(firstname, lastname, tel, email, select, textArea, addBtn);


// -----------HELP FNs:---------------------//
function formItemMaker (label, id, subTxt) {
    let result = divMaker();
    result.append(labelMaker(id, label), inputMaker(id), smallMaker(subTxt));
    return result;
}

function elemMaker(el) {
    return document.createElement(el);
}

function formMaker() {
    let res = elemMaker('form');
    res.className = 'col-sm-4';
    return res;
}

function divMaker() {
    let div = elemMaker('div');
    div.className = 'form-group';
    return div;
}

function labelMaker(id, txt) {
    let label = elemMaker('label');
    label.for = id;
    label.innerText = txt;
    return label;
}

function inputMaker(id) {
    let input = elemMaker('input');
    input.type = 'text';
    input.className = 'form-control';
    input.id = id;
    return input;
}

function smallMaker(subTxt) {
    let small = elemMaker('small');
    small.className = 'form-text text-muted';
    small.innerText = subTxt;
    return small;
}


function selectMaker (...options) {
    let result = divMaker();
    let select = elemMaker('select');
    select.id = 'group';
    select.className = 'form-control';
    let small = smallMaker('Which Group');
    options.forEach(function(option){
        let opt = elemMaker('option');
        opt.innerText = option;
        select.append(opt);
    });
    result.append(select, small);
    return result;
}

function textAreatMaker(txt, id) {
    let result = divMaker();
    let label = labelMaker(id, txt);
    let textarea = elemMaker('textarea');
    textarea.id = id;
    textarea.className = 'form-control';
    textarea.rows = '4';
    result.append(label, textarea);
    return result;
}


// ---------------------------------------//




// {firstname: 'Alan',
//     lastname: 'Crutchfield',  
//     tel: '+380662315647',
//     email: 'alan@gmail.com',
//     group: 'work',
//     inf: 'sales manager'},

//     {firstname: 'Steve',
//     lastname: 'Bufford',  
//     tel: '+380736573246',
//     email: 's.buff@sweet.io',
//     group: 'work',
//     inf: 'backend friend)' },

//     {firstname: 'Lora',
//     lastname: 'Simon',  
//     tel: '+380671638898',
//     email: 'simsim@lorem.com',
//     group: 'friends',
//     inf: '' }