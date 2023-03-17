import { Module } from "@nestjs/common"
import {BoardGateway} from "./gateway";

@Module({
    providers: [BoardGateway]
})
export class GatewayModule {}