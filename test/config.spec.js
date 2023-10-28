import { test, it } from "node:test";
import assert from "node:assert";
import ConfigApp from "../src/providers/config.js";

test('config', () => {
       const config = new ConfigApp();
       //  assert.strictEqual(config.schema, null)
       assert.deepEqual(config.configSchema, {
              port: 3000, host: 'http://localhost',
              env:
                     'development'
       })
})