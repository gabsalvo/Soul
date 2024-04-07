import { Component, HostListener } from '@angular/core';
import {SoundService} from "../../../services/sound.service";
import {CommandListenerService} from "../../../services/command-listener.service";

@Component({
  selector: 'app-zero-commands',
  standalone: true,
  imports: [],
  templateUrl: './zero-commands.component.html',
  styleUrl: './zero-commands.component.css'
})
export class ZeroCommandsComponent {
  constructor(private pianoService: SoundService, private commandListener: CommandListenerService) {}

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

}
