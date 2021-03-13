export class UserApiAdapter {
  private static readonly DUMMY_DATA = {
    id: 1,
    name: "Real name",
  };

  async getUser(id: number) {
    return Promise.resolve(UserApiAdapter.DUMMY_DATA);
  }
}
