export interface Address {
    buildingAptNum: number;
    street: string;
    city: string;
    state: string;
    zip: string;
}

export interface Landlord {
firstName: string;
lastName: string;
middleName: string;
phone: string;
email: string;
}

export interface Furniture {
bed: number;
mattress: number;
table: number;
chair: number;
}

export interface Comment {
description: string;
createdBy: string;
timestamp: number;
_id: string;
}

export interface Report {
_id: string;
housingId: string;
title: string;
description: string;
createdBy: string;
timestamp: number;
status: string;
comments: Comment[];
__v: number;
}

export interface HouseInfo {
address: Address;
landlord: Landlord;
furniture: Furniture;
_id: string;
residentIds: string[];
facilityReportsIds: Report[];
__v: number;
}

export interface Car {
make: string;
model: string;
color: string;
}

export interface Resident {
car: Car;
_id: string;
userId: string;
firstName: string;
lastName: string;
middleName: string;
cellPhone: string;
email: string;
}

export interface Housing {
houseInfo: HouseInfo;
residents: (Resident | null)[];
}
