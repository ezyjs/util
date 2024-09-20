export declare class RandomUtil {
    constructor();
    /**
     * getUUID
     * @desc Generates a UUID-based random number, which is 32 characters by default.
     * @example
     * RandomUtil.getUUID() // d7a0247e303341cbb3641bfabdd4de50
     * RandomUtil.getUUID(16) // d7a0247e303341cb
     */
    static getUUID(digit?: number): string;
}
