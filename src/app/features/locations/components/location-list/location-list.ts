import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { LocationsService } from '../../services/locations-service';
import { LocationCard } from "../location-card/location-card";
import { AddLocation } from "../add-location/add-location";

@Component({
  selector: 'app-location-list',
  imports: [LocationCard, AddLocation],
  templateUrl: './location-list.html',
  styleUrl: './location-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationList {
  private locationsService = inject(LocationsService);
  locations = this.locationsService.readLocations;
}
