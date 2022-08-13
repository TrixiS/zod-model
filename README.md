# Zod model 
### Use zod schemas with json strings and files

[GitHub](https://github.com/TrixiS/zod-model)

## Model
### Base model, allows you to parse json strings and files

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

## Config
### Model subclass with methods to update/refresh data using zod schemas

### Suppose we have such json file "data.json"
```JSON
{
  "name": "Marry Poppins"
}
```

### And a simple config object
```JavaScript
import { z } from "zod";
import { Config } from "zod-model";

const schema = z.object({
  name: z.string(),
  age: z.number().int().default(18)
});

const config = new Config(schema);
```

### Notice that we have no "age" field in our json file but in schema

```JavaScript
config.updateFile("data.json", {
  read: { encoding: "utf-8" },
  write: { encoding: "utf-8" }
});

// read/write options are optional btw
```

### After using `Config.updateFile` method we have such data in our data.json file

So, "age" has been added with default value from schema

```JavaScript
{
  "name": "Marry Poppins",
  "age": 18
}
```

### Let's create a default value for the "name" field and use `Config.refreshFile` method
```JavaScript
import { z } from "zod";
import { Config } from "zod-model";

const schema = z.object({
  name: z.string().default("John Doe"),
  age: z.number().int().default(18)
});

const config = new Config(schema);

config.refreshFile("data.json", { encoding: "utf-8" }); // still the same json file
```

### Json content would become
```JavaScript
{
  "name": "John Doe",
  "age": 18
}

// so the json file has been completely refreshed
// with default values from schema
```