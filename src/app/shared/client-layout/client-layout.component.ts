import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  providers: [HeaderService]
})
export class ClientLayoutComponent implements OnInit, AfterViewInit {
  ActiveMenue = 1;

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.headerService.subject.subscribe((newActiveMenue: any) => {
      this.ActiveMenue = newActiveMenue;
    });
  }





















}
