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

  test("find() with mocked dependency", async () => {
    const { UserApiAdaptor: MockedUserApiAdaptor } = jest.requireActual(
      "~/infrastructure/userApiAdaptor"
    );

    const mockedUserApiAdaptor: UserApiAdaptor = new MockedUserApiAdaptor();
    mockedUserApiAdaptor.getUser = jest.fn().mockImplementation(async () => {
      return Promise.resolve({
        id: 2,
        name: "Mocked name",
      });
    });

    const repo = new UserRepository({
      adaptor: mockedUserApiAdaptor,
    });

    await expect(repo.find(1)).resolves.toStrictEqual({
      id: 2,
      name: "Mocked name",
    });

    expect(mockedUserApiAdaptor.getUser).toBeCalledTimes(1);
    expect(mockedUserApiAdaptor.getUser).toBeCalledWith(1);
  });

  test("find() with mocked static variable", async () => {
    const { UserApiAdaptor: MockedUserApiAdaptor } = jest.requireActual(
      "~/infrastructure/userApiAdaptor"
    );
    MockedUserApiAdaptor.DUMMY_DATA = {
      id: 3,
      name: "Static-mocked name",
    };

    const mockedUserApiAdaptor: UserApiAdaptor = new MockedUserApiAdaptor();

    const repo = new UserRepository({
      adaptor: mockedUserApiAdaptor,
    });

    await expect(repo.find(1)).resolves.toStrictEqual({
      id: 3,
      name: "Static-mocked name",
    });
  });

  test("find() with force-mocked value", async () => {
    const { UserApiAdaptor: MockedUserApiAdaptor } = jest.requireActual(
      "~/infrastructure/userApiAdaptor"
    );

    const mockedUserApiAdaptor: UserApiAdaptor = new MockedUserApiAdaptor();
    mockedUserApiAdaptor.getUser = jest.fn().mockImplementation(async () => {
      return Promise.resolve({
        id: 4,
        name: "Force-mocked name",
      });
    });

    const repo = new UserRepository({
      adaptor: new UserApiAdaptor(),
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    repo._adaptor = mockedUserApiAdaptor;

    await expect(repo.find(1)).resolves.toStrictEqual({
      id: 4,
      name: "Force-mocked name",
    });
  });
});
