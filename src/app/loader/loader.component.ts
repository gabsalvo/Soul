import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NgOptimizedImage} from "@angular/common";
import {AuthService} from "../services/auth.service";
import {CommandListenerService} from "../services/command-listener.service";
import { switchMap } from 'rxjs/operators';



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

  constructor(private auth: AuthService,
              private commandLevel: CommandListenerService,
              private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.url.pipe(
      switchMap(() => {
        // Qui puoi mettere la logica che vuoi eseguire ogni volta che la route viene visitata
        return this.loadUserLevel();
      })
    ).subscribe();
  }

  async loadUserLevel() {
    const currentUser = await this.auth.getCurrentUser();
    if (currentUser) {
      const level = await this.auth.getUserLevel(currentUser.uid);
      this.commandLevel.routeToLevel(level);
    }
  }
}
