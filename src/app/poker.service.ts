import { Injectable } from '@angular/core';
import { carte, defaultCarte } from './type';

@Injectable({
  providedIn: 'root'
})
export class PokerService {

    private deckId: string = '';

    constructor() {
        this.getDeckId().then(deckId => {
            this.deckId = deckId;
        });
    }

    async getDeckId(): Promise<string> {

        // Récupérer l'identifiant du jeu de cartes
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        const data = await response.json();
        const deckId = data.deck_id;

        // Retourner l'identifiant du jeu de cartes
        return deckId;
    }
    
    async drawCards(cardsNumber : number) : Promise<Set<carte>> {
        
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=${cardsNumber}`);
        const data = await response.json();
        let cartes: Set<carte> = new Set();
        
        for (let i = 0; i < cardsNumber; i++) {
            
            const carte: carte = {
                code: data.cards[i].code,
                image: data.cards[i].images[0],
                value: data.cards[i].value,
                suit: data.cards[i].suit
            };

            cartes.add(carte);
        }

        return cartes;
    }
    
        
}