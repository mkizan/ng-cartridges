import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartridgesService } from '../../services/cartridges-service';

@Component({
  selector: 'app-cartridge-filter',
  imports: [FormsModule],
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
