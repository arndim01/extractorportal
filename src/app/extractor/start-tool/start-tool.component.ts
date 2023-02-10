import { Component, OnInit } from '@angular/core';
import { RouteProgressService } from '../shared/route-progress.service';
@Component({
  selector: 'app-start-tool',
  templateUrl: './start-tool.component.html',
  styleUrls: ['./start-tool.component.css']
 
})
export class StartToolComponent implements OnInit {
  constructor(private routeProgress: RouteProgressService) {

   }
  ngOnInit() {
  }
}