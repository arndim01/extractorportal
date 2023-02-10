import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-arbs-dialog',
  templateUrl: './arbs-dialog.component.html',
  styleUrls: ['./arbs-dialog.component.css']
})
export class ArbsDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ArbsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  
      console.log(data);
  
  }

  ngOnInit() {
  }
  onNoClick(): void{
    this.dialogRef.close();
  }
}
