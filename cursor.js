(() => {
  const finePointer = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cursor = document.querySelector('#iceCursor');
  const shape = cursor?.querySelector('.cursor-shape');

  if (!finePointer || reducedMotion || !cursor || !shape) return;

  document.documentElement.classList.add('custom-cursor');

  let x = -100, y = -100;
  let lastX = -100, lastY = -100, lastTime = performance.now();

  let targetSpeed = 0;
  let speed = 0;
  let targetAngle = 0;
  let angle = 0;
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

    speed += (targetSpeed - speed) * .2;
    targetSpeed *= .80;

    const angleDelta = ((targetAngle - angle + 540) % 360) - 180;
    angle += angleDelta * .18;

    spinVelocity += ((speed * 8.5) - spinVelocity) * .12;
    spinVelocity *= .94;
    spin = (spin + spinVelocity) % 360;

    /* At low speed it stays nearly circular.
       At high speed it stretches along travel and squashes across it. */
    const intensity = Math.min(1, speed);
    const sx = 1 + intensity * .42;
    const sy = 1 - intensity * .24;

    shape.style.setProperty('--motion-angle', angle.toFixed(2) + 'deg');
    shape.style.setProperty('--motion-sx', sx.toFixed(3));
    shape.style.setProperty('--motion-sy', sy.toFixed(3));
    shape.style.setProperty('--pancake-spin', spin.toFixed(2) + 'deg');

    if (
      targetSpeed > .002 ||
      Math.abs(speed - targetSpeed) > .002 ||
      Math.abs(angleDelta) > .08 ||
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

    x = event.clientX;
    y = event.clientY;

    if (Math.abs(dx) + Math.abs(dy) > .1) {
      targetAngle = Math.atan2(dy, dx) * 180 / Math.PI;
    }

    /* Firefox-friendly pointermove speed normalization. */
    targetSpeed = Math.max(targetSpeed, Math.min(1, velocity / 1.65));

    cursor.style.setProperty(
      'transform',
      `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`,
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

  /* Initial stable state. */
  shape.style.setProperty('--motion-angle','0deg');
  shape.style.setProperty('--motion-sx','1');
  shape.style.setProperty('--motion-sy','1');
  shape.style.setProperty('--pancake-spin','0deg');
})();