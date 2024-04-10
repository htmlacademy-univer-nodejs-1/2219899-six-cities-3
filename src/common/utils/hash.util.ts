import * as crypto from 'node:crypto';

export function createSha256(line: string, salt: string): string {
  return crypto.createHmac('sha256', salt).update(line).digest('hex');
}
