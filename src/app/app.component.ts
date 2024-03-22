import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokerService } from './poker.service';
import { carte, defaultCarte } from './type';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private pokerService : PokerService){};

  private readonly sigJoueur1 = new BehaviorSubject<Set<carte>>(new Set());
  private readonly sigJoueur2 = new BehaviorSubject<Set<carte>>(new Set());


  async piocherJoueur(Idjoueur: number): Promise<void> {

    const carteTiree = await this.pokerService.drawCards(2);
    Idjoueur === 1 ? this.sigJoueur1.next(carteTiree) : this.sigJoueur2.next(carteTiree);
  }
}
