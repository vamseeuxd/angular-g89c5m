import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uniqueId',
})
export class UniqueIdPipe implements PipeTransform {
  transform(value: number, args?: any): any {
    return getUniqueId(value);
  }
}

/**
 * generate groups of 4 random characters
 * @example getUniqueId(1) : 607f
 * @example getUniqueId(2) : 95ca-361a-f8a1-1e73
 */
export function getUniqueId(parts: number): string {
  const stringArr = [];
  for (let i = 0; i < parts; i++) {
    // tslint:disable-next-line:no-bitwise
    const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    stringArr.push(S4);
  }
  return stringArr.join('-');
}
