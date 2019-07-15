import { transformer } from './helpers'

export const fakeCompanyName = transformer(
  property => property.includes('companyName'),
  () => 'company.companyName',
)

export const fakeEmail = transformer(
  property => property.includes('email'),
  () => 'internet.email',
)

export const fakeId = transformer(
  property => property.includes('id') || property.includes('Id'),
  () => 'random.uuid',
)

export const fakeName = transformer(
  property => property.includes('firstName') || property.includes('lastName'),
  property => `name.${property}`,
)
