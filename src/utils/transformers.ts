import { transformer } from './helpers'

export const fakeCompanyName = transformer(
  (key: string) => key.includes('companyName'),
  'company.companyName',
)

export const fakeEmail = transformer(
  (key: string) => key.includes('email'),
  'internet.email',
)

export const fakeId = transformer(
  (key: string) => key.includes('id') || key.includes('Id'),
  'random.uuid',
)
