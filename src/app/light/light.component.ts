import {Component, Input} from '@angular/core';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-light',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './light.component.html',
  styleUrl: './light.component.css'
})
export class LightComponent {

}
