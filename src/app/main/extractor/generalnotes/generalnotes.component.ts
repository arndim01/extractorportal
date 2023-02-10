import { Component, OnInit, ViewChild } from '@angular/core';
import { WorkflowService } from 'src/app/_services/contract/workflow.service';
import { ContractDetailsService } from 'src/app/_services/contract/contract-details.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { NotesDirectComponent } from './notes-direct/notes-direct.component';
import { NotesSpecificComponent } from './notes-specific/notes-specific.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { NotesService } from 'src/app/_services/contract/notes.service';
import { share } from 'rxjs/operators';
import { fadeInAnimation } from 'src/app/_animations';

@Component({
  selector: 'app-generalnotes',
  templateUrl: './generalnotes.component.html',
  styleUrls: ['./generalnotes.component.css'],
  animations:[fadeInAnimation]
})
export class GeneralnotesComponent implements OnInit {
  displayedColumns = ['main_value'];
  dataSource : MatTableDataSource<any>;
  selected$ : Observable<any>;
  selectedRow:boolean = false;
  selectedRowIndex: number;
  selection = new SelectionModel<any>(true, []);
  workflowClaimed : string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private workflowService: WorkflowService, private contractService: ContractDetailsService, private notesService: NotesService, public dialog: MatDialog) {

    this.workflowService.claimedWorkflow().subscribe(

      (response: any) => {
        if(response.status == 200){
          this.workflowClaimed = response.body.hashId;
          this.contractService.loadContractGeneralNotes(response.body.hashId).subscribe(

            (response: any) =>{
              if(response.status == 200){
                this.populateTableView(response.body);
              }
            },
            (err: HttpErrorResponse) => {

            }
          );
        }
      },
      (err: HttpErrorResponse) => {

      }
    );
   }

  ngOnInit() {
  }
  private populateTableView(notes: any){
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(notes);
      this.dataSource.paginator = this.paginator;
    });
  }
  
  isAllSelected(){
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  DisplayInfo(notes : any){
    this.selectedRow = true;
    this.selectedRowIndex = notes.gNotesId;
    console.log(notes);
    this.selected$ = this.notesService.getnotes(this.workflowClaimed, notes.gNotesId).pipe(share()).delay(500);
    
  }
  OpenNotes(notes : any){
    console.log(notes);
    let dialogRef = this.dialog.open( NotesDirectComponent, {
      minHeight: '500px',
      maxHeight: '610px',
      maxWidth: '100vw',
      width: '1300px',
      data: {rates:notes},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }
  OpenSpecialNotes(notes : any){
    let dialogRef = this.dialog.open( NotesSpecificComponent, {
      minHeight: '275px',
      maxHeight: '610px',
      maxWidth: '100vw',
      width: '1300px',
      data: {rates:notes},
      disableClose: true
    });
  }
}
