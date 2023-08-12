abstract class Authentication {
  protected publicKey: string;
  protected privateKey: string;

  constructor(publicKey: string, privateKey: string) {
    this.publicKey = this.setPublicKey(publicKey)
    this.privateKey = this.setPrivateKey(privateKey)
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
    return this.publicKey = this.readKeyFromBuffer(key);
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
    return this.privateKey = this.readKeyFromBuffer(key);
  }

  /**
   * getPrivateKey
   */

  protected getPrivateKey(){
     return this.privateKey;
  }

   /**
   * @key read by buffer
   * @param {key}
   * @return {key}
   */

   private readKeyFromBuffer(key:string) {
    return key ? Buffer.from(key, "base64").toString("ascii") : "";
  }
}

export default Authentication;