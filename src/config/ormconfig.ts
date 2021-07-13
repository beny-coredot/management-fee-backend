import { ConnectionOptions } from "typeorm";

const ormConfig: ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'task-management',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
    logger: 'simple-console',
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migrations',
        subscribersDir: 'src/subscriber'
    },
};

if (process.env.NODE_ENV === 'staging') {

}

export = ormConfig