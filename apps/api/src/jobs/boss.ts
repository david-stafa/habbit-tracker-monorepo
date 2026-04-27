import { PgBoss } from 'pg-boss'
import { DATABASE_URL } from '~/config'

export const boss = new PgBoss(DATABASE_URL)
