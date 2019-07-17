import { requireAllProperties } from '../utils/helpers';

describe('requireAllProperties', () => {
  it('returns a schema with all properties required', () => {
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
              type: 'string',
            },
            email: {
              type: 'string',
            },
          },
        },
      },
    };

    const schemaWithReqiuiredProperties = {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
          },
          required: ['id', 'name', 'email'],
        },
      },
      required: ['user'],
    };

    expect(requireAllProperties(schema)).toEqual(schemaWithReqiuiredProperties);
  });

  it('returns a schema with all properties required when initial schema type is array', () => {
    const schema = {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          user: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
              },
              name: {
                type: 'string',
              },
              email: {
                type: 'string',
              },
            },
          },
        },
      },
    };

    const schemaWithReqiuiredProperties = {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          user: {
            type: 'object',
            properties: {
              id: {
                type: 'integer',
              },
              name: {
                type: 'string',
              },
              email: {
                type: 'string',
              },
            },
            required: ['id', 'name', 'email'],
          },
        },
        required: ['user'],
      },
    };

    expect(requireAllProperties(schema)).toEqual(schemaWithReqiuiredProperties);
  });

  it('returns a schema with all deeply nested properties required', () => {
    const schema = {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            cats: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  color: { type: 'string' },
                  age: { type: 'string' },
                },
              },
            },
            owner: {
              type: 'object',
              properties: {
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
                sanityLevel: { type: 'integer' },
              },
            },
          },
        },
      },
    };

    const schemaWithReqiuiredProperties = {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            cats: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  color: { type: 'string' },
                  age: { type: 'string' },
                },
                required: ['name', 'color', 'age'],
              },
            },
            owner: {
              type: 'object',
              properties: {
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
                  required: ['firstName', 'lastName'],
                },
                sanityLevel: { type: 'integer' },
              },
              required: ['name', 'sanityLevel'],
            },
          },
          required: ['id', 'cats', 'owner'],
        },
      },
      required: ['user'],
    };

    expect(requireAllProperties(schema)).toEqual(schemaWithReqiuiredProperties);
  });
});
