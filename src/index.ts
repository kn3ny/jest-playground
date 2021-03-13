import { UserApiAdapter } from "./infrastructure/userApiAdapter";
import { UserRepository } from "./repository/userRepository";

const main = async () => {
  const userRepository = new UserRepository({
    adapter: new UserApiAdapter(),
  });

  const user = await userRepository.find(1);

  console.log(JSON.stringify(user, null, 2));
};

main();
