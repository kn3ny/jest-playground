import { UserApiAdaptor } from "./infrastructure/userApiAdaptor";
import { UserRepository } from "./repository/userRepository";

const main = async () => {
    const userRepository = new UserRepository({
        adaptor: new UserApiAdaptor()
    });

    const user = await userRepository.find(1);

    console.log(JSON.stringify(user, null, 2));
}

main();
