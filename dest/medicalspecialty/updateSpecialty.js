import { updateMedicalSpecialty } from "../actions/actions.js";
export function updateSpecialty(id) {
    const setModalWindow = document.querySelector('.modal-update-specialty');
    setModalWindow.classList.add(`display`);
    const submitButton = document.querySelector('#submit-update-specialty');
    submitButton.addEventListener('click', function () { submitUpdatedSpecialty(id); });
    const closeButton = document.querySelector('#close-update-specialty');
    closeButton.addEventListener('click', closeForm);
    const nameDefault = document.querySelector(`.medical-specialty-title-${id}`);
    console.log(nameDefault.innerHTML);
    const nameSpecialty = document.querySelector('#update-specialty-name');
    nameSpecialty.value = nameDefault.innerHTML;
    const physicianDefault = document.querySelector(`.physician-${id}`);
    const physician = document.querySelector('#update-physician');
    physician.value = physicianDefault.innerHTML.slice(4);
}
function closeForm() {
    location.reload();
    const setModalWindow = document.querySelector('.modal-new-specialty');
    setModalWindow.classList.remove(`display`);
}
function submitUpdatedSpecialty(id) {
    const name = document.querySelector('#update-specialty-name');
    const physician = document.querySelector('#update-physician');
    if (validation(name.value, physician.value)) {
        const newMedicalSpecialty = {
            name: name.value,
            physicianInCharge: physician.value
        };
        updateMedicalSpecialty(id, newMedicalSpecialty)
            .then(response => console.log(response));
    }
}
function validation(name, physician) {
    let state = true;
    if (name.length < 5) {
        alert('Name must have more than 5 char');
        state = false;
    }
    if (name.length > 100) {
        alert('Name must have less than 100 char');
        state = false;
    }
    if (physician.length < 10) {
        alert('Physician name must have more than 10 char');
        state = false;
    }
    if (physician.length > 45) {
        alert('Physician name must have less than 45 char');
        state = false;
    }
    return state;
}
