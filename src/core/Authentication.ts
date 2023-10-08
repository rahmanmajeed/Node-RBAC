/**
 * @types
 * @Authentication {options}
 */

import { authOptions } from "../types/TAuth";


abstract class Authentication {
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

  protected getPublicKey(){
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
  //### v2 authentication class###
  /**
   * @method signAuthToken
   * @param {payload, ?options}
   * @return {string}
   */
  //  protected abstract signAuthToken(payload: Object, options?: Object): string;

  /**
   * @method verifyAuthToken
   * @param {token}
   * @return {<T> | null}
   */
  //  protected abstract verifyAuthToken<T>(token: string): T | null;


  /**
   * @key read by buffer
   * @param {key}
   * @return {key}
   */

  private readKeyFromBuffer(key: string) {
    return key ? Buffer.from(key, "base64").toString("ascii") : "";
  }
}

export default Authentication;
