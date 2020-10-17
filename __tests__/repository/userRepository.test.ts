import { UserApiAdaptor } from "~/infrastructure/userApiAdaptor";
import { UserRepository } from "~/repository/userRepository";

describe("UserRepository", () => {
  test("find() with real call", async () => {
    const repo = new UserRepository({
      adaptor: new UserApiAdaptor(),
    });

    await expect(repo.find(1)).resolves.toStrictEqual({
      id: 1,
      name: "Real name",
    });
  });

  test("find() with mocked call", async () => {
    const { UserApiAdaptor: MockedUserApiAdaptor } = jest.requireActual("~/infrastructure/userApiAdaptor");

    const mockedUserApiAdaptor: UserApiAdaptor = new MockedUserApiAdaptor();
    mockedUserApiAdaptor.getUser = jest.fn().mockImplementation(async () => {
      return Promise.resolve({
        id: 2,
        name: "Mocked name"
      });
    });

    const repo = new UserRepository({
      adaptor: mockedUserApiAdaptor
    });

    await expect(repo.find(1)).resolves.toStrictEqual({
      id: 2,
      name: "Mocked name",
    });

    expect(mockedUserApiAdaptor.getUser).toBeCalledTimes(1);
    expect(mockedUserApiAdaptor.getUser).toBeCalledWith(1);
  });
});
