import React from 'react';
import PropTypes from 'prop-types';
import setTimeFormat from '../../utils/timeFromat';
import s from './Controls.module.css';

export const Controls = ({ time, start, stop, reset, wait }) => (
  <>
    <header className={s.header}>
      <h1>StopWatch</h1>
      <h1>{setTimeFormat(time)}</h1>
    </header>
    <section>
      <div className={s.container}>
        <button type="button" className={s.button} onClick={start}>
          Start
        </button>
        <button type="button" className={s.button} onClick={stop}>
          Stop
        </button>
        <button type="button" className={s.button} onClick={reset}>
          Reset
        </button>
        <button type="button" className={s.button} onClick={wait}>
          Wait
        </button>
      </div>
    </section>
  </>
);

Controls.propTypes = {
  time: PropTypes.number.isRequired,
  start: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  wait: PropTypes.func.isRequired,
};
