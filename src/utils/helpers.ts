import get from 'lodash.get';

export type Definition = {
  items?: any;
  properties?: object;
  required?: string[];
  type?: string;
};

export function requireAllProperties(definition: Definition): Definition {
  const properties = get(definition, 'properties', false);

  if (properties) {
    const modifiedProperties = Object.entries(properties).map(([key, value]: [string, any]) => {
      if (value.type === 'array') {
        return [key, { ...value, items: requireAllProperties(value.items) }];
      }
      return [key, requireAllProperties(value)];
    });

    return {
      ...definition,
      required: Object.keys(properties),
      // @ts-ignore no type definitions
      properties: Object.fromEntries(modifiedProperties),
    };
  } else if (definition.type === 'array') {
    return { ...definition, items: requireAllProperties(definition.items) };
  }

  return definition;
}

export function traverseProperties(
  definition: Definition,
  tester: (property: string) => boolean,
  mock: (property?: string) => string,
  modifier: (definition: Definition) => Definition,
): Definition {
  const properties = get(definition, 'properties', false);

  if (properties) {
    const modifiedProperties = Object.entries(properties).map(([key, value]: [string, any]) => {
      if (value.type === 'array') {
        return [key, { ...value, items: modifier(value.items) }];
      } else if (tester(key)) {
        return [key, { ...value, faker: mock(key) }];
      }

      return [key, modifier(value)];
    });
    // @ts-ignore Object.fromEntries no type definitions
    return { ...definition, properties: Object.fromEntries(modifiedProperties) };
  } else if (definition.type === 'array') {
    return { ...definition, items: modifier(definition.items) };
  }

  return definition;
}

export function transformer(
  tester: (property: string) => boolean,
  mock: (property?: string) => string,
) {
  return function fn(definition: Definition): Definition {
    return traverseProperties(definition, tester, mock, fn);
  };
}

export function compose<Result>(fn: (a: any) => Result, ...fns: Function[]): (a: any) => Result {
  return (...args) => fns.reduce((acc, fn) => fn(acc), fn(...args));
}
