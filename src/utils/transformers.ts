import { transformer } from './helpers'

export const fakeCompanyName = transformer(
  (property: string) => property.includes('companyName'),
  () => 'company.companyName',
)

export const fakeEmail = transformer(
  (property: string) => property.includes('email'),
  () => 'internet.email',
)

export const fakeId = transformer(
  (property: string) => property.includes('id') || property.includes('Id'),
  () => 'random.uuid',
)
