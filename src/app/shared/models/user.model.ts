import {IUser} from "../interfaces/user.interface";

export class User implements IUser {
  constructor(
    public id: number,
    public name: string,
    public lastname: string,
    public number: string,
    public dateBirth: string,
    public city: string,
  ) {
  }


}
