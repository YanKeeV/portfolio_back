import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { CreateUserDto } from '../dto/user.create.dto';
import { LoginUserDto } from '../dto/user-login.dto';
import { toUserDto } from '../shared/mapper';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema'
import { Model } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>
  ) {}

  async findOne(options?: object): Promise<UserDto> {
    const user = await this.userModel.findOne(options).exec();
    return toUserDto(user); 
  }

  async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userModel.findOne({ username }).exec();

    if (!user) { 
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const areEqual = await compare(password, user.password); 

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return toUserDto(user); 
  }

  async findByPayload({ username }: any): Promise<UserDto> {
    return await this.findOne({ username });
  }

  async create(userDto: CreateUserDto): Promise<UserDto> {
    const { username, password, email } = userDto;

    const userInDb = await this.userModel.findOne({ username }).exec();
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const salt = await genSalt(10); 
    const hashPassword = await hash(password, salt); 

    const user: User = await new this.userModel({ 
      username,
      password: hashPassword,
      email,
    });
    
    await user.save();

    return toUserDto(user);
  }

  private _sanitizeUser(user: User) {
    delete user.password;
    return user;
  }
}
