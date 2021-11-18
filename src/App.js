import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Controls } from './components/Controls';
import { Observable, Subject } from 'rxjs';
import { map, buffer, debounceTime, filter, takeUntil } from 'rxjs/operators';
import './App.css';

function App() {
  const [state, setState] = useState('stop');
  const [time, setTime] = useState(0);

  const stop$ = useMemo(() => new Subject(), []);
  const click$ = useMemo(() => new Subject(), []);

  const start = () => {
    setState('start');
  };

  const stop = useCallback(() => {
    setTime(0);
    setState('stop');
  }, []);

  const reset = useCallback(() => {
    setTime(0);
  }, []);

  const wait = useCallback(() => {
    click$.next();
    setState('wait');
    click$.next();
  }, [click$]);

  useEffect(() => {
    const doubleClick$ = click$.pipe(
      buffer(click$.pipe(debounceTime(300))),
      map(list => list.length),
      filter(value => value >= 2),
    );
    const timer$ = new Observable(observer => {
      let count = 0;

      const intervalId = setInterval(() => {
        observer.next((count += 1));
        console.log(count);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }, []);

    const subscribtion$ = timer$
      .pipe(takeUntil(doubleClick$))
      .pipe(takeUntil(stop$))
      .subscribe({
        next: () => {
          if (state === 'start') {
            setTime(prev => prev + 1);
          }
        },
      });

    return () => {
      subscribtion$.unsubscribe();
    };
  }, [click$, state, stop$]);
  return (
    <section>
      <Controls
        time={time}
        start={start}
        stop={stop}
        reset={reset}
        wait={wait}
      />
    </section>
  );
}

export default App;
