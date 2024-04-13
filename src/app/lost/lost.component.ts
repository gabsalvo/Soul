import { Component } from '@angular/core';
import {LostService} from "../services/lost.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-lost',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './lost.component.html',
  styleUrl: './lost.component.css'
})
export class LostComponent {

  isVisible = false;

  constructor(private lostService: LostService) {
    this.lostService.getVisibility().subscribe((state: boolean) => {
      this.isVisible = state;
    });
  }

  reload() {
    window.location.reload();
  }

}
