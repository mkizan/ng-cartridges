import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocationsService } from '../../services/locations-service';
import { ILocation } from '../../models/location-interfaces';
import { TEXT } from '../../../../core/constants/text';

@Component({
  selector: 'app-location-form',
  imports: [ReactiveFormsModule],
  templateUrl: './location-form.html',
  styleUrl: './location-form.scss',
})
export class LocationForm implements OnInit {
  private formBuilder = inject(FormBuilder).nonNullable;
  protected readonly TEXT = TEXT;

  locationData = input<ILocation | undefined>();
  success = output<void>();

  locationForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    location: ['', [Validators.required, Validators.minLength(2)]],
  });

  constructor(private locationsService: LocationsService) {}

  ngOnInit(): void {
    if (this.locationData()) {
      this.locationForm.patchValue(this.locationData() as any);
    }
  }

  handleSubmit() {
    if (this.locationForm.invalid) return;

    const locationFormData = this.locationForm.getRawValue();

    const payload = {
      name: locationFormData.name || '',
      location: locationFormData.location || '',
    };

    console.log('Location Payload: ', payload);

    if (this.locationData()) {
      this.locationsService.editLocations(this.locationData()!.id, payload);
      this.success.emit();
    } else {
      this.locationsService.addLocation(payload);
      this.success.emit();
      this.locationForm.reset();
    }
  }

  get name() {
    return this.locationForm.get('name');
  }

  get location() {
    return this.locationForm.get('location');
  }
}
