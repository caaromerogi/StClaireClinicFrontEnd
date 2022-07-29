import { postMedicalSpecialty, getAllMedicalSpecialties } from "../actions/actions.js";
export function addMedicalSpecialty() {
    const addSpecialtyButton = document.querySelector('#create-medical-specialty');
    addSpecialtyButton.addEventListener('click', openForm);
}
export function openForm() {
    const setModalWindow = document.querySelector('.modal');
    setModalWindow.classList.add(`display`);
    const submitButton = document.querySelector('#submit-new-specialty');
    submitButton.addEventListener('click', submitNewSpecialty);
    const closeButton = document.querySelector('.close-button');
    closeButton.addEventListener('click', closeForm);
}
function closeForm() {
    const setModalWindow = document.querySelector('.modal');
    setModalWindow.classList.remove(`display`);
}
function submitNewSpecialty() {
    const name = document.querySelector('#new-specialty-name');
    const physician = document.querySelector('#new-physician');
    const newMedicalSpecialty = {
        id: null,
        name: name.value,
        physicianInCharge: physician.value,
        patients: []
    };
    postMedicalSpecialty(newMedicalSpecialty)
        .then(response => console.log(response));
    getAllMedicalSpecialties;
    name.value = "";
    physician.value = "";
    closeForm();
    console.log(newMedicalSpecialty);
}
