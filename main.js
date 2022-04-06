const draggableList = document.getElementById("draggable-list")
const checkBtn = document.getElementById("check")

const richestPeople = [
    'Jeff Bezos',
    "Mark Zuckerberg",
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Mohammad Fathi',
    'Michael Bloomberg',
    'Larry Page'
]

let dragStartIndex
let listItems = []


crateList()

function crateList() {
    richestPeople
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((person, index) => {
            const listItem = document.createElement("li")
            listItem.setAttribute("data-index", index)
            listItem.classList = "flex"
            listItem.innerHTML = `<span class="number">${index + 1}</span>
                            <div class="draggable flex" draggable="true">
                                <p clas="person-name">${person}</p>
                                <i class="fas fa-grip-lines"></i>
                            </div>
      `
            draggableList.appendChild(listItem)
            listItems.push(listItem)
        })

    addEventListeners()
}

function dragStart() {
    //console.log("event: START")
    dragStartIndex = +this.closest("li").getAttribute("data-index")
}
function dragOver(e) {
    //console.log("event: OVER")
    e.preventDefault()
}
function dragEnter() {
    //console.log("event: ENTER")
    this.classList.add("over")
}
function dragLeave() {
    //console.log("event: LEAVE")
    this.classList.remove("over")
}
function dragDrop() {
    //console.log("event: DROP")
    const dragEndIndex = +this.getAttribute("data-index")
    swapItems(dragStartIndex, dragEndIndex)

    this.classList.remove("over")
}

function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector(".draggable")
    const itemTwo = listItems[toIndex].querySelector(".draggable")
    listItems[fromIndex].appendChild(itemTwo)
    listItems[toIndex].appendChild(itemOne)
}

function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector(".draggable").innerText.trim()

        if(personName !== richestPeople[index]) {
            listItem.classList.add("wrong")
        } else {
            listItem.classList.remove("wrong")
            listItem.classList.add("right")
        }
    })
}

function addEventListeners() {
    const draggables = document.querySelectorAll(".draggable")
    const dragleListItem = document.querySelectorAll(".draggable-list li")

    draggables.forEach(draggable => {
        draggable.addEventListener("dragstart", dragStart)
    })

    dragleListItem.forEach(item => {
        item.addEventListener("dragover", dragOver)
        item.addEventListener("drop", dragDrop)
        item.addEventListener("dragenter", dragEnter)
        item.addEventListener("dragleave", dragLeave)
    })
}

checkBtn.addEventListener("click", checkOrder)