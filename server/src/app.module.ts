import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {AuthModule} from "./auth/auth.module";
import {ConfigModule} from "@nestjs/config";
import {MongooseModule} from "@nestjs/mongoose";
import * as path from "path"
import {ServeStaticModule} from "@nestjs/serve-static";
import {UserModule} from "./user/user.module";
import {FileModule} from "./file/file.module";
import {BoardModule} from "./board/board.module";
import {CardTagModule} from "./cardTag/cardTag.module";
import {ColumnModule} from "./column/column.module";
import {GatewayModule} from "./gateway/gateway.module";

@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: `.${process.env.NODE_ENV}.env`
      }),
      MongooseModule.forRoot('mongodb://localhost:27017'),
      AuthModule,
      CardTagModule,
      ColumnModule,
      GatewayModule,
      UserModule,
      FileModule,
      BoardModule,
      ServeStaticModule.forRoot({rootPath: path.resolve(__dirname, 'static'),
      }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
