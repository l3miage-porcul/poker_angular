import { Injectable } from '@angular/core';
import { carte, defaultCarte } from './type';

@Injectable({
  providedIn: 'root'
})
export class PokerService {

    private deckId: string = '';
    private nbCartesRestantes: number = 0;

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
        this.nbCartesRestantes = parseInt(data.remaining);

        // Retourner l'identifiant du jeu de cartes
        return deckId;
    }
    
    async drawCards(cardsNumber : number): Promise<carte> {
        
        const response = await fetch(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=${cardsNumber}`);
        const data = await response.json();
        
        for()
        const carte: carte = {
            code: data.cards[0].code,
            image: data.cards[0].images[0],
            value: data.cards[0].value,
            suit: data.cards[0].suit
        };
    
        return carte;
    } 
}