import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {registerWithGoogleDev} from "../../../firebase.config";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class CommandListenerService {
  private aKeyPressed = false;
  private dKeyPressed = false;
  private hKeyPressed = false;
  private commandPressedSource = new Subject<void>();
  commandPressed$ = this.commandPressedSource.asObservable();
  private hKeyPressSource = new Subject<boolean>();
  hKeyPressed$ = this.hKeyPressSource.asObservable();

  constructor(private router: Router) { }

  handleADKeyDown(key: string) {
    if (key.toLowerCase() === 'a') {
      this.aKeyPressed = true;
    } else if (key.toLowerCase() === 'd') {
      this.dKeyPressed = true;
    }
    this.checkKeysADAndExecuteCommand();
  }

  handleADKeyUp(key: string) {
    if (key.toLowerCase() === 'a') {
      this.aKeyPressed = false;
    } else if (key.toLowerCase() === 'd') {
      this.dKeyPressed = false;
    }
  }

  handleHKeyDown(key: string) {
    if (key.toLowerCase() === 'h') {
      this.hKeyPressed = true;
    }
    this.checkKeysHAndExecuteCommand();
  }

  handleHKeyUp(key: string) {
   if (key.toLowerCase() === 'h') {
      this.hKeyPressed = false;
    }
  }

  private checkKeysADAndExecuteCommand() {
    if (this.aKeyPressed && this.dKeyPressed) {
      this.executeLoginCommand().then(r => {return true});
    }
  }
  private checkKeysHAndExecuteCommand() {
    this.hKeyPressSource.next(this.hKeyPressed);
    if (this.hKeyPressed) {
      this.executeLevelCommand();
    }
  }

  private routeToLoader() {
    this.router.navigate(['/loading']).then(r =>{return r});
  }

   routeToLevel(level:number | null) {
    this.router.navigate([`/level_${level}`]).then(r => {return r});
  }

  private async executeLoginCommand() {
    try {
      await registerWithGoogleDev(); // Supponendo che sia una funzione async
      this.routeToLoader(); // Reindirizza all'animazione di caricamento
    } catch (error) {
      console.error('Error during login', error);
    }
    // Resetta lo stato dei tasti in ogni caso
    this.aKeyPressed = false;
    this.dKeyPressed = false;
  }

  private executeLevelCommand() {
    console.log("h has been pressed");
  }

}
