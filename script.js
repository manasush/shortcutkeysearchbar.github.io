const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
const searchInput = document.getElementById("search-input");
const autocomBox = document.querySelector(".autocom-box");
const outputBox = document.querySelector(".output-box");
const outputTitle = document.querySelector(".output-title");
const outputContent = document.querySelector(".output-content");

let selectedItemIndex = -1;

inputBox.addEventListener("keyup", (e) => {
  const userData = e.target.value;
  let emptyArray = [];

  if (userData) {
    icon.addEventListener("click", () => {
      const webLink = `https://www.google.com/search?q=${userData}`;
      window.open(webLink, "_blank");
    });

    emptyArray = suggestions.filter((data) =>
      data.toLowerCase().startsWith(userData.toLowerCase())
    );

    emptyArray = emptyArray.map((data) => `<li>${data}</li>`);

    searchWrapper.classList.add("active");
    showSuggestions(emptyArray);

    const allList = suggBox.querySelectorAll("li");
    allList.forEach((item, index) => {
      item.addEventListener("click", () => {
        inputBox.value = item.textContent;
        searchWrapper.classList.remove("active");
        showOutputResult(item.textContent);
      });

      item.addEventListener("mouseover", () => {
        selectedItemIndex = index;
        updateSelectedItem();
      });

      item.addEventListener("mouseout", () => {
        selectedItemIndex = -1;
        updateSelectedItem();
      });

      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          inputBox.value = item.textContent;
          selectedItemIndex = -1;
          autocomBox.innerHTML = "";
          searchWrapper.classList.remove("active");
          showOutputResult(item.textContent);
        }
      });
    });
  } else {
    searchWrapper.classList.remove("active");
  }
});

function showSuggestions(list) {
  const listData =
    list.length === 0 ? "<li>No suggestions found</li>" : list.join("");
  suggBox.innerHTML = listData;
}

function updateSelectedItem() {
  const suggestions = autocomBox.querySelectorAll("li");

  suggestions.forEach((item, index) => {
    item.classList.toggle("selected", index === selectedItemIndex);
  });
}

searchInput.addEventListener("keydown", (event) => {
  const suggestions = autocomBox.querySelectorAll("li");

  if (event.key === "ArrowUp") {
    event.preventDefault();
    selectedItemIndex = Math.max(selectedItemIndex - 1, -1);
    updateSelectedItem();
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    selectedItemIndex = Math.min(selectedItemIndex + 1, suggestions.length - 1);
    updateSelectedItem();
  } else if (event.key === "Enter") {
    event.preventDefault();
    if (selectedItemIndex > -1) {
      inputBox.value = suggestions[selectedItemIndex].textContent;
      selectedItemIndex = -1;
    }
    autocomBox.innerHTML = "";
    searchWrapper.classList.remove("active");
    showOutputResult(inputBox.value);
  }
});

function showOutputResult(selectedItem) {
  outputContent.textContent = selectedItem;
  outputBox.style.display = "block";
}
