import { medicalSpecialtyI } from "../interface/interfaces.js";

export async function getAllMedicalSpecialties(){
    const response:Response = await fetch('http://localhost:8080/api/');

    const data:medicalSpecialtyI[] = await response.json();

    return data;
}