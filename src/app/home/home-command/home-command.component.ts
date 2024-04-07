import {Component, HostListener} from '@angular/core';
import {SoundService} from "../../services/sound.service";
import {CommandListenerService} from "../../services/command-listener.service";

@Component({
  selector: 'app-home-command',
  standalone: true,
  imports: [],
  templateUrl: './home-command.component.html',
  styleUrl: './home-command.component.css'
})
export class HomeCommandComponent {

  constructor(private pianoService: SoundService, private commandListener: CommandListenerService) {}

  // Piano Sounds
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyToPianoMap: { [key: string]: string } = {
      'KeyA': 'C4',
      'KeyS': 'D4',
      'KeyD': 'E4',
      'KeyF': 'F4',
      'KeyG': 'G4',
      'KeyH': 'A4',
      'KeyJ': 'B4',
      'KeyK': 'C5'
    };

    const note = keyToPianoMap[event.code];
    if (note && !event.repeat) {
      this.pianoService.playNote(note);
    }
  }

  // Execute Login when A and D are both pressed
  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    this.commandListener.handleKeyDown(event.key);
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    this.commandListener.handleKeyUp(event.key);
  }

}
