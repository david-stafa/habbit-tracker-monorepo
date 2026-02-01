import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()

export const PORT = z.coerce.number().default(3000).parse(process.env.PORT)
export const BASE_URL = z
  .string()
  .default('http://localhost:3000')
  .parse(process.env.BASE_URL)
// TODO: This works now because I use it with a sigle string, will FAIL when more URLs are added
export const TRUSTED_ORIGINS = z
  .array(z.string())
  .default(['http://localhost:5173'])
  .parse([process.env.TRUSTED_ORIGINS])
export const WEB_URL = z
  .string()
  .default('http://localhost:5173')
  .parse(process.env.WEB_URL)
