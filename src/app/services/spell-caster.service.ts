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

  constructor() { }

  castSpell(manaCost: number): boolean {
    const currentMana = this._currentMana.getValue();
    if (currentMana - manaCost >= 0) {
      this._currentMana.next(currentMana - manaCost);
      console.log("Spell casted")
      return true; // Spell was successfully cast
    } else {
      console.log("Not enough mana!");
      return false; // Not enough mana to cast the spell
    }
  }
}
