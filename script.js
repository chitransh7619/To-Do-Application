document.addEventListener("DOMContentLoaded", () => {
    const input = document.querySelector(".task-input");
    const ul = document.querySelector(".task-list");
    const addButton = document.querySelector(".add-task-button");

    addButton.addEventListener("click", addTask);

    function addTask() {
        const taskText = input.value.trim();
        if (taskText === "") {
            alert("Error: Adding empty task");
            return;
        }
        input.value = "";

        const li = document.createElement("li");
        li.classList.add("tasklist-item");

        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;

        const optionsButton = createOptionsButton();
        const dropdown = createDropdown();

        li.appendChild(taskSpan);
        li.appendChild(optionsButton);
        li.appendChild(dropdown);
        ul.appendChild(li);
    }

    function createOptionsButton() {
        const button = document.createElement("button");
        button.innerHTML = "&#8942;"; // Three dots symbol
        button.classList.add("options-button");
        button.addEventListener("click", toggleDropdown);
        return button;
    }

    function toggleDropdown(e) {
        const taskItem = e.target.parentElement;
        const dropdown = taskItem.querySelector(".dropdown-content");

        // Close all other dropdowns
        const allDropdowns = document.querySelectorAll(".dropdown-content");
        allDropdowns.forEach(dropdown => {
            if (dropdown !== taskItem.querySelector(".dropdown-content")) {
                dropdown.classList.remove("show");
            }
        });

        dropdown.classList.toggle("show");
    }

    function createDropdown() {
        const dropdown = document.createElement("div");
        dropdown.classList.add("dropdown-content");

        const inProgressOption = createDropdownOption("in-progress", "In Progress");
        const editOption = createDropdownOption("edit", "Edit");
        const deleteOption = createDropdownOption("delete", "Delete");

        dropdown.appendChild(inProgressOption);
        dropdown.appendChild(editOption);
        dropdown.appendChild(deleteOption);

        return dropdown;
    }

    function createDropdownOption(value, label) {
        const option = document.createElement("a");
        option.href = "#";
        option.textContent = label;
        option.setAttribute("data-value", value);
        option.addEventListener("click", handleDropdownOptionClick);
        return option;
    }

    function handleDropdownOptionClick(e) {
        e.preventDefault();
        const selectedOption = e.target.getAttribute("data-value");
        const taskItem = e.target.parentElement.parentElement;

        switch (selectedOption) {
            case "in-progress":
                taskItem.style.backgroundColor = "lightgreen";
                break;
            case "edit":
                const newText = prompt("Edit your task:", taskItem.querySelector("span").textContent);
                if (newText !== null && newText.trim() !== "") {
                    taskItem.querySelector("span").textContent = newText.trim();
                }
                break;
            case "delete":
                taskItem.remove();
                break;
            default:
                break;
        }

        const dropdown = taskItem.querySelector(".dropdown-content");
        dropdown.classList.remove("show");
    }

    // Close dropdowns when clicking outside of them
    window.addEventListener("click", function(e) {
        if (!e.target.matches(".options-button")) {
            const allDropdowns = document.querySelectorAll(".dropdown-content");
            allDropdowns.forEach(dropdown => {
                dropdown.classList.remove("show");
            });
        }
    });
});
