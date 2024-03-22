import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokerService } from './poker.service';
import { carte, defaultCarte } from './type';
import { BehaviorSubject } from 'rxjs';
import { PlateauComponent } from './plateau/plateau.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PlateauComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private pokerService : PokerService){};

  private readonly sigJoueur1 = new BehaviorSubject<Set<carte>>(new Set());
  private readonly sigJoueur2 = new BehaviorSubject<Set<carte>>(new Set());
  private readonly sigTable = new BehaviorSubject<Set<carte>>(new Set());

  public readonly joueur1 = toSignal(this.sigJoueur1, {requireSync: true});
  public readonly joueur2 = this.sigJoueur2.asObservable();
  public readonly table = this.sigTable.asObservable();


  async piocherCartes(idJoueur: number, nbCartes: number): Promise<void> {

    const cartesTirees = await this.pokerService.drawCards(nbCartes);
    console.log(cartesTirees);

    switch (idJoueur) {

      case 1:

        this.sigJoueur1.next(cartesTirees);
        break;

      case 2:

        this.sigJoueur2.next(cartesTirees);
        break;
      
      default:
            
        this.sigTable.next(cartesTirees);
        break;
    }
  }
}
