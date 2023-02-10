import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommodityService } from 'src/app/_services/contract/commodity.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-commodity-dialog',
  templateUrl: './commodity-dialog.component.html',
  styleUrls: ['./commodity-dialog.component.css']
})
export class CommodityDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CommodityDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any, private commodityService: CommodityService) { }

  ngOnInit() {
  }
  onNoClick(): void{
    this.commodityService.updateCommodity(this.data.passData).subscribe(
      (response: any) => {

      },
      (err: HttpErrorResponse) => {
        
      }

    );
    this.dialogRef.close();
  }
}
