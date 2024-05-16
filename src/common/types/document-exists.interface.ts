export interface DocumentExists {
  exists(documentID: string): Promise<boolean>;
}
