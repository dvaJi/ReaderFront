import Sequelize from 'sequelize';
import { createQueryInterfaceMock, field } from 'sequelize-test-utils';
import { up, down } from '../011-archives';

describe('#up', () => {
  it('creates archives table', () => {
    const queryInterface = createQueryInterfaceMock(jest.fn);
    up(queryInterface, Sequelize);
    expect(queryInterface.createTable).toBeCalled();

    const call = queryInterface.createTable.mock.calls[0];
    expect(call[0]).toBe('archives');
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
  it('drops archives table', () => {
    const queryInterface = createQueryInterfaceMock(jest.fn);
    down(queryInterface, Sequelize);
    expect(queryInterface.dropTable).toBeCalledWith('archives');
  });
});
