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

const [, , document] = process.argv
const cwd = process.cwd()
const fileName = 'fixture.json'
const defaultTransformers = [company, email, fakeId]

async function generateFixture(api: any, transformers = defaultTransformers) {
  const OpenDocument = await SwaggerParser.dereference(api)
  const definitions = get(OpenDocument, 'definitions', {})

  const composedTransformers = compose(
    requireAllProperties,
    ...transformers,
  )

  const modifiedDefinitions = Object.entries(definitions).map(
    ([endpoint, definition]) => [endpoint, composedTransformers(definition)],
  )

  // @ts-ignore no type definitions for Object.fromEntries provided by core-js
  const definitionsObject = Object.fromEntries(modifiedDefinitions)
  const fixture = JSONSchemaFaker.generate(definitionsObject)

  fs.writeFileSync(path.join(cwd, fileName), JSON.stringify(fixture))
}

export default generateFixture
export { company, email, fakeId }

generateFixture(document)
