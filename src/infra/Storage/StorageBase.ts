import { ShouldBeOverridedError } from "infra/Error/ShouldBeOverridedError";

/** Facade to handle the Storage of the application.
 *
 * You have to override 'convertDataToStoreValue' and 'convertStoreValueToData' to cast value for the store and for your uses.
 *
 * You can subscribe to listeners 'onRemoved' and 'onSet' trigged respectively from 'remove' function and 'set' function.
 */
export class StorageBase<TData extends {} | string | number | []> {
  protected key: string;
  protected storage: Storage;
  constructor({ key, storage }: { key: string; storage: Storage }) {
    this.key = key;
    this.storage = storage;
  }
  //#region function that have to be overrided
  /**
   * [SHOULD BE OVDERRIDED]
   *
   * this function allow to convert a TData to a string to store. */
  protected convertDataToStoreValue(data: TData): string {
    throw new ShouldBeOverridedError("LocalStorage.convertItemToStore");
  }

  /**
   * [SHOULD BE OVDERRIDED]
   *
   * this function allow to convert a stored value (as string) to TData. */
  protected convertStoreValueToData(value: string): TData {
    throw new ShouldBeOverridedError("LocalStorage.convertItemToStore");
  }
  //#endregion

  //#region evetns that should overrided
  public onRemoved?: (previous: TData) => void;
  public onSet?: (current: TData | null, previous: TData | null) => void;
  //#endregion

  /**
   * Get the current value, or null if the entry does not exist. */
  public get(): TData | null {
    const value = this.storage.getItem(this.key);
    return value !== null ? this.convertStoreValueToData(value) : value;
  }

  /**
   * Sets the value of the pair identified by key to value, creating a new key/value pair if none existed for key previously.
   *
   * Throws a "QuotaExceededError" DOMException exception if the new value couldn't be set. (Setting could fail if, e.g., the user has disabled storage for the site, or if the quota has been exceeded.)
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  public set(data: TData): void {
    const previous = this.get();
    this.storage.setItem(this.key, this.convertDataToStoreValue(data));
    this.onSet?.(this.get(), previous);
  }

  /**
   * Removes the key/value pair with the given key, if a key/value pair with the given key exists.
   * It should not be overrided.
   *
   * Dispatches a storage event on Window objects holding an equivalent Storage object.
   */
  public remove(): void {
    const value = this.get();
    if (value !== null) {
      this.storage.removeItem(this.key);
      this.onRemoved?.(value);
    }
  }
}
