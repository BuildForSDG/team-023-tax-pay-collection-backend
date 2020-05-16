/* eslint-disable import/no-extraneous-dependencies */
const faker = require('faker');
const { ObjectID } = require('mongodb');

module.exports = [
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e995a'),
    frist_name: 'Super',
    middle_name: 'Administrator',
    last_name: 'Tax Man',
    date_of_birth: '1960-10-01',
    email: 'admin@admin.com',
    password: '$2a$05$2KOSBnbb0r.0TmMrvefbluTOB735rF/KRZb4pmda4PdvU9iDvUB26',
    role: 'admin',
    verified: true,
    verification: '3d6e072c-0eaf-4239-bb5e-495e6486148f',
    city: 'Jos',
    state: 'Plateau',
    country: 'Nigeria',
    phone: '123123',
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    _id: new ObjectID('5aa1c2c35ef7a4e97b5e995b'),
    frist_name: 'Simple user',
    middle_name: 'Simple user',
    last_name: 'Simple user',
    date_of_birth: '1962-10-01',
    email: 'user@user.com',
    password: '$2a$05$2KOSBnbb0r.0TmMrvefbluTOB735rF/KRZb4pmda4PdvU9iDvUB26',
    role: 'user',
    verified: true,
    verification: '3d6e072c-0eaf-4239-bb5e-495e6486148d',
    city: 'Jos',
    state: 'Plateau',
    country: 'Nigeria',
    phone: '123123',
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  }
];
