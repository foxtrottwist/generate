import { traverseProperties } from './helpers'
import { Definition } from './helpers'

export function fakeEmail(definition: Definition): Definition {
  return traverseProperties(
    definition,
    'internet.email',
    (key: string) => key.includes('email'),
    fakeEmail,
  )
}

export function fakeId(definition: Definition): Definition {
  return traverseProperties(
    definition,
    'random.uuid',
    (key: string) => key.includes('id') || key.includes('Id'),
    fakeId,
  )
}

export function fakeCompanyName(definition: Definition): Definition {
  return traverseProperties(
    definition,
    'company.companyName',
    (key: string) => key.includes('companyName'),
    fakeCompanyName,
  )
}
