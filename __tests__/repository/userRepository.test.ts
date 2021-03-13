import { UserApiAdapter } from "~/infrastructure/userApiAdapter";
import { UserRepository } from "~/repository/userRepository";

describe("UserRepository", () => {
  test("find() with real call", async () => {
    const repo = new UserRepository({
      adapter: new UserApiAdapter(),
    });

    await expect(repo.find(1)).resolves.toStrictEqual({
      id: 1,
      name: "Real name",
    });
  });

  test("find() with mocked dependency", async () => {
    const { UserApiAdapter: MockedUserApiAdapter } = jest.requireActual(
      "~/infrastructure/userApiAdapter"
    );

    const mockedUserApiAdapter: UserApiAdapter = new MockedUserApiAdapter();
    mockedUserApiAdapter.getUser = jest.fn().mockImplementation(async () => {
      return Promise.resolve({
        id: 2,
        name: "Mocked name",
      });
    });

    const repo = new UserRepository({
      adapter: mockedUserApiAdapter,
    });

    await expect(repo.find(1)).resolves.toStrictEqual({
      id: 2,
      name: "Mocked name",
    });

    expect(mockedUserApiAdapter.getUser).toBeCalledTimes(1);
    expect(mockedUserApiAdapter.getUser).toBeCalledWith(1);
  });

  test("find() with mocked static variable", async () => {
    const { UserApiAdapter: MockedUserApiAdapter } = jest.requireActual(
      "~/infrastructure/userApiAdapter"
    );
    MockedUserApiAdapter.DUMMY_DATA = {
      id: 3,
      name: "Static-mocked name",
    };

    const mockedUserApiAdapter: UserApiAdapter = new MockedUserApiAdapter();

    const repo = new UserRepository({
      adapter: mockedUserApiAdapter,
    });

    await expect(repo.find(1)).resolves.toStrictEqual({
      id: 3,
      name: "Static-mocked name",
    });
  });

  test("find() with force-mocked value", async () => {
    const { UserApiAdapter: MockedUserApiAdapter } = jest.requireActual(
      "~/infrastructure/userApiAdapter"
    );

    const mockedUserApiAdapter: UserApiAdapter = new MockedUserApiAdapter();
    mockedUserApiAdapter.getUser = jest.fn().mockImplementation(async () => {
      return Promise.resolve({
        id: 4,
        name: "Force-mocked name",
      });
    });

    const repo = new UserRepository({
      adapter: new UserApiAdapter(),
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    repo._adapter = mockedUserApiAdapter;

    await expect(repo.find(1)).resolves.toStrictEqual({
      id: 4,
      name: "Force-mocked name",
    });
  });
});
