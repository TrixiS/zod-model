# Zod model 

### Use zod schemas with json strings and files

---

## Model
```JavaScript
import { z } from "zod";
import { Model } from "zod-model";

const jsonString = `{
  "name": "John Doe"
}`;

const schema = z.object({ name: z.string() });
const model = new Model(schema);

// parsed and validated js object from json
const parsedJsonObject = model.parseJsonString(jsonString);

// parsed and validated js object from json file
const parsedFileJsonObject = model.parseFile("data.json", { encoding: "utf-8" }); // also supports file read options :)
```

---
## Config
### Model subclass with methods to update/refresh data using zod schemas
```JavaScript
import { z } from "zod";
import { Config } from "zod-model";

const schema = z.object({ name: z.string() });
const config = new Config(schema);

config.updateFile("data.json"); // reads file, parses and validates an object. Updates file with default values from the schema (adds fields)

config.refreshFile("data.json"); // reads file, refreshes file content with default values from the schema
```