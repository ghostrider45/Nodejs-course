
window.addEventListener('DOMContentLoaded', (event) => {
  var listItems = document.querySelectorAll('#list li');
  listItems.forEach(function(item) {
    item.addEventListener('click', function() {
      this.classList.toggle('completed');
    });
  });
});

function createCloseButton(item) {
  var closeButton = document.createElement('span');
  closeButton.innerHTML = '&times;';
  closeButton.classList.add('close');
  closeButton.addEventListener('click', function() {
    var li = this.parentElement;
    li.style.display = 'none';
  });
  item.appendChild(closeButton);
}

function newelem() {
  var inputValue = document.getElementById("item").value;
  if (inputValue === '') {
    alert("Please enter a task!");
  } else {
    var li = document.createElement("li");
    li.textContent = inputValue;
    createCloseButton(li);
    li.addEventListener('click', function() {
      this.classList.toggle('completed');
    });
    document.getElementById("list").appendChild(li);
  }
  document.getElementById("item").value = "";
}

function toggleListCompleted() {
  var list = document.getElementById("list");
  list.classList.toggle("completed");
}

