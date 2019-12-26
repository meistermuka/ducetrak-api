import { ConfigService } from '../core/services';
import * as fs from 'fs';

const conf = new ConfigService(`./env/${process.env.NODE_ENV || 'development'}.env`);
fs.writeFileSync('ormconfig.json', JSON.stringify(conf.getTypeOrmConfig(), null, 2));
