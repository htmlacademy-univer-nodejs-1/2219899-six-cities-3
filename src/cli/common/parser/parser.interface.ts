export interface ParserInterface<Type> {
  parse(rawData: string): Generator<Type>;
}
