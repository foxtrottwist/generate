<div align="center">
<img src="https://gist.github.com/foxtrottwist/871dfbb97babda874dab4f22bafce0e1/raw/bba4f0d3628365706515555d9f93a3c158de93d7/doctor_who_dalek_by_konpatchi-d873tm6.png" alt="emotion" height="175" width="125">
<h1>generate</h1>
<p>Generate test fixtures from a swagger/OpenAPI schema</p>
</div>
<hr />

## Proposed Usage

Via command line:

```bash
generate <schema> <endpoint>
```

Via a custom script, to provide overrides for the default transformer methods. Transformers operate on the schema to create a fixture:

```javascript
import generate, { fakeId, fakeEmail } from 'generate'

function customTransformer(apiDefinition) {
  // implement the thing
}

generate('schema.yaml', 'SomeEndpoint', [fakeId, fakeEmail, customTransformer])
```

One could even get fancy with their workflow:

```javascript
import generate from 'generate'

const endpoints = ['SomeEndpoint', 'AnotherEndpoint', 'YetOneMoreEndpoint']

endpoints.forEach(endpoint => generate('schema.yaml', endpoint))
```

Or

```javascript
const { execSync } = require('child_process')

const endpoints = ['SomeEndpoint', 'AnotherEndpoint', 'YetOneMoreEndpoint']

endpoints.forEach(endpoint =>
  execSync(`generate schema.yaml ${endpoint}`, { stdio: 'inherit' }),
)
```
