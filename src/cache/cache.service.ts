import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager:Cache
    ){}

    async getCache<T>(key: string, functionRequest: () => Promise<T>): Promise<T> {
        const allData:T = await this.cacheManager.get(key);

        if(allData){
            return allData
        }

        const cacheData:T = await functionRequest();
        await this.cacheManager.set(key, cacheData)
        return cacheData;
    }
}
