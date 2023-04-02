import {Module} from '@nestjs/common';
import { CardCommentController } from './cardComment.controller';
import { CardCommentService } from './cardComment.service';
import {MongooseModule} from "@nestjs/mongoose";
import { CardComment, CardCommentSchema } from "./schemas/cardComment.schema";
import { ColumnModule } from "../column/column.module";

@Module({
  imports: [
      MongooseModule.forFeature([{name: CardComment.name, schema: CardCommentSchema}]),
      ColumnModule,
  ],
  controllers: [CardCommentController],
  providers: [CardCommentService],
  exports: [
      CardCommentService,
  ]
})
export class CardCommentModule {}
