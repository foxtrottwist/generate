import { Definition, traverseProperties } from '../utils/helpers';

describe('traversProperties', () => {
  it('sets faker method correctly; simple case', () => {
    const schema = {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            name: {
              type: 'object',
              properties: {
                firstName: {
                  type: 'string',
                },
                lastName: {
                  type: 'string',
                },
              },
            },
            email: {
              type: 'string',
            },
          },
        },
      },
    };

    const schemaWithFakerMethods = {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            name: {
              type: 'object',
              properties: {
                firstName: {
                  type: 'string',
                },
                lastName: {
                  type: 'string',
                },
              },
            },
            email: {
              type: 'string',
              faker: 'internet.email',
            },
          },
        },
      },
    };

    function recurrsivelyCalledWrappingFunction(definition: Definition) {
      return traverseProperties(
        definition,
        (prop) => prop.includes('email'),
        () => 'internet.email',
        recurrsivelyCalledWrappingFunction,
      );
    }

    expect(recurrsivelyCalledWrappingFunction(schema)).toEqual(schemaWithFakerMethods);
  });

  it('sets faker method correctly; complex case', () => {
    const propName1 = 'name';
    const propName2 = 'favoriteSong';
    const mockMethod1 = 'hacker.adjective';
    const mockMethod2 = 'company.bsNoun';
    const schema = {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          music: {
            type: 'object',
            properties: {
              albums: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    [propName1]: { type: 'string' },
                    [propName2]: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    };

    const schemaWithFakerMethods = {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          music: {
            type: 'object',
            properties: {
              albums: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    [propName1]: { type: 'string', faker: mockMethod1 },
                    [propName2]: { type: 'string', faker: mockMethod2 },
                  },
                },
              },
            },
          },
        },
      },
    };

    function recurrsivelyCalledWrappingFunction(definition: Definition) {
      return traverseProperties(
        definition,
        (prop) => prop.includes(propName1) || prop.includes(propName2),
        (prop) => (prop.includes(propName1) ? mockMethod1 : mockMethod2),
        recurrsivelyCalledWrappingFunction,
      );
    }

    expect(recurrsivelyCalledWrappingFunction(schema)).toEqual(schemaWithFakerMethods);
  });
});
