import Sequelize from 'sequelize';
import { createQueryInterfaceMock, field } from 'sequelize-test-utils';
import { up, down } from '../010-people-works';

describe('#up', () => {
  it('creates people_works table', () => {
    const queryInterface = createQueryInterfaceMock(jest.fn);
    up(queryInterface, Sequelize);
    expect(queryInterface.createTable).toBeCalled();

    const call = queryInterface.createTable.mock.calls[0];
    expect(call[0]).toBe('people_works');
  });

  it('table has auto increment id', () => {
    const queryInterface = createQueryInterfaceMock(jest.fn);
    up(queryInterface, Sequelize);

    const call = queryInterface.createTable.mock.calls[0];
    const idField = field(call[1].id);
    expect(idField.allowNull()).toBe(false);
    expect(idField.isAutoIncrement()).toBe(true);
    expect(idField.isPrimaryKey()).toBe(true);
    expect(idField.isType(Sequelize.INTEGER)).toBe(true);
  });
});

describe('#down', () => {
  it('drops people_works table', () => {
    const queryInterface = createQueryInterfaceMock(jest.fn);
    down(queryInterface, Sequelize);
    expect(queryInterface.dropTable).toBeCalledWith('people_works');
  });
});
