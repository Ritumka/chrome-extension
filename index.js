import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js"
import { getDatabase,
        ref,
        push,
        onValue
 } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-bf48c-default-rtdb.firebaseio.com/"
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")

const inputEl = document.getElementById("input-el")
const inputBt = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    
    ulEl.innerHTML = listItems
    }

onValue(referenceInDB, function(snapshot) {
    const snapshotValues = snapshot.val()
    const leads = Object.values(snapshotValues)
    render(leads)
})

deleteBtn.addEventListener ("dblclick", function() {

})

inputBt.addEventListener("click", function() {
    push(referenceInDB, inputEl.value)
    inputEl.value = ""
})