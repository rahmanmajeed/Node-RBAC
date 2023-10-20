/**
 * @types
 * @Authentication {options}
 */

import { authOptions } from "../types/TAuth";

abstract class Authentication<T> {
  protected publicKey: string;
  protected privateKey: string;
  protected options: authOptions = {
    publicKey: "",
    privateKey: "",
    clientID: "",
    clientSecret: "",
    apiKey: "",
  };

  constructor(options?: authOptions) {
    this.options = { ...options };
  }

  /**
   *
   */
  protected abstract signToken(payload: Object, options?: Object): string;

  /**
   *
   */
  protected abstract verifyToken<T>(token: string): T | null;

  /**
   * setPrivateKey
   */

  protected setPublicKey(key: string) {
    return (this.options.publicKey = this.readKeyFromBuffer(key));
  }

  /**
   * getPrivateKey
   */

  protected getPublicKey() {
    return this.publicKey;
  }

  /**
   * setPrivateKey
   */

  protected setPrivateKey(key: string) {
    return (this.privateKey = this.readKeyFromBuffer(key));
  }

  /**
   * getPrivateKey
   */

  protected getPrivateKey() {
    return this.privateKey;
  }
  /*
  ########################### 
    version 2.0 authentication
  #############################
  */

  /**
   * @method digestOptions
   * @param {options}
   * @return {options}
   *
   *
   */
  protected digestOptions(options: Partial<T>): Partial<T> {
    return (this.options = options);
  }
  /**
   * @method signAuthToken
   * @param {payload}
   * @param {options} optional
   * @return {string}
   */
  protected abstract signAuthToken(payload: Object, options?: Object): string;

  /**
   * @method verifyAuthToken
   * @param {token}
   * @return {<T> | null}
   */
  protected abstract verifyAuthToken<T>(token: string): T | null;

  /**
   * @readKeyFromBuffer
   * @param {key} string
   * @param {key} BufferEncoding
   * @return {key} key|null
   */

  private readKeyFromBuffer(key: string, encoding: BufferEncoding = "base64") {
    return key ? Buffer.from(key, encoding).toString("ascii") : "";
  }
}

export default Authentication;
