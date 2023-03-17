import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ConfigService } from "@nestjs/config";
import { AuthService } from './auth.service';
import {UserService} from "../user/user.service";
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";
import {register} from "tsconfig-paths";
import {TokenModule} from "../token/token.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
      forwardRef(() => UserModule),
      TokenModule
  ],
    exports: [ AuthService ]
})
export class AuthModule {}
