import React, { memo } from 'react';
import { CounterCard } from './common/CounterCard';
import { faDatabase, faPen, faTasks } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
  return (
    <div className="container">
      <div className="row" style={{ marginTop: '50px' }}>
        <div className="col-md-6 col-sm-6 col-xl-3">
          <CounterCard
            color="#02BC77"
            title="Ver listado de works"
            total="Ir al listado"
            icon={faDatabase}
            to={'/admincp/work/manage'}
          />
        </div>
        <div className="col-md-6 col-sm-6 col-xl-3">
          <CounterCard
            color="#28c3d7"
            title="Añadir work"
            total="Ir al formulario"
            icon={faTasks}
            to={'/admincp/work/add'}
          />
        </div>
        <div className="col-md-6 col-sm-6 col-xl-3">
          <CounterCard
            color="#d9534f"
            title="Añadir publicación"
            total="Ir al formulario"
            icon={faPen}
            to={'/admincp/blog/add_post'}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(Dashboard);
