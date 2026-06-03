import { inject, Injectable, OnInit, signal } from '@angular/core';
import { ILocation } from '../models/location-interfaces';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../../shared/utils/server-url';

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  private http = inject(HttpClient);
  private locations = signal<ILocation[]>([])
  readonly readLocations = this.locations.asReadonly();

  constructor() { this.getLocations()}

  getLocations() {
    this.http.get<ILocation[]>(`${BASE_URL}/locations`).subscribe({
      next: data => {
        this.locations.set(data)
      },
      error: (err) => console.error('Load error', err)
    })
  }
  
  addLocation(locationData: Omit<ILocation, 'id'>) {
    const tempId = `temp-${Date.now()}`;
    const tempLocation: ILocation = {
      id: tempId,
      ...locationData,
    };

    // Add to UI immediately for better UX
    this.locations.update(oldLocations=> [...oldLocations, tempLocation])

    this.http.post<ILocation>(`${BASE_URL}/locations`, locationData).subscribe({
      next: (saved) => {
        this.locations.update(locations => locations.map((location => location.id === tempId ? saved : location)))
      },
      error: () => {
        this.locations.update(locations => locations.filter(location => location.id !== tempId));
      }
    })
  }

  editLocations(id: string, locationData: Omit<ILocation, 'id'>) {
    this.http.patch<ILocation>(`${BASE_URL}/locations/${id}`, { ...locationData }).subscribe({
      next: (editedLocation: ILocation) => {
        this.locations.update(items=>items.map(item=>item.id === editedLocation.id ? {...item, ...editedLocation} : item))
      },
      error: () => {
        this.locations.update(locations => locations.filter(location=> location.id !== id))
      }
    })
  }

  removeLocation(id: string) {
    const prevLocations = this.locations()
    this.locations.update(currentLocations => currentLocations.filter(location => location.id !== id));
    this.http.delete(`${BASE_URL}/locations/${id}`).subscribe({
      error: ()=>{this.locations.set(prevLocations)}
    })
  }

}
