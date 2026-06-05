import { Component, computed, HostListener, inject } from '@angular/core';
import { ModalService } from '../../../../core/services/modal/modal-service';
import { CartridgeForm } from '../../../../features/cartridges/components/cartridge-form/cartridge-form';
import { TEXT } from '../../../../core/constants/text';
import { LocationForm } from '../../../../features/locations/components/location-form/location-form';

type ResourceType = 'cartridges' | 'locations';

interface FormConfig {
  createTitle: string;
  editTitle: string;
}
@Component({
  selector: 'app-modal',
  imports: [CartridgeForm, LocationForm],
  templateUrl: './modal.html',
  styleUrl: './modal.scss',
})
export class Modal {
  modalService = inject(ModalService);
  protected readonly TEXT = TEXT;

  isOpen = computed(() => this.modalService.activeModal().type !== null);

  private readonly formConfigMap: Record<ResourceType, FormConfig> = {
    cartridges: {
      createTitle: TEXT.titles.addCartridge,
      editTitle: TEXT.titles.editCartridge,
    },
    locations: {
      createTitle: TEXT.titles.addLocation,
      editTitle: TEXT.titles.editLocation,
    },
  };

  getFormConfig(base: string) {
    return this.formConfigMap[base as ResourceType] || this.formConfigMap.cartridges;
  }

  @HostListener('document:keydown.escape') handleOverlayKeydownEscape() {
    if (this.modalService.activeModal().type !== null) {
      this.modalService.closeModal();
    }
  }
}
