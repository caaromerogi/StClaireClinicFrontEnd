import { createPatient, getMedicalSpecialtyById } from "../actions/actions.js";
//Validate that patient doesn't exist already
export function createNewPatient(id) {
    const divModelForm = document.querySelector('.modal-new-patient');
    divModelForm.classList.add('display');
    const buttonClose = document.querySelector('#close-new-patient');
    buttonClose.addEventListener('click', closeForm);
    const buttonSubmit = document.querySelector('#submit-new-patient');
    buttonSubmit.addEventListener('click', function () { submitNewPatient(id); });
}
function closeForm() {
    const divModelForm = document.querySelector('.modal-new-patient');
    divModelForm.classList.remove('display');
    location.reload();
}
function submitNewPatient(id) {
    const inputName = document.querySelector('#new-patient-name');
    const inputDNI = document.querySelector('#new-patient-dni');
    const inputAge = document.querySelector('#new-patient-age');
    const inputDate = document.querySelector('#new-patient-date');
    if (validation(inputName.value, inputAge.value, inputDNI.value, inputDate.value, id)) {
        const newPatient = {
            id: null,
            name: inputName.value,
            dni: Number(inputDNI.value),
            age: String(inputAge.value),
            date: String(inputDate.value),
            numberOfAppointments: 1,
            dates: []
        };
        createPatient(id, newPatient).then(response => console.log(response));
        closeForm();
    }
}
function validation(name, inputAge, inputDNI, inputDate, idSpecialty) {
    let state = true;
    if (isNaN(Number(inputAge))) {
        alert('Age only admits number characters');
        state = false;
    }
    if (Number(inputAge) < 1) {
        alert('Age cannot be zero or less');
        state = false;
    }
    if (isNaN(Number(inputDNI))) {
        alert('DNI only admits number characters');
    }
    if (name.length < 10) {
        alert('Name must have at least 10 characters');
        state = false;
    }
    if (name.length > 45) {
        alert('Name must have maximun 45 characters');
        state = false;
    }
    if (!Date.parse(inputDate)) {
        alert('Bad date field');
        state = false;
    }
    getMedicalSpecialtyById(idSpecialty).then(medicalSpecialty => {
        medicalSpecialty.patients.forEach(patient => {
            if (patient.dni === Number(inputDNI)) {
                alert('The patient dni already exists, ask for a new date in Patients section');
                state = false;
                closeForm();
            }
        });
    });
    return state;
}
