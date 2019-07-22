import { createTransformer } from './helpers';

export const fakeAppName = createTransformer(
  (property) =>
    property === 'app' || property === 'appLabel' || property === 'appName' || property === 'name',
  () => 'commerce.product',
);

export const fakeCompanyName = createTransformer(
  (property) => property.includes('companyName'),
  () => 'company.companyName',
);

export const fakeDomain = createTransformer(
  (property) => property.includes('domain') || property.includes('Domain'),
  () => 'internet.domainName',
);

export const fakeEmail = createTransformer(
  (property) => property.includes('email'),
  () => 'internet.email',
);

export const fakeId = createTransformer(
  (property) => property.includes('id') || property.includes('Id'),
  () => 'random.uuid',
);

export const fakeName = createTransformer(
  (property) => property.includes('firstName') || property.includes('lastName'),
  (property) => `name.${property}`,
);
