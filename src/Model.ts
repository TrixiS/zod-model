import * as fs from "fs";
import { ZodObject, ZodRawShape } from "zod";
import { ReadFileSyncParameters } from "./types";

/**
 * Base model, has some options for parsing (like json or files)
 */
export class Model<T extends ZodRawShape> {
  constructor(public readonly schema: ZodObject<T>) {}

  parseJsonString(...args: Parameters<typeof JSON.parse>) {
    const json = JSON.parse(...args);
    return this.schema.parse(json);
  }

  parseFile(...args: ReadFileSyncParameters) {
    const fileContent = fs.readFileSync(...args);
    return this.parseJsonString(fileContent.toString());
  }
}
