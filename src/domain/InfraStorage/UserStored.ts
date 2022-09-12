import { IUser } from "entities";
import { LocalStorage } from "infra/Storage";

export class UserStored extends LocalStorage<IUser> {
  constructor() {
    super("User");
  }

  protected convertDataToStoreValue(data: IUser): string {
    return JSON.stringify(data);
  }
  protected convertStoreValueToData(value: string): IUser {
    return JSON.parse(value) as IUser;
  }

  public onRemoved = (value: IUser) => {
    console.log(`${this.key} has been removed from LocalStorage`, {
      previous: value,
    });
  };
  public onSet = (current: IUser | null, previous: IUser | null) => {
    console.log(`${this.key} has been set to LocalStorage`, {
      current,
      previous,
    });
  };
}
