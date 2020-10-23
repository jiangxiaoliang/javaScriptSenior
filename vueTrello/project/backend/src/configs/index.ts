import databaseConfig from './database.json'
import path from 'path'

interface IDatabaseConfig {
    username: string,
    password: string,
    database: string,
    host: string,
    dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'mariadb',
    timezone: string
}

const configs = {
    development: {
        server: {
            host: 'localhost',
            port: 8888
        },
        database: databaseConfig.development as IDatabaseConfig,
        jwt: {
            privateKey: 'trello'
        },
        storage: {
            dir: path.resolve(__dirname, '../attachements'),
            prefix: '/public/attachements'
        }
    },
    test: {
        server: {
            host: 'localhost',
            port: 8888
        },
        database: databaseConfig.test as IDatabaseConfig,
        jwt: {
            privateKey: 'trello'
        },
        storage: {
            dir: path.resolve(__dirname, '../attachements'),
            prefix: '/public/attachements'
        }
    },
    production: {
        server: {
            host: 'localhost',
            port: 8888
        },
        database: databaseConfig.production as IDatabaseConfig,
        jwt: {
            privateKey: 'trello'
        },
        storage: {
            dir: path.resolve(__dirname, '../attachements'),
            prefix: '/public/attachements'
        }
    }
}

// type configskeys = 'development' | 'test' |  'production'
type configskeys = keyof typeof configs

const NODE_ENV = process.env.NODE_ENV as configskeys || 'development'

export default configs[NODE_ENV]