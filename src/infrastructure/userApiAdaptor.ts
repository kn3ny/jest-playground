export class UserApiAdaptor {
    private static readonly DUMMY_DATA = {
        id: 1,
        name: "Real name"
    };

    async getUser(id: number) {
        return Promise.resolve(UserApiAdaptor.DUMMY_DATA);
    }
}