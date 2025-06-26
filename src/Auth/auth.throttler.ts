import { Injectable, ExecutionContext } from '@nestjs/common'
import { ThrottlerGuard, ThrottlerException, ThrottlerRequest } from '@nestjs/throttler'

@Injectable()
export class ThrottlerRateLimit extends ThrottlerGuard {

    static keysList: any[]
    async handleRequests(context: ExecutionContext, limit: number, ttl: number): Promise<boolean> {
        const client = context.switchToWs().getClient()
        const ip = client.conn.remoteAddress
        const key = this.generateKey(context, ip, "")

        if (ThrottlerRateLimit.keysList.length >= limit) {
            throw new ThrottlerException()
        }
        ThrottlerRateLimit.keysList.push(key)
        // await this.storageService.addRecord(key, ttl)
        return true
    }
}