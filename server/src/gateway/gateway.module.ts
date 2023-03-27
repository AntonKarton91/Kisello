import { Module } from "@nestjs/common"
import {BoardGateway} from "./gateway";
import { ColumnModule } from "../column/column.module";
import { CardModule } from "../card/card.module";

@Module({
    providers: [BoardGateway],
    imports: [
      ColumnModule,
      CardModule
    ]
})
export class GatewayModule {}