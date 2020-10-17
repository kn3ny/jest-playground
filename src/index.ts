import { UserRepository } from "./repository/userRepository";

const main = () => {
    const userRepository = new UserRepository();
    const user = userRepository.find();
    console.log(JSON.stringify(user, null, 2));
}

main();
