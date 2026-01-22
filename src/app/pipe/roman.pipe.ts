import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roman'
})

// transforms a number to its Roman numeral representation
export class RomanPipe implements PipeTransform {
  private romanMap = [
    { value: 1000, symbol: 'M' },
    { value: 900, symbol: 'CM' },
    { value: 500, symbol: 'D' },
    { value: 400, symbol: 'CD' },
    { value: 100, symbol: 'C' },
    { value: 90, symbol: 'XC' },
    { value: 50, symbol: 'L' },
    { value: 40, symbol: 'XL' },
    { value: 10, symbol: 'X' },
    { value: 9, symbol: 'IX' },
    { value: 5, symbol: 'V' },
    { value: 4, symbol: 'IV' },
    { value: 1, symbol: 'I' }
  ];

  transform(num: number): string {
    if (num <= 0 || !Number.isInteger(num)) {
      return '';
    }

    let result = '';
    for (const { value, symbol } of this.romanMap) {
      while (num >= value) {
        result += symbol;
        num -= value;
      }
    }
    return result;
  }
}
