import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { SoundService } from "../../../services/sound.service";
import { CommandListenerService } from "../../../services/command-listener.service";
import { SpellCasterService } from "../../../services/spell-caster.service";
import { Subscription } from 'rxjs';
import {LostService} from "../../../services/lost.service";
import { NgClass, NgIf } from "@angular/common";

@Component({
  selector: 'app-zero-commands',
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './zero-commands.component.html',
  styleUrl: './zero-commands.component.css'
})
export class ZeroCommandsComponent implements OnInit, OnDestroy {
  currentMana: number | undefined;
  showCommands = false; // Tracks whether combat mode is enabled
  private manaSubscription!: Subscription;
  insufficientMana = false;
  private insufficientManaTimeout?: any;

  constructor(
    private soundService: SoundService,
    private commandListener: CommandListenerService,
    private spellCaster: SpellCasterService,
    private lostService: LostService,
  ) {}

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Toggle combat mode with "H" but don't disable it once enabled
    if (event.key.toLowerCase() === 'h') {
      this.showCommands = true; // Enable combat mode
      this.soundService.playNote('A4');
    } else if (this.showCommands) { // Process spell keys only if in combat mode
      this.processSpellKey(event);
    }
  }

  processSpellKey(event: KeyboardEvent) {
    const keyToSpellMap: { [key: string]: { note: string, manaCost?: number } } = {
      'KeyA': { note: 'Air', manaCost: 10 },
      'KeyE': { note: 'Earth', manaCost: 15 },
      'KeyF': { note: 'Fire', manaCost: 20 },
      'KeyW': { note: 'Water', manaCost: 25 },
    };

    const spell = keyToSpellMap[event.code];
    if (spell && !event.repeat) {
      if (spell.manaCost !== undefined) {
        const canCast = this.spellCaster.castSpell(spell.manaCost);
        if (canCast) {
          this.soundService.playNote(spell.note);
        } else {
          this.flashInsufficientMana();
        }
      }
    }
  }
  onMeleeAttack(manaCost: number) {
    // Controlla se c'è abbastanza mana per l'attacco melee
    if (this.currentMana !== undefined && this.currentMana >= manaCost) {
      this.currentMana -= manaCost; // Riduce il mana
      this.spellCaster.castSpell(manaCost); // Aggiorna il mana nel servizio
      // Qui potresti voler riprodurre un suono o eseguire altre azioni di successo
    } else {
      this.lostService.handleManaDepletion();
      console.log("Not enough mana for melee attack");
      this.flashInsufficientMana(); // Attiva il feedback visivo di mana insufficiente
    }
  }

  flashInsufficientMana(): void {
    this.insufficientMana = true;
    clearTimeout(this.insufficientManaTimeout); // Clear any existing timeout
    this.insufficientManaTimeout = setTimeout(() => this.insufficientMana = false, 250); // Reset after 1 second
  }

  ngOnInit(): void {
    this.manaSubscription = this.spellCaster.currentMana$.subscribe(mana => {
      this.currentMana = mana;
    });
  }

  ngOnDestroy(): void {
    if (this.manaSubscription) {
      this.manaSubscription.unsubscribe();
    }
    clearTimeout(this.insufficientManaTimeout);
  }

  get maxMana() {
    return this.spellCaster.maxMana;
  }
  getManaTextColor(): string {
    // If currentMana is undefined, default to 0 before comparing
    const safeCurrentMana = this.currentMana ?? 0;
    return safeCurrentMana > 50 ? 'text-amber-100' : 'text-black';
  }
}
