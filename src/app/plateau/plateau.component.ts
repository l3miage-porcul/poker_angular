import { Component, Input } from '@angular/core';
import { carte } from '../type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-plateau',
  standalone: true,
  imports: [],
  templateUrl: './plateau.component.html',
  styleUrl: './plateau.component.css'
})
export class PlateauComponent {

  @Input() cartes!: Set<carte>;
  constructor() { 
    console.log(this.cartes);
  }
}
