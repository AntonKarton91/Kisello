import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, ObjectId} from 'mongoose';
import {User, UserDocument} from './schemas/user.schema';
import {CreateUserDto} from './dto/createUser.dto';
import {TypeEmployerPosition, UserRoleType} from "./schemas/types";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createUser(dto: CreateUserDto) {
    return  await this.userModel.create({
      ...dto,
      role: UserRoleType.WORKER,
      boards: []
    });
  }

  async getAllUsers() {
    const userList = await this.userModel.find();
    return userList;
  }

  async getUserByEmail(email: string){
    return this.userModel.findOne({ email });
  }

  async getUserExtraData(id: string){
    const user = await this.getUserById(id)
    if (user) {
      return  {
        surname: user.surname,
        position: user.position,
        phoneNumber: user.phoneNumber
      }
    } else {
      throw new HttpException("Нет такого пользователя", HttpStatus.BAD_REQUEST)
    }


  }

  async getUserById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async findAndUpdate(id: ObjectId, update): Promise<User> {
    return this.userModel.findOneAndUpdate({id}, update);
  }
}
