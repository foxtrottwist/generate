import get from 'lodash.get'

type Definition = {
  items?: any
  properties?: object
  required?: string[]
  type?: string
}

export function requireAllProperties(definition: Definition): Definition {
  const properties = get(definition, 'properties', false)

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
    // @ts-ignore no type definitions for Object.fromEntries provided by core-js
    const newPropertiesObject = Object.fromEntries(modifiedProperties)
    const required = Object.keys(properties)

    return { ...definition, required, properties: newPropertiesObject }
  } else if (definition.type === 'array') {
    return { ...definition, items: requireAllProperties(definition.items) }
  }

  return definition
}

export function email(definition: Definition): Definition {
  const properties = get(definition, 'properties', false)
  if (properties) {
    const modifiedProperties = Object.entries(properties).map(
      ([key, value]) => {
        if (key.includes('email')) {
          return [key, { ...value, faker: 'internet.email' }]
        }
        return [key, value]
      },
    )
    // @ts-ignore no type definitions for Object.fromEntries provided by core-js
    const propertiesObject = Object.fromEntries(modifiedProperties)

    return { ...definition, properties: propertiesObject }
  }

  return definition
}

export function fakeId(definition: Definition): Definition {
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
    // @ts-ignore no type definitions for Object.fromEntries provided by core-js
    const propertiesObject = Object.fromEntries(modifiedProperties)

    return { ...definition, properties: propertiesObject }
  } else if (definition.type === 'array') {
    return { ...definition, items: fakeId(definition.items) }
  }
  return definition
}

export function company(definition: Definition): Definition {
  const properties = get(definition, 'properties', false)
  if (properties) {
    const modifiedProperties = Object.entries(properties).map(
      ([key, value]) => {
        if (key.includes('companyName')) {
          return [key, { ...value, faker: 'company.companyName' }]
        }
        return [key, value]
      },
    )
    // @ts-ignore no type definitions for Object.fromEntries provided by core-js
    const propertiesObject = Object.fromEntries(modifiedProperties)

    return { ...definition, properties: propertiesObject }
  }

  return definition
}
