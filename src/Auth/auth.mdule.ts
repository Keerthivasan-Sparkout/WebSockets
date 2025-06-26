import { Module } from "@nestjs/common";
import {  ThrottlerModule, ThrottlerRequest } from "@nestjs/throttler";
import { ThrottlerRateLimit } from "./auth.throttler";

@Module({
    imports:[ ThrottlerModule.forRoot()],
    providers:[ThrottlerRateLimit]
})
export class AuthModulre{
}