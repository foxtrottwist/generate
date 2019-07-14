import faker from 'faker'
import fs from 'fs'
import get from 'lodash.get'
// @ts-ignore no type definitions json-schema-faker
import JSONSchemaFaker from 'json-schema-faker'
import path from 'path'
import SwaggerParser from 'swagger-parser'
import 'core-js/es/object/from-entries'
import { compose, requireAllProperties, transformer } from './utils/helpers'
import { fakeCompanyName, fakeEmail, fakeId } from './utils/transformers'

JSONSchemaFaker.extend('faker', () => faker)

const [, , document, endpoint, dir = 'fixtures'] = process.argv
const cwd = process.cwd()
const fileName = endpoint.slice(0, 1).toLocaleLowerCase() + endpoint.slice(1)
const defaultTransformers = [fakeCompanyName, fakeEmail, fakeId]

async function generate(
  api: any,
  endpoint: string,
  transformers = defaultTransformers,
) {
  const composedTransformers = compose(
    requireAllProperties,
    ...transformers,
  )

  const OpenDocument = await SwaggerParser.dereference(api)
  const definition = get(OpenDocument, `definitions.${endpoint}`, {})
  const modifiedDefinition = composedTransformers(definition)
  const fixture = JSONSchemaFaker.generate(modifiedDefinition)

  !fs.existsSync(dir) ? fs.mkdirSync('fixtures') : undefined

  fs.writeFileSync(
    path.join(cwd, `${dir}/${fileName}.json`),
    JSON.stringify(fixture),
  )
}

generate(document, endpoint)

export default generate
export { fakeCompanyName, fakeEmail, fakeId, transformer }
