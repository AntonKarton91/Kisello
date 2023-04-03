import { Module } from "@nestjs/common"
import {BoardGateway} from "./gateway";
import { ColumnModule } from "../column/column.module";
import { CardModule } from "../card/card.module";
import { CardCommentModule } from "../cardComment/cardComment.module";

@Module({
    providers: [BoardGateway],
    imports: [
      ColumnModule,
      CardModule,
      CardCommentModule
    ]
})
export class GatewayModule {}