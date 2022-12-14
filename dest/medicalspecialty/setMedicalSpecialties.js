import { getAllMedicalSpecialties } from "../actions/actions.js";
import { displayPatientsInSpecialty } from "../patient/displayPatient.js";
import { createNewPatient } from "../patient/createNewPatient.js";
import { deleteSpecialty } from "./deleteSpecialty.js";
import { updateSpecialty } from "./updateSpecialty.js";
export function getSpecialties() {
    getAllMedicalSpecialties().then(medicalSpecialties => {
        recreateMedicalSpecialties(medicalSpecialties);
    });
}
function recreateMedicalSpecialties(medicalSpecialties) {
    medicalSpecialties.forEach(medicalSpecialty => createMedicalSpecialty(medicalSpecialty));
}
function createMedicalSpecialty(medicalSpecialty) {
    const specialtiesContainer = document.querySelector('.specialties-container');
    const specialtyContainer = document.createElement('div');
    specialtyContainer.className = 'specialty-container';
    specialtyContainer.classList.add(`specialty-${medicalSpecialty.id}`);
    const header = document.createElement('div');
    header.className = 'title';
    header.classList.add(`${medicalSpecialty.id}`);
    const specialty = document.createElement('h2');
    specialty.className = `medical-specialty-title-${medicalSpecialty.id}`;
    specialty.innerText = medicalSpecialty.name;
    const physicianInCharge = document.createElement('h3');
    physicianInCharge.className = `physician-${medicalSpecialty.id}`;
    physicianInCharge.innerText = "Dr. " + medicalSpecialty.physicianInCharge;
    const buttons = document.createElement('div');
    buttons.className = `buttons`;
    const buttonDelete = document.createElement('button');
    buttonDelete.className = `button`;
    buttonDelete.classList.add(`button-delete-${medicalSpecialty.id}`);
    buttonDelete.innerText = "Delete";
    buttonDelete.onclick = deleteMedicalSpecialty;
    const buttonUpdate = document.createElement('button');
    buttonUpdate.className = `button`;
    buttonUpdate.classList.add(`button-update-${medicalSpecialty.id}`);
    buttonUpdate.innerText = "Update";
    buttonUpdate.onclick = updateMedicalSpecialty;
    const buttonPatients = document.createElement('button');
    buttonPatients.className = `button`;
    buttonPatients.id = `patient-${medicalSpecialty.id}`;
    buttonPatients.classList.add(`button-patients-${medicalSpecialty.id}`);
    buttonPatients.innerText = "Patients";
    buttonPatients.onclick = showPatients;
    const buttonAddPatient = document.createElement('button');
    buttonAddPatient.innerText = 'Create New Patient';
    buttonAddPatient.className = 'button';
    buttonAddPatient.onclick = createPatient;
    header.append(specialty, physicianInCharge);
    buttons.append(buttonDelete, buttonUpdate, buttonPatients, buttonAddPatient);
    specialtyContainer.append(header, buttons);
    specialtiesContainer.append(specialtyContainer);
    function showPatients() {
        var _a;
        const id = Number((_a = buttonPatients.getAttribute('id')) === null || _a === void 0 ? void 0 : _a.split('-')[1]);
        displayPatientsInSpecialty(id);
    }
    function createPatient() {
        var _a;
        const id = Number((_a = buttonPatients.getAttribute('id')) === null || _a === void 0 ? void 0 : _a.split('-')[1]);
        createNewPatient(id);
    }
    function deleteMedicalSpecialty() {
        var _a;
        const id = Number((_a = buttonDelete.getAttribute('class')) === null || _a === void 0 ? void 0 : _a.split('-')[2]);
        deleteSpecialty(id);
    }
    function updateMedicalSpecialty() {
        var _a;
        const id = Number((_a = buttonUpdate.getAttribute('class')) === null || _a === void 0 ? void 0 : _a.split('-')[2]);
        updateSpecialty(id);
    }
}
