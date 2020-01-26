import React, { memo } from 'react';
import { CounterCard } from './CounterCard';

function Dashboard() {
  return (
    <div className="container">
      <div className="row" style={{ marginTop: '50px' }}>
        <div className="col-md-6 col-sm-6 col-xl-3">
          <CounterCard
            color="#02BC77"
            title="Ver listado de works"
            total="Ir al listado"
            icon="database"
            to={'/work/manage'}
          />
        </div>
        <div className="col-md-6 col-sm-6 col-xl-3">
          <CounterCard
            color="#28c3d7"
            title="Añadir work"
            total="Ir al formulario"
            icon="tasks"
            to={'/work/add'}
          />
        </div>
        <div className="col-md-6 col-sm-6 col-xl-3">
          <CounterCard
            color="#d9534f"
            title="Añadir publicación"
            total="Ir al formulario"
            icon="pen"
            to={'/blog/add_post'}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(Dashboard);
