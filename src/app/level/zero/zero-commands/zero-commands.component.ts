import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import {SoundService} from "../../../services/sound.service";
import {CommandListenerService} from "../../../services/command-listener.service";
import {SpellCasterService} from "../../../services/spell-caster.service";
import { Subscription } from 'rxjs';
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-zero-commands',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './zero-commands.component.html',
  styleUrl: './zero-commands.component.css'
})
export class ZeroCommandsComponent implements OnInit, OnDestroy{
  currentMana: number | undefined;
  showCommands = false;
  private hKeySubscription!: Subscription;
  private manaSubscription!: Subscription;
  get maxMana() {
    return this.spellCaster.maxMana;
  }
  constructor(private soundService: SoundService, private commandListener: CommandListenerService, private spellCaster: SpellCasterService) {}

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyToPianoMap: { [key: string]: string } = {
      'KeyA': 'Air',
      'KeyE': 'Earth',
      'KeyF': 'Fire',
      'KeyW': 'Water',
      'KeyH': 'A4'
    };

    const note = keyToPianoMap[event.code];
    if (note && !event.repeat) {
      this.soundService.playNote(note);
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    this.commandListener.handleHKeyDown(event.key);
  }

  @HostListener('window:keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    this.commandListener.handleHKeyUp(event.key);
  }

  ngOnInit(): void {
    this.hKeySubscription = this.commandListener.hKeyPressed$.subscribe((pressed: boolean) => {
      if (pressed) {
        // Toggle the command display
        this.showCommands = !this.showCommands;
      }
    });
    this.spellCaster.currentMana$.subscribe(mana => {
      this.currentMana = mana;
    });

    this.manaSubscription = this.spellCaster.currentMana$.subscribe(mana => {
      this.currentMana = mana;
    });
  }

  ngOnDestroy(): void {
    // Clean up the subscription
    if (this.hKeySubscription) {
      this.hKeySubscription.unsubscribe();
      this.manaSubscription?.unsubscribe();
    }
  }

}
