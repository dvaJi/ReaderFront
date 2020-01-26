import React from 'react';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Image from 'common/Image';
import { rolIdToName } from 'utils/common';
import { StaffWrapper, StaffRole, StaffDetail } from './styles';

function Staff({ staff, onRemove }) {
  const { formatMessage: f } = useIntl();
  let roles = {};
  staff.forEach(s => {
    if (!roles[s.rol]) {
      roles[s.rol] = [];
    }

    roles[s.rol].push(s.people);
  });

  return (
    <StaffWrapper>
      {Object.keys(roles).map(rol => {
        const rolName = rolIdToName(Number(rol));
        return (
          <StaffRole key={rolName}>
            <span className="title">
              {f({ id: `people.rol.${rolName}`, defaultMessage: rolName })}
            </span>
            <div>
              {roles[rol].map(people => (
                <StaffDetail key={rol + people.name}>
                  <Image src={people.thumbnail} width={40} />
                  <span>{people.name}</span>
                  <button
                    onClick={() =>
                      onRemove({ id: people.id, rol: Number(rol) })
                    }
                  >
                    <FontAwesomeIcon icon="times" />
                  </button>
                </StaffDetail>
              ))}
            </div>
          </StaffRole>
        );
      })}
    </StaffWrapper>
  );
}

export default Staff;
