
export interface medicalSpecialtyI{
    id:number|null,
    name:string,
    physicianInCharge:string
    patients:patientI[]
}

export interface patientI{
    id:number|null
    name:string,
    dni:number,
    age:string,
    date:string,
    numberOfAppointments:number,
    dates:dateI[]
}

export interface dateI{
    date:string
}