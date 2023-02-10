import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotesDirectComponent } from '../notes-direct/notes-direct.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-notes-specific',
  templateUrl: './notes-specific.component.html',
  styleUrls: ['./notes-specific.component.css']
})
export class NotesSpecificComponent implements OnInit {
  filteredCode: any = [];
  conditionForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<NotesDirectComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { 

    console.log(data);
  }

  ngOnInit() {
    this.conditionForm = this.fb.group({
      surchargeInput: null
    });
    
  }
  onNoClick(): void{
    this.dialogRef.close();
  }

}
