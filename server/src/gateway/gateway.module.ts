import { Module } from "@nestjs/common"
import {BoardGateway} from "./gateway";
import { ColumnModule } from "../column/column.module";

@Module({
    providers: [BoardGateway],
    imports: [
      ColumnModule
    ]
})
export class GatewayModule {}