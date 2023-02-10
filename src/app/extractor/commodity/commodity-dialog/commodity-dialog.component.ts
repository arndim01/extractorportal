import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-commodity-dialog',
  templateUrl: './commodity-dialog.component.html',
  styleUrls: ['./commodity-dialog.component.css']
})
export class CommodityDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CommodityDialogComponent>, 
  @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data)
  }

  ngOnInit() {
  }
  onNoClick(): void{
    this.dialogRef.close();
  }
}


