let edititem = null;

const form1 = document.querySelector("#addForm");
let items = document.getElementById("items");
let submit = document.getElementById("submit");
form1.addEventListener("submit", addData);
items.addEventListener("click", function (e) {
     if (e.target.tagName === "BUTTON" && e.target.classList.contains("btn-danger")) {
          removeData(e.target);
     } else if (e.target.tagName === "SPAN") {
          toggleChecked(e.target);
     }
});
// Load data from local storage
const storedData = localStorage.getItem("items");
if (storedData) {
     const parsedData = JSON.parse(storedData);
     parsedData.forEach((item) => {
          const newitems = document.createElement("li");
          newitems.className = "list-group-item d-flex justify-content-between align-items-center w-75 mx-auto";

          const span = document.createElement("span");
          span.textContent = item.text;
          if (item.checked) {
               span.style.textDecoration = "line-through";
          }

          const buttondiv = document.createElement("div");
          buttondiv.innerHTML = `
               <button type="button" class="btn btn-primary btn-sm me-2" onclick="editData(this)">Edit</button>
               <button class="btn btn-danger btn-sm" onclick="removeData(this)">Delete</button>
          `;

          newitems.appendChild(span);
          newitems.appendChild(buttondiv);
          items.appendChild(newitems);
     });
}

// create a function for add items
function addData(e) {
     e.preventDefault();
     const newitem = document.getElementById("item");
     const newlist = document.getElementById("items");

     const newtext = newitem.value;
     if (submit.value !== "submit" && edititem !== null) {
          edititem.querySelector("span").textContent = newtext;
          submit.value = "submit";
          edititem = null;
     } else {
          const newitems = document.createElement("li");
          newitems.className = "list-group-item d-flex justify-content-between align-items-center w-75 mx-auto";

          const span = document.createElement("span");
          span.textContent = newtext;

          const buttondiv = document.createElement("div");
          buttondiv.innerHTML = `
          <button type="button" class="btn btn-primary btn-sm me-2" onclick="editData(this)">Edit</button>
          <button class="btn btn-danger btn-sm" onclick="removeData(this)">Delete</button>
     `;

          newitems.appendChild(span);
          newitems.appendChild(buttondiv);
          newlist.appendChild(newitems);
          newitem.value = "";

          // Save data to local storage
          const items = [];
          Array.prototype.forEach.call(newlist.children, (item) => {
               const span = item.querySelector("span");
               items.push({ text: span.textContent, checked: span.style.textDecoration === "line-through" });
          });
          localStorage.setItem("items", JSON.stringify(items));
     }
     e.target.reset();
}

// create a function for remove items
function removeData(button) {
     const listitem = button.closest("li");
     listitem.remove();

     // Save data to local storage
     const items = [];
     Array.prototype.forEach.call(document.getElementById("items").children, (item) => {
          const span = item.querySelector("span");
          items.push({ text: span.textContent, checked: span.style.textDecoration === "line-through" });
     });
     localStorage.setItem("items", JSON.stringify(items));
}

function editData(button) {
     const itemlist = button.closest("li");
     const span = itemlist.querySelector("span");
     const inputitem = document.getElementById("item");

     inputitem.value = span.textContent;

     submit.value = "update";

     edititem = itemlist;
}

function toggleChecked(span) {
     if (span.style.textDecoration === "line-through") {
          span.style.textDecoration = "none";
     } else {
          span.style.textDecoration = "line-through";
     }

     // Save data to local storage
     const items = [];
     Array.prototype.forEach.call(document.getElementById("items").children, (item) => {
          const span = item.querySelector("span");
          items.push({ text: span.textContent, checked: span.style.textDecoration === "line-through" });
     });
     localStorage.setItem("items", JSON.stringify(items));
}

// create a function for button
function toggle(ref, btnid) {
     document.getElementById(btnid).disabled = false;
}