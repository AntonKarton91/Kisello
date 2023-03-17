import {forwardRef, Module} from '@nestjs/common';
import { CardTagController } from './cardTag.controller';
import { CardTagService } from './cardTag.service';
import {MongooseModule} from "@nestjs/mongoose";
import {CardTag, CardTagSchema} from "./schemas/cardTag.schema";
import {ConfigModule} from "@nestjs/config";
import {BoardModule} from "../board/board.module";

@Module({
  imports: [

      MongooseModule.forFeature([{name: CardTag.name, schema: CardTagSchema}]),
      BoardModule,
  ],
  controllers: [CardTagController],
  providers: [CardTagService],
  exports: [
      CardTagService,
  ]
})
export class CardTagModule {}
