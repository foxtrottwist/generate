import get from 'lodash.get'

export function requireAllProperties(definition: object): object {
  // prettier-ignore
  const properties = get(definition, 'properties', null) || get(definition, 'items.properties', null)

  if (properties) {
    const required = Object.keys(properties)
    const modifiedProperties = Object.entries(properties).map(
      ([key, value]: [string, any]) => {
        if (value.type === 'array' || value.type === 'object') {
          return [key, requireAllProperties(value)]
        }
        return [key, value]
      },
    )
    // @ts-ignore ignoring Object.fromEntries provided by core-js
    const newPropertiesObject = Object.fromEntries(modifiedProperties)

    return { ...definition, required, properties: newPropertiesObject }
  }

  return definition
}

export function email(definition: object) {
  const properties = get(definition, 'properties', {})

  const modifiedProperties = Object.entries(properties).map(([key, value]) => {
    if (key.includes('email')) {
      return [key, { ...value, faker: 'internet.email' }]
    }
    return [key, value]
  })
  // @ts-ignore ignoring Object.fromEntries provided by core-js
  const propertiesObject = Object.fromEntries(modifiedProperties)

  return { ...definition, properties: propertiesObject }
}

export function id(definition: object) {
  const properties = get(definition, 'properties', {})

  const modifiedProperties = Object.entries(properties).map(([key, value]) => {
    if (key.includes('id')) {
      return [key, { ...value, faker: 'random.uuid' }]
    }
    return [key, value]
  })
  // @ts-ignore ignoring Object.fromEntries provided by core-js
  const propertiesObject = Object.fromEntries(modifiedProperties)

  return { ...definition, properties: propertiesObject }
}

export function company(definition: object) {
  const properties = get(definition, 'properties', {})

  const modifiedProperties = Object.entries(properties).map(([key, value]) => {
    if (key.includes('companyName')) {
      return [key, { ...value, faker: 'company.companyName' }]
    }
    return [key, value]
  })
  // @ts-ignore ignoring Object.fromEntries provided by core-js
  const propertiesObject = Object.fromEntries(modifiedProperties)

  return { ...definition, properties: propertiesObject }
}
