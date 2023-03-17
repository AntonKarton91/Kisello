import {forwardRef, Module} from '@nestjs/common';
import { ColumnController } from './column.controller';
import { ColumnService } from './column.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Column, ColumnSchema} from "./schemas/column.schema";
import {UserModule} from "../user/user.module";
import {BoardModule} from "../board/board.module";

@Module({
  imports: [
      MongooseModule.forFeature([{name: Column.name, schema: ColumnSchema}]),
      BoardModule,
  ],
  controllers: [ColumnController],
  providers: [ColumnService],
  exports: [
      ColumnService,
  ]
})
export class ColumnModule {}
