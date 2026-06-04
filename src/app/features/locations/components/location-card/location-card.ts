import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { ILocation } from '../../models/location-interfaces';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-location-card',
  imports: [MatIconModule],
  templateUrl: './location-card.html',
  styleUrl: './location-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationCard {
  location = input<ILocation>()
}
