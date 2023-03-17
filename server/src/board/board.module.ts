import {forwardRef, Module} from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Board, BoardSchema} from "./schemas/board.schema";
import {UserModule} from "../user/user.module";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
      ConfigModule.forRoot({
          envFilePath: `.${process.env.NODE_ENV}.env`
      }),
      MongooseModule.forFeature([{name: Board.name, schema: BoardSchema}]),
      UserModule,
  ],
  controllers: [BoardController],
  providers: [BoardService],
  exports: [
      BoardService,
  ]
})
export class BoardModule {}
