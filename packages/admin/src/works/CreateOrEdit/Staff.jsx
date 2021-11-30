import React from 'react';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Image from '../../common/Image';
import { rolesById } from '@readerfront/shared/build/params/works';
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
      {Object.keys(roles).map(key => {
        const rol = rolesById(Number(key));
        return (
          <StaffRole key={rol.name}>
            <span className="title">
              {f({ id: `people.rol.${rol.name}`, defaultMessage: rol.name })}
            </span>
            <div>
              {roles[key].map(r => (
                <StaffDetail key={rol.id + r.name}>
                  <Image src={r.thumbnail} width={40} />
                  <span>{r.name}</span>
                  <button onClick={() => onRemove({ id: r.id, rol: rol.id })}>
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
