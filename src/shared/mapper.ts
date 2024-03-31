import { UserDto } from '../dto/user.dto';
import { User } from '../schemas/user.schema';

export const toUserDto = (data: User): UserDto => {
  const { id, username, email } = data;

  const userDto: UserDto = {
    id,
    username,
    email,
  };

  return userDto;
};