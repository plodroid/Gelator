(() => {
  const finePointer = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cursor = document.querySelector('#iceCursor');
  const shape = cursor?.querySelector('.cursor-shape');

  if (!finePointer || reducedMotion || !cursor || !shape) return;

  document.documentElement.classList.add('custom-cursor');

  let lastX = -100;
  let lastY = -100;
  let lastTime = performance.now();

  let targetSpeed = 0;
  let speed = 0;
  let spin = 0;
  let spinVelocity = 0;
  let raf = 0;

  const updateHoverState = target => {
    const interactive = !!target?.closest?.(
      'a,button,input,select,textarea,[role="button"],[data-lightbox],[data-tilt]'
    );
    cursor.classList.toggle('hover', interactive);
  };

  const paint = () => {
    raf = 0;

    speed += (targetSpeed - speed) * .20;
    targetSpeed *= .80;

    spinVelocity += ((speed * 8.5) - spinVelocity) * .12;
    spinVelocity *= .94;
    spin = (spin + spinVelocity) % 360;

    /* Original-style behavior:
       - parent never rotates
       - fast movement stretches X and squashes Y
       - only the pancake itself spins
       - crepe remains locked to -32deg */
    const intensity = Math.min(1, speed);
    const sx = 1 + intensity * .42;
    const sy = 1 - intensity * .24;

    shape.style.setProperty('--motion-angle', '0deg');
    shape.style.setProperty('--motion-sx', sx.toFixed(3));
    shape.style.setProperty('--motion-sy', sy.toFixed(3));
    shape.style.setProperty('--pancake-spin', spin.toFixed(2) + 'deg');

    if (
      targetSpeed > .002 ||
      Math.abs(speed - targetSpeed) > .002 ||
      Math.abs(spinVelocity) > .02
    ) {
      raf = requestAnimationFrame(paint);
    }
  };

  const onMove = event => {
    const now = performance.now();
    const dx = event.clientX - lastX;
    const dy = event.clientY - lastY;
    const dt = Math.max(6, now - lastTime);
    const velocity = Math.hypot(dx, dy) / dt;

    targetSpeed = Math.max(targetSpeed, Math.min(1, velocity / 1.65));

    cursor.style.setProperty(
      'transform',
      `translate3d(${event.clientX}px,${event.clientY}px,0) translate(-50%,-50%)`,
      'important'
    );
    cursor.classList.add('ready');
    updateHoverState(event.target);

    lastX = event.clientX;
    lastY = event.clientY;
    lastTime = now;

    if (!raf) raf = requestAnimationFrame(paint);
  };

  addEventListener('pointermove', onMove, {passive:true});
  document.addEventListener('pointerover', event => updateHoverState(event.target), {passive:true});

  document.addEventListener('pointerout', event => {
    if (!event.relatedTarget) cursor.classList.remove('ready');
  }, {passive:true});

  document.addEventListener('mouseenter', () => cursor.classList.add('ready'));
  document.addEventListener('mouseleave', () => cursor.classList.remove('ready'));

  shape.style.setProperty('--motion-angle', '0deg');
  shape.style.setProperty('--motion-sx', '1');
  shape.style.setProperty('--motion-sy', '1');
  shape.style.setProperty('--pancake-spin', '0deg');
})();