import * as fs from "fs";
import { ZodRawShape } from "zod";
import { Model } from "./Model";
import { ReadFileSyncParameters } from "./types";

/**
 * Model with methods for saving/refreshing file content with data from validated objects
 */
export class Config<T extends ZodRawShape> extends Model<T> {
  updateFile(
    file: fs.PathOrFileDescriptor,
    options?: {
      read?: ReadFileSyncParameters[1];
      write?: fs.WriteFileOptions;
    }
  ) {
    const parsedObject = this.parseFile(file, options?.read);
    const objectJson = JSON.stringify(parsedObject, null, 2);
    return fs.writeFileSync(file, objectJson, options?.write);
  }

  refreshFile(file: fs.PathOrFileDescriptor, options: fs.WriteFileOptions) {
    const defaultObject = this.schema.parse({});
    const objectJson = JSON.stringify(defaultObject, null, 2);
    return fs.writeFileSync(file, objectJson, options);
  }
}
