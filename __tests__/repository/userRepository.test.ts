import { UserApiAdaptor } from "~/infrastructure/userApiAdaptor";
import { UserRepository } from "~/repository/userRepository";

test('repo.find()', async () => {
    const repo = new UserRepository({
        adaptor: new UserApiAdaptor()
    });

    await expect(repo.find(1)).resolves.toStrictEqual({
        id: 1,
        name: "Real name"
    });
});
