import { StorageBase } from "infra/Storage/StorageBase";

export class LocalStorage<TData extends object> extends StorageBase<TData> {
  constructor(key: string, storage: Storage = window.localStorage) {
    super({ key, storage });
  }
}
