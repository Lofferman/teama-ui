import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import { env } from '$env/dynamic/private';
import { neon } from '@neondatabase/serverless';

const DATABASE_URL = env.DATABASE_URL;
if (!DATABASE_URL) throw new Error('DATABASE_URL is not set');

const client = neon(DATABASE_URL);

export const db = drizzle(client, { schema });
