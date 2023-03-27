import {forwardRef, Module} from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import {MongooseModule} from "@nestjs/mongoose";
import { Card, CardSchema } from "./schemas/card.schema";
import { ColumnModule } from "../column/column.module";

@Module({
  imports: [
      MongooseModule.forFeature([{name: Card.name, schema: CardSchema}]),
      ColumnModule,
  ],
  controllers: [CardController],
  providers: [CardService],
  exports: [
      CardService,
  ]
})
export class CardModule {}
