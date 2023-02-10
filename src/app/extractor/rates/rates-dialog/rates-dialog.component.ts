import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatDialog } from '@angular/material';
import { RatesSpecialDialogComponent } from '../rates-special-dialog/rates-special-dialog.component';

@Component({
  selector: 'app-rates-dialog',
  templateUrl: './rates-dialog.component.html',
  styleUrls: ['./rates-dialog.component.css']
})
export class RatesDialogComponent implements OnInit {
  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<RatesDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  ngOnInit() {
  }
  onNoClick(): void{
    this.dialogRef.close();
  }

  SpecialDialog(index: string, notesInfo: string, passData: any, type: string): void{
    let dialogRef = this.dialog.open(RatesSpecialDialogComponent, {
      minHeight: '275px',
      maxHeight: '610px',
      maxWidth: '100vw',
      width: '800px',
      data: {info: notesInfo, pass: passData},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if( type == "RATELINE" ){
        let updatedObject = this.data.rates[5][index];
        console.log(updatedObject);
        for(let r  = 0; r < this.data.rates[5].length; r++ ){
          if( this.data.rates[5][r][0] == updatedObject[0] ){
            if( this.data.rates[5][r][3].length === updatedObject[3].length ){
              for(let i = 0; i < this.data.rates[5][r][3].length; i++){
                updatedObject[3][i][1][0][0] = new Date(updatedObject[3][i][1][0][0]).toLocaleDateString("MMddyyyy");
                updatedObject[3][i][1][0][1] = new Date(updatedObject[3][i][1][0][1]).toLocaleDateString("MMddyyyy");
                this.data.rates[5][r][3][i][1] = updatedObject[3][i][1];
              }
            }
           
          }
        }
      }
      else if( type == "GLOBAL" ){
        passData[0][0] =  new Date(passData[0][0]).toLocaleDateString("MMddyyyy");
        passData[0][1] =  new Date(passData[0][1]).toLocaleDateString("MMddyyyy");
      }
    })
  }
}
