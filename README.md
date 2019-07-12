<div align="center">
<img src="img/doctor_who_dalek_by_konpatchi-d873tm6.png" alt="emotion" height="175" width="125">
<h1>generate</h1>
<p>Generate test fixtures from a swagger/OpenAPI schema</p>
</div>
<hr />

## Proposed Usage

Via command line as script:

```bash
generate <schema> <endpoint>
```

Via a custom script, to provide overrides for the default transformer methods that create a mock response fixture:

```javascript
import generate, { fakeId, fakeEmail } from 'generate'

function customTransformer(apiDefinition) {
  // implement the thing
}

generate('schema.yaml', 'SomeEndpoint', fakeId, fakeEmail, customTransformer)
```

One could even get fancy with their workflow:

```javascript
import generate from 'generate'

const endpoints = ['SomeEndpoint', 'AnotherEndpoint', 'YetOneMoreEndpoint']

endpoints.forEach(endpoint => generate('schema.yaml', endpoint))
```

Or

```javascript
const generate = require('generate')
const { execSync } = require('child_process')

const endpoints = ['SomeEndpoint', 'AnotherEndpoint', 'YetOneMoreEndpoint']

endpoints.forEach(endpoint =>
  execSync(`generate schema.yaml ${endpoint}`, { stdio: 'inherit' }),
)
```
