import get from 'lodash.get';

export type Definition = {
  items?: any;
  properties?: object;
  required?: string[];
  type?: string;
};

/**
 * Helper function that requires all the properties in a schema definition
 * @param definition - The schema definition to operate on
 * @returns {Definiton} - The schema definition with all propeties required
 */
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
      // @ts-ignore: Object.fromEntries no type definitions
      properties: Object.fromEntries(modifiedProperties),
    };
  }

  if (definition.type === 'array') {
    return { ...definition, items: requireAllProperties(definition.items) };
  }

  return definition;
}

/**
 * Helper function to traverse a schema definition
 * @param definition - The given schema definition
 * @param tester - The callback that will check if the property name is the property you wish to provide a mock
 * @param mock  - The callback that will set the faker method you wish to use, after the property has been found by the tester callback
 * @param modifier - The callback that will be called recursively to traverse the definition object
 * @returns {Definition} - The modified schema definition
 */
export function traverseDefinition(
  definition: Definition,
  tester: (property: string) => boolean,
  mock: (property: string) => string,
  modifier: (definition: Definition) => Definition,
): Definition {
  const properties = get(definition, 'properties', false);

  if (properties) {
    const modifiedProperties = Object.entries(properties).map(([key, value]: [string, any]) => {
      if (value.type === 'array') {
        return [key, { ...value, items: modifier(value.items) }];
      }

      if (tester(key)) {
        return [key, { ...value, faker: mock(key) }];
      }

      return [key, modifier(value)];
    });
    // @ts-ignore: Object.fromEntries no type definitions
    return { ...definition, properties: Object.fromEntries(modifiedProperties) };
  }

  if (definition.type === 'array') {
    return { ...definition, items: modifier(definition.items) };
  }

  return definition;
}

/**
 * Helper function to simplify the creation of other functions that traverse a schema defintion and modifies it's structure
 * @param tester - The callback that will test the property keys to look for the given property name
 * @param mock  - The callback that will set the faker method you wish to use, after the property has been found by the tester callback
 * @returns {Function} - The function that will be called to operate on a schema definition
 */
export function createTransformer(
  tester: (property: string) => boolean,
  mock: (property: string) => string,
) {
  return function fn(definition: Definition): Definition {
    return traverseDefinition(definition, tester, mock, fn);
  };
}

/**
 * Helper to compose multiple functions to operate on a value; they will operate on the value in the order they were provided
 * @param fn - The initial function to compose with at least one other, into a single function
 * @param fns - At least one or more functions to compose into a single function
 * @returns {Function} - The result of two or more composed functions
 */
export function compose<Result>(fn: (a: any) => Result, ...fns: Function[]): (a: any) => Result {
  return (...args) => fns.reduce((acc, fn) => fn(acc), fn(...args));
}
