import { max } from 'rxjs';

export const TEXT = {
  fields: {
    totalCartridges: 'Всього картриджів',
    actionsTitle: 'Дії',
    sku: 'SKU',
    compatiblePrinters: 'Сумісні принтери',
    alternativeCartridges: 'Альтернативні картриджі',
    responsible: 'Відповідальний',
    location: 'Розташування',
    lastRefillDate: 'Дата ост. заправлення',
    nextRefillDate: 'Дата наст. заправлення',
    barcode: 'Штрихкод',
    brand: 'Бренд',
    model: 'Модель',
    status: 'Статус',
    notes: 'Примітки',
  },
  buttons: {
    add: 'Додати',
    edit: 'Редагувати',
    delete: 'Видалити',
    showBarcode: 'Показати штрихкод',
    changeStatus: 'Змінити статус',
    addCartridge: 'Додати картридж',
    editCartridge: 'Редагувати картридж',
  },
  validation: {
    required: "Це поле є обов'язковим",
    skuLength: 'SKU має містити 13 цифр',
    invalidBarcode: 'Штрихкод має містить лише цифри',
    minimalLengthBrand: 'Бренд має містити щонайменше 2 символи',
    minimalLengthModel: 'Модель має містити щонайменше 2 символи',
    minimalLengthCompatiblePrinters:
      'Сумісні принтери мають містить щонайменше 1 символ',
    minimalLengthLocation: 'Розташування має містить щонайменше 2 символи',
    minimalLengthResponsible: 'Відповідальний має містити щонайменше 2 символи',
  },
} as const;
