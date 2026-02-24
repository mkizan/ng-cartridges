import { Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ICartridgeStatuses,
  IFilterCriteria,
} from '../../models/cartridge-interfaces';

@Component({
  selector: 'app-cartridge-filter',
  imports: [FormsModule],
  templateUrl: './cartridge-filter.html',
  styleUrl: './cartridge-filter.css',
})
export class CartridgeFilter {
  searchQuery = signal('');
  selectedStatus = signal<string | null>(null);

  allCartridgeStatuses = input.required<ICartridgeStatuses[]>();

  filterChanged = output<IFilterCriteria>();

  private emitChange() {
    this.filterChanged.emit({
      query: this.searchQuery(),
      status: this.selectedStatus(),
    });
  }

  updateSearchQuery(value: string) {
    this.searchQuery.set(value);
    this.emitChange();
  }
  updateSelectedStatus(value: string) {
    this.selectedStatus.set(value);
    this.emitChange();
  }
}
