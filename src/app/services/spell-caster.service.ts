import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpellCasterService {
  private _maxMana = 100;
  readonly maxMana = this._maxMana;
  private _currentMana = new BehaviorSubject<number>(this._maxMana);
  currentMana$ = this._currentMana.asObservable();

  private _noManaSource = new BehaviorSubject<boolean>(false);
  noMana$ = this._noManaSource.asObservable();


  constructor() { }

  castSpell(manaCost: number): boolean {
    const currentMana = this._currentMana.getValue();
    // Modifica qui: Verifica se il mana è già a zero prima di tentare di eseguire un'azione.
    if (currentMana === 0) {
      this._noManaSource.next(true); // Emetti un evento di mana esaurito se il mana è a zero
      console.log("Cannot cast spell, no mana left!");
      return false;
    } else if (currentMana - manaCost < 0) {
      // Solo un log qui, non emettiamo l'evento di mana esaurito
      console.log("Not enough mana to cast the spell!");
      return false;
    } else {
      this._currentMana.next(currentMana - manaCost);
      console.log("Spell casted");
      return true;
    }
  }
}
