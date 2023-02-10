import { PipeTransform, Pipe } from "@angular/core";
import { Surcharge } from "../../shared/model/surcharge.model";



@Pipe({ name: 'SurchargeIncluded'})    
export class SurchargeIncluded implements PipeTransform {
    transform(allSurcharge: any){
        return allSurcharge.filter(surcharge => surcharge[3] == true );
    }
}
@Pipe({ name: 'SurchargeNotIncluded' })
export class SurchargeNotIncluded implements PipeTransform{
    transform(allSurcharge: any){
        return allSurcharge.filter(surcharge => surcharge[3] == false);
    }
}