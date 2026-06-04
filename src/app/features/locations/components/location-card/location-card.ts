import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { ILocation } from '../../models/location-interfaces';

@Component({
  selector: 'app-location-card',
  imports: [],
  templateUrl: './location-card.html',
  styleUrl: './location-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationCard {
  location = input<ILocation>()
}
