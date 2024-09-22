/**
 * FileUtil
 * @desc File management
 */
export declare class FileUtil {
    constructor();
    /**
     * getLocalPath
     * @desc
     */
    static getLocalPath(): string;
    /**
     * getPath
     * @param paths
     * @desc
     */
    static getPath(...paths: string[]): string;
    /**
     * read
     * @desc
     */
    static read(path: string): Promise<unknown>;
    /**
     * write
     * @desc
     */
    static write(): Promise<void>;
    /**
     * createDirectory
     * @desc
     */
    static createDirectory(): Promise<void>;
    /**
     * deleteDirectory
     * @desc
     */
    static deleteDirectory(): Promise<void>;
}
