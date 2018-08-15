import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CounterCard } from './common/CounterCard';
import {
  faDatabase,
  faPen,
  faCogs,
  faTasks
} from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => (
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
      <div className="col-md-6 col-sm-6 col-xl-3">
        <CounterCard
          color="#FFD950"
          title="Cambiar preferencias"
          total="Ir a la Configuración"
          icon={faCogs}
          to={'/admincp/preferences'}
        />
      </div>
    </div>
  </div>
);

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};

function dashboardState(state) {
  return {
    user: state.user
  };
}

export default connect(
  dashboardState,
  {}
)(Dashboard);
