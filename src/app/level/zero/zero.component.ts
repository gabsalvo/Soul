import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {LostComponent} from "../../lost/lost.component";
import { CommonModule } from '@angular/common';  // Importa CommonModule qui


@Component({
  selector: 'app-zero',
  standalone: true,
  imports: [
    NgOptimizedImage,
    LostComponent,
    CommonModule
  ],
  templateUrl: './zero.component.html',
  styleUrl: './zero.component.css'
})
export class ZeroComponent {

}
