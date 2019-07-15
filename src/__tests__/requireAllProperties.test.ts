import { requireAllProperties } from '../utils/helpers';

describe('requireAllProperties', () => {
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

  it('should return a schema with all properties required', () => {
    expect(requireAllProperties(schema)).toEqual(schemaWithReqiuiredProperties);
  });
});
