export class SpecialNotes{
    effectiveDate: string;
    expirationDate: string;
    contractNotes: string;
    surcharge: any;
    arbsconts: string;
    constructor(){
        this.effectiveDate = "";
        this.expirationDate = "";
        this.contractNotes = "";
        this.surcharge = Array();
        this.arbsconts = "";
    }
}