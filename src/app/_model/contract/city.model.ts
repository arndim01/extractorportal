export class CityDetails{
    Id: number;
    CityCode: string;
    Unlocs: Array<Unlocs>;
}

export class Unlocs {
    Id: number;
    City: string;
    State: string;
    Country: string;
    Ge: boolean;
    Unloc: string;
    Export: string;
    Import: string;
}
