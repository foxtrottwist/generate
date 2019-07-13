import faker from 'faker'
import fs from 'fs'
import get from 'lodash.get'
// @ts-ignore no type definitions json-schema-faker
import JSONSchemaFaker from 'json-schema-faker'
import path from 'path'
import SwaggerParser from 'swagger-parser'
import 'core-js/es/object/from-entries'
import { compose, requireAllProperties } from './utils/helpers'
import { fakeCompanyName, fakeEmail, fakeId } from './utils/transformers'

JSONSchemaFaker.extend('faker', () => faker)

const [, , document, endpoint] = process.argv
const cwd = process.cwd()
const fileName = endpoint.slice(0, 1).toLocaleLowerCase() + endpoint.slice(1)
const defaultTransformers = [fakeCompanyName, fakeEmail, fakeId]

async function generateFixture(
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
  fs.writeFileSync(path.join(cwd, `${fileName}.json`), JSON.stringify(fixture))
}

generateFixture(document, endpoint)

export default generateFixture
export { fakeCompanyName, fakeEmail, fakeId }
