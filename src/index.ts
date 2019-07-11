import faker from 'faker'
import fs from 'fs'
import get from 'lodash.get'
// @ts-ignore no type definitions json-schema-faker
import JSONSchemaFaker from 'json-schema-faker'
import path from 'path'
import SwaggerParser from 'swagger-parser'
import 'core-js'
import { compose } from './utils/helpers'
import {
  requireAllProperties,
  email,
  company,
  fakeId,
} from './utils/transformers'

JSONSchemaFaker.extend('faker', () => faker)

const [, , document, endpoint] = process.argv
const cwd = process.cwd()
const fileName = 'fixture.json'
const defaultTransformers = [company, email, fakeId]

async function generateFixture(
  api: any,
  endpoint: string,
  transformers = defaultTransformers,
) {
  const OpenDocument = await SwaggerParser.dereference(api)
  const definitions = get(OpenDocument, 'definitions', {})
  const definition = get(definitions, endpoint, {})

  const composedTransformers = compose(
    requireAllProperties,
    ...transformers,
  )

  const modifiedDefinitions = composedTransformers(definition)
  const fixture = JSONSchemaFaker.generate(modifiedDefinitions)
  fs.writeFileSync(path.join(cwd, fileName), JSON.stringify(fixture))
}

generateFixture(document, endpoint)

export default generateFixture
export { company, email, fakeId }
