import { genId } from '../helper/id';

export interface IPerson {
  name: string;
  attending?: boolean;
  guests?: number;
  id?: string;
}

export class Person {
  public attending: boolean;
  public guests: number;
  public name: string;
  public id: string = genId();

  constructor ({
    name,
    attending,
    guests,
    id
  }: IPerson) {
    this.name = name;
    this.attending = attending || false;
    this.guests = guests || 0;
    this.id = id || genId();
  }
}
