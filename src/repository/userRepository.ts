import { UserApiAdapter } from "~/infrastructure/userApiAdapter";

export class UserRepository {
  private _adapter: UserApiAdapter;

  constructor({ adapter }: { adapter: UserApiAdapter }) {
    this._adapter = adapter;
  }

  async find(id: number) {
    return this._adapter.getUser(1);
  }
}
