abstract class Authentication {
  protected publicKey: string;
  protected privateKey: string;

  constructor() {}

  /**
   *
   */
  protected abstract signToken(payload:Object, options?:Object): string;

  /**
   *
   */
  protected abstract verifyToken<T>(token: string): T | null;
}



export default Authentication;