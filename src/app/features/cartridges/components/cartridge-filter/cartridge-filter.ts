import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CartridgesService } from '../../services/cartridges-service';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-cartridge-filter',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './cartridge-filter.html',
  styleUrl: './cartridge-filter.scss',
})
export class CartridgeFilter {
  private cartridgesService = inject(CartridgesService);
  searchQuery = signal('');
  selectedStatus = signal<string | null>(null);

  allCartridgeStatuses = this.cartridgesService.allCartridgeStatuses;

  updateSearchQuery(value: string) {
    this.searchQuery.set(value);
    this.cartridgesService.updateSearchQuery(value);
  }
  updateSelectedStatus(value: string) {
    this.selectedStatus.set(value);
    this.cartridgesService.updateStatusFilter(value);
  }
}
