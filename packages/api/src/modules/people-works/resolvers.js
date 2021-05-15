import models from '../../setup/models';

export async function insertStaff(workId, staff) {
  await models.PeopleWorks.destroy({ where: { workId: workId } });

  const staffs = staff.map(staff => ({
    workId,
    peopleId: staff.people.id,
    rol: staff.rol
  }));
  return await models.PeopleWorks.bulkCreate(staffs, { returning: true });
}
