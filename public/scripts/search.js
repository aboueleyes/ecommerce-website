function trimSearchTerm(button) {
    let inputField = button.parentNode.querySelector('input[type="search"]');
    let searchTerm = inputField.value;
    searchTerm = searchTerm.trim();
    if (searchTerm === '') {
        inputField.value = '';
        inputField.focus();
        inputField.setCustomValidity('Please enter a search term !');
        inputField.reportValidity();
    }
    else {
        inputField.setCustomValidity('');
        button.form.submit();
    }
}