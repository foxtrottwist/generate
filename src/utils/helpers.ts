import get from 'lodash.get'

export type Definition = {
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
        if (value.type === 'array') {
          return [key, { ...value, items: requireAllProperties(value.items) }]
        }
        return [key, requireAllProperties(value)]
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

export function traverseProperties(
  definition: Definition,
  targetMock: string,
  tester: (key: string) => boolean,
  modifier: (o: object) => object,
): Definition {
  const properties = get(definition, 'properties', false)

  if (properties) {
    const modifiedProperties = Object.entries(properties).map(
      ([key, value]: [string, any]) => {
        if (value.type === 'array') {
          return [key, { ...value, items: modifier(value.items) }]
        } else if (tester(key)) {
          return [key, { ...value, faker: targetMock }]
        }

        return [key, modifier(value)]
      },
    )
    // @ts-ignore Object.fromEntries no type definitions
    const modifiedPropertiesObject = Object.fromEntries(modifiedProperties)
    return { ...definition, properties: modifiedPropertiesObject }
  } else if (definition.type === 'array') {
    return { ...definition, items: modifier(definition.items) }
  }

  return definition
}

// prettier-ignore
export function compose<Result>(fn: (a: any) => Result,...fns: Function[]): (a: any) => Result {
  return (...args) => fns.reduce((acc, fn) => fn(acc), fn(...args))
}
