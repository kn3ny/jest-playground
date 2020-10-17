import { UserApiAdapter } from "../infrastructure/userApiAdapter";

export class UserRepository {
    private _adapter: UserApiAdapter;

    constructor(){
        this._adapter = new UserApiAdapter();
    }

    async find(id: number) {
        return this._adapter.getUser(1);
    }
}