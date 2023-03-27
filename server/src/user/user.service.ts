import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model, ObjectId} from 'mongoose';
import {User, UserDocument} from './schemas/user.schema';
import {CreateUserDto} from './dto/createUser.dto';
import {TypeEmployerPosition, UserRoleType} from "./schemas/types";
import {Response} from "express";
import {TokenService} from "../token/token.service";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private tokenService: TokenService
  ) {}

  async createUser(dto: CreateUserDto) {
    return  await this.userModel.create({
      ...dto,
      role: UserRoleType.WORKER,
      boards: []
    });
  }

  async getUserByEmail(email: string){
    return this.userModel.findOne({ email });
  }

  async findAndUpdate(id: ObjectId, update): Promise<User> {
    return this.userModel.findOneAndUpdate({id}, update);
  }

  async getByBoardId(id: ObjectId){
    return this.userModel
      .find({boards : {$elemMatch: {$eq: id} }})
      .select("_id name surname avatar");
  }
}
