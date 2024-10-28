import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about-pokemon',
  templateUrl: './about-pokemon.component.html',
  styleUrl: './about-pokemon.component.scss',
})
export class AboutPokemonComponent implements OnInit {
  constructor(private _activeRouter: ActivatedRoute) {}

  @Input() pokemonId?: string;
  @Input() pokemonName?: string;
  @Input() pokemonImage?: string;
  @Input() pokemonTypes?: { type: { name: string } }[];
  @Input() pokemonDesc?: string;

  ngOnInit(): void {
    this.getId;
  }

  getId() {
    const id = this._activeRouter.snapshot.params['id'];
    console.log(id);
  }
}
