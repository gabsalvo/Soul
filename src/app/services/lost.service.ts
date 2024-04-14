import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SpellCasterService } from './spell-caster.service';

@Injectable({
  providedIn: 'root'
})
export class LostService {
  private manaSubscription: Subscription | null = null;
  private visibilitySource = new BehaviorSubject<boolean>(false);

  constructor(private spellCasterService: SpellCasterService) {
    this.monitorMana();
  }

  private monitorMana(): void {
    this.manaSubscription = this.spellCasterService.noMana$.subscribe(mana => {
      if (mana) {
        this.handleManaDepletion();
      }
    });
  }

  public handleManaDepletion(): void {
    console.log('Attempted to cast a spell with no mana left. Lost service activated');
    this.showLostOverlay();
  }

  showLostOverlay(): void {
    this.visibilitySource.next(true);
  }

  hideLostOverlay(): void {
    this.visibilitySource.next(false);
  }

  getVisibility(): BehaviorSubject<boolean> {
    return this.visibilitySource;
  }

  ngOnDestroy(): void {
    if (this.manaSubscription) {
      this.manaSubscription.unsubscribe();
    }
  }
}
