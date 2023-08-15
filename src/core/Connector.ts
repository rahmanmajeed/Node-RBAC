export abstract class ServiceConnector {
  options: Object;
  _connection: any;
  retrySeconds: number;

  constructor() {
    this.connectWithRetry();
  }

  getInstance() {
    return this._connection;
  }

  get connection() {
    if (this._connection && !this._connection.connecting) {
      this.connect();
    }
    return this._connection;
  }

  set connection(connection) {
    this._connection = connection;
    this._connection.connecting = true;
  }

  abstract connect():void;

  connectWithRetry() {
    // setTimeout(this.connect, this.retrySeconds * 1000);
  }
}
