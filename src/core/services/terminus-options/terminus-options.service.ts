import {
    TerminusEndpoint,
    TerminusOptionsFactory,
    DNSHealthIndicator,
    TerminusModuleOptions,
    TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TerminusOptionsService implements TerminusOptionsFactory {
    constructor(
        private readonly dns: DNSHealthIndicator,
        private readonly typeorm: TypeOrmHealthIndicator,
    ) { }

    createTerminusOptions(): TerminusModuleOptions {
        const healthEndpoint: TerminusEndpoint = {
            url: '/health',
            healthIndicators: [
                async () => this.dns.pingCheck('google', 'https://google.com'),
                async () => this.typeorm.pingCheck('database', { timeout: 1500 }),
            ],
        };

        return {
            endpoints: [healthEndpoint],
        };
    }
}
