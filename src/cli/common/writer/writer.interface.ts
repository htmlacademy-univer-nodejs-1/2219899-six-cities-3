export interface WriterInterface {
  write(row: string): Promise<unknown>;
}
