import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { SoundService } from "../../../services/sound.service";
import { CommandListenerService } from "../../../services/command-listener.service";
import { SpellCasterService } from "../../../services/spell-caster.service";
import { Subscription } from 'rxjs';
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

  constructor(
    private soundService: SoundService,
    private commandListener: CommandListenerService,
    private spellCaster: SpellCasterService
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
        }
      }
    }
  }

  onMeleeAttack(manaCost: number) {
    // Controlla se c'è abbastanza mana per l'attacco melee
    if (this.currentMana !== undefined && this.currentMana >= manaCost) {
      this.currentMana -= manaCost; // Riduce il mana
      // Potresti voler riprodurre un suono o eseguire altre azioni qui

      // Aggiorna il mana anche nel servizio se il mana è gestito centralmente
      this.spellCaster.useMana(manaCost);
    } else {
      console.log("Not enough mana for melee attack");
      // Gestisci la situazione in cui il mana non è sufficiente
    }
  }

  onBlock() {
    // Logica per bloccare o difendere
    console.log('Block action initiated');
    // Qui puoi aggiungere qualsiasi logica di gioco necessaria per l'azione di blocco
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
