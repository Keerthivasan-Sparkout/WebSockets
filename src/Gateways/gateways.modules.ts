import { Module } from "@nestjs/common";
import { MyGateWays } from "./gateway";

@Module({
    providers:[MyGateWays]
})
export class GatewaysModules{}