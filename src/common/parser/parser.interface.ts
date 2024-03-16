export interface ParserInterface<Type> {
  parse(rawData: string): Type;
}
