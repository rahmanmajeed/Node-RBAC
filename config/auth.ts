import Env from "../src/core/Env";

export default {
    public_key: Env.get('ACCESS_TOKEN_PUBLIC_KEY', null),
    private_key: Env.get('ACCESS_TOKEN_PRIVATE_KEY', null),
}