export class Employee {
  constructor(
    public firstName: string,
    public lastName: string,
    public isFulltime: boolean,
    public paymentType: string,
    public primaryLanguage: string,
    public startDate: Date,
    public startTime: Date,
    public rating: number = 10
  ) {

  }
}