const DUMMY_DATA = {
    id: 1,
    name: "Real name"
};

export class UserApiAdapter {
    async getUser(id: number) {
        return Promise.resolve(DUMMY_DATA);
    }
}