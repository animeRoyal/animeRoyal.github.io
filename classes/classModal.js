class Modal {

    constructor() {
        this.button = document.querySelector('.start');
        this.modal = document.querySelector('.modal');
        this.form = document.querySelector('form');
        this.load = document.querySelector('.modal-form');
    }

show() {
    this.modal.classList.add('modal-show');
}

hide() {
    this.modal.classList.remove('modal-show');
}

sendFormData(data) {

    let dataObj = {};
    let i = 1;
    data.forEach((data) => {
        dataObj[`qq${i++}`] = data;
    })

    return dataObj;
}

loading() {
    this.load.innerHTML = "<div class='load-text'>Loading...</div><img src='./giphy.webp'/>";
}

}