import { updatePatientDates } from "../actions/actions.js";
export function updatePatient(id) {
    const divModelForm = document.querySelector('.modal-new-date');
    divModelForm.classList.add('display');
    const buttonClose = document.querySelector('#close-new-date');
    buttonClose.addEventListener('click', closeForm);
    const buttonSubmit = document.querySelector('#submit-new-date');
    buttonSubmit.addEventListener('click', function () { submitNewDate(id); });
}
function closeForm() {
    location.reload();
    const divModelForm = document.querySelector('.modal-new-date');
    divModelForm.classList.remove('display');
}
function submitNewDate(id) {
    const inputDate = document.querySelector('#new-date');
    if (validate(inputDate.value)) {
        const newDate = {
            date: inputDate.value
        };
        updatePatientDates(id, newDate).then(response => console.log(response));
        alert('The new date was added succesfully');
        closeForm();
    }
    closeForm();
}
function validate(date) {
    let status = true;
    if (!Date.parse(date)) {
        alert('Bad date input');
        status = false;
    }
    return status;
}
