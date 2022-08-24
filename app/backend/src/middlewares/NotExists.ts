export default class NotExists extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotExists';
  }
}
