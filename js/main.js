const chips = document.querySelectorAll('.chip');

function selectChip(data) {
    console.log(data);
}

chips.addEventListener('click', selectChip)

// chips.forEach(element => element.addEventListener('click', selectChip));