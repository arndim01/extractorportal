import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { WorkflowService } from "../_services/contract/workflow.service";

@Injectable()
export class WorkflowResolver implements Resolve<any>{
    constructor(private workflowService: WorkflowService){

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.workflowService.getAllWorkflow();
    }
    
}