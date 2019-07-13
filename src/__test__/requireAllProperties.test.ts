import { requireAllProperties } from '../utils/helpers'

describe('requireAllProperties', () => {
  const required = ['id', 'name', 'email']
  const schema = {
    type: 'object',
    properties: {
      user: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            minimum: 0,
            exclusiveMinimum: true,
          },
          name: {
            type: 'string',
            faker: 'name.findName',
          },
          email: {
            type: 'string',
            format: 'email',
            faker: 'internet.email',
          },
        },
      },
    },
  }
  it('should return an object with the property "required"', () => {
    const requiredPoperties = requireAllProperties(schema)
    expect(requiredPoperties).toHaveProperty('required')
  })
})
