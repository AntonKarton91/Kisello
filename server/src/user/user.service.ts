import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, ObjectId} from 'mongoose';
import {User, UserDocument, UserRoleType} from './schemas/user.schema';
import {CreateUserDto} from './dto/createUser.dto';

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
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async getUserById(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async findAndUpdate(id: ObjectId, update): Promise<User> {
    return this.userModel.findOneAndUpdate({id}, update);
  }
}
