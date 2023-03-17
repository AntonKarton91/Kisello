import {forwardRef, Module} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UserSchema} from "./schemas/user.schema";
import {AuthModule} from "../auth/auth.module";
import {BoardModule} from "../board/board.module";

@Module({
  imports: [
      MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
      forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [
      UserService,
  ]
})
export class UserModule {}
