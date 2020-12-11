const asideBtn = document.querySelector(".aside__btn");
const modal = document.querySelector(".modal");
let modalBool = true;

asideBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    if (modalBool) {
        modal.style.top = "40px";
        modal.style.opacity = "1";
        modal.style.visibility = "visible";
    }
    else {
        modal.style.top = "0px";
        modal.style.opacity = "0";
        modal.style.visibility = "hidden";
    }
    modalBool = !modalBool;
})
modal.addEventListener("click", (e) => {
    e.stopPropagation();
})




document.addEventListener("click", () => {
    modal.style.top = "0px";
    modal.style.opacity = "0";
    modal.style.visibility = "hidden";
    modalBool = true;
})






// users add
const users = [];
const user = {
    name: "",
    description: "",
    src: ""
}

const modalName = document.querySelector(".modal__inp_name");
const modalDescr = document.querySelector(".modal__descr");
const modalImg = document.querySelector(".modal__upload");
const modalSave = document.querySelector(".modal__save");
const form = document.querySelector(".modal__form");
const modalInfoImg = document.querySelector(".modal__info_img");

modalName.addEventListener("input", (e) => {
    user.name = e.target.value;
})
modalDescr.addEventListener("input", (e) => {
    user.description = e.target.value;
})
modalImg.addEventListener("change", function (e) {
    if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = imageIsLoaded;
        reader.readAsDataURL(this.files[0]);
    }
    function imageIsLoaded(e) {
        user.src = e.target.result;

        const img = document.createElement("img");
        img.src = e.target.result;
        img.setAttribute("class", "modal__img")
        modalInfoImg.append(img)
    }
})




// form
const appItems = document.querySelector(".app__items");
function create(what, where, classname){
    const item = document.createElement(what);
    item.setAttribute("class", classname);
    where.append(item);
    return item;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (user.name && user.description && user.src) {
        users.push({
            name: user.name,
            description: user.description,
            src: user.src
        })
        modalName.value = "";
        modalDescr.value = "";
        document.querySelector(".modal__img").remove()

        modal.style.top = "0px";
        modal.style.opacity = "0";
        modal.style.visibility = "hidden";
        modalBool = true;

        const appItem = create("div", appItems, "app__item")
        const itemInfo = create("div", appItem, "item__info")
        const itemInfoImg = create("div", itemInfo, "item__info_img")
        const itemImg = create("img", itemInfoImg, "item__img")
        itemImg.src = user.src;
        itemImg.alt = user.name;

        const itemInfoName = create("div", itemInfo, "item__info_name")
        const itemTitle = create("h2", itemInfoName, "item__title")
        itemTitle.innerHTML = user.name;
        const itemSubtitle = create("h3", itemInfoName, "item__subtitle")
        itemSubtitle.innerHTML = user.description;

        const itemPanel = create("div", appItem, "item__panel");
        const itemClose = create("div", itemPanel, "item__close");
        const itemCloseIcon = create("i", itemClose, "item__close-icon fas fa-times");

        const itemPanelDate = create("div", itemPanel, "item__panel_date");
        const itemDate = create("h3", itemPanelDate, "item__date");

        const date = new Date();
        itemDate.innerHTML = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`


        user.name = "";
        user.description = "";
        user.src = "";

        const close = document.querySelectorAll(".item__close-icon");
        const appItemAll = document.querySelectorAll(".app__item");

        close.forEach((item, i) => {
            item.addEventListener("click", () => {
                appItemAll[i].remove();
            })
        })
    }
    else{
        alert("Please fill the fields correctly.")
    }
})