import get from 'lodash.get'

export function requireAllProperties(definition: object): object {
  const properties = get(definition, 'properties', null)

  if (properties) {
    const modifiedProperties = Object.entries(properties).map(
      ([key, value]: [string, any]) => {
        if (value.type === 'object') {
          return [key, requireAllProperties(value)]
        } else if (value.type === 'array') {
          return [key, { ...value, items: requireAllProperties(value.items) }]
        }
        return [key, value]
      },
    )
    // @ts-ignore ignoring Object.fromEntries provided by core-js
    const newPropertiesObject = Object.fromEntries(modifiedProperties)
    const required = Object.keys(properties)

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

export function fakeId(definition: object): object {
  const properties = get(definition, 'properties', false)

  if (properties) {
    const modifiedProperties = Object.entries(properties).map(
      ([key, value]: [string, any]) => {
        if (key.includes('id') || key.includes('Id')) {
          return [key, { ...value, faker: 'random.uuid' }]
        } else if (value.type === 'object') {
          return [key, fakeId(value)]
        } else if (value.type === 'array') {
          return [key, { ...value, items: fakeId(value.items) }]
        }

        return [key, value]
      },
    )
    // @ts-ignore ignoring Object.fromEntries provided by core-js
    const propertiesObject = Object.fromEntries(modifiedProperties)

    return { ...definition, properties: propertiesObject }
  }
  return definition
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
