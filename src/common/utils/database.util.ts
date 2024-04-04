export function getMongoURI(
  user: string,
  password: string,
  host: string,
  port: string | number,
  databaseName: string
): string {
  return `mongodb://${user}:${password}@${host}:${port}/${databaseName}?authSource=admin`;
}
