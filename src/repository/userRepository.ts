import { UserApiAdaptor } from "../infrastructure/userApiAdaptor";

export class UserRepository {
    private _adaptor: UserApiAdaptor;

    constructor({ adaptor }: { adaptor: UserApiAdaptor }){
        this._adaptor = adaptor;
    }

    async find(id: number) {
        return this._adaptor.getUser(1);
    }
}