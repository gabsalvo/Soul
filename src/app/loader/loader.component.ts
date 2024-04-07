import { Component, OnInit } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {AuthService} from "../services/auth.service";
import {CommandListenerService} from "../services/command-listener.service";

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent implements OnInit{

  constructor(private auth: AuthService, private commandLevel: CommandListenerService) {}

  async ngOnInit(){
    const currentUser = await this.auth.getCurrentUser();
    if (currentUser){
      const level = await this.auth.getUserLevel(currentUser.uid);
      this.commandLevel.routeToLevel(level);
    } else {
      return
    }
  }

}
