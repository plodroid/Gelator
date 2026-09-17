(() => {
  /* Final cursor geometry overrides. Keep the pointer art outside the tiny hit box
     so the uploaded PNGs stay fully visible instead of getting clipped. */
  const cursorStyle = document.createElement('style');
  cursorStyle.id = 'zoom-cursor-final-fix';
  cursorStyle.textContent = `
    .ice-cursor{
      --pancake-spin:0deg;
      width:44px !important;
      height:44px !important;
      contain:none !important;
      overflow:visible !important;
      filter:none !important;
    }

    /* Speed stretch + motion blur still happen here, but rotation does NOT.
       That keeps the crêpe fixed while the pancake gets its own spin. */
    .cursor-shape{
      inset:-14px !important;
      width:auto !important;
      height:auto !important;
      overflow:visible !important;
      contain:none !important;
      transform:scale(var(--sx,1),var(--sy,1)) !important;
      transform-origin:50% 50% !important;
    }

    /* Legacy class name; visually this is the uploaded pancake cursor. */
    .waffle-cursor-shape{
      inset:5px !important;
      overflow:visible !important;
      border:0 !important;
      border-radius:50% !important;
      clip-path:none !important;
      background:url("assets/pancake%20nobg.png") center / contain no-repeat !important;
      box-shadow:none !important;
      filter:drop-shadow(0 4px 4px rgba(50,24,15,.18)) !important;
      opacity:1;
      transform:scale(1) rotate(var(--pancake-spin)) !important;
      transform-origin:50% 50%;
      transition:opacity 150ms ease !important;
      will-change:transform,opacity;
    }

    /* The crêpe never follows pointer direction. It stays at one useful cursor angle. */
    .crepe-cursor-shape{
      inset:2px !important;
      overflow:visible !important;
      border:0 !important;
      border-radius:0 !important;
      clip-path:polygon(50% 0%,100% 100%,0% 100%) !important;
      background:url("assets/crepsSliceFacingUp.png") center / 100% 100% no-repeat !important;
      box-shadow:none !important;
      filter:drop-shadow(0 5px 5px rgba(50,24,15,.2)) !important;
      opacity:0;
      transform:scale(.58) rotate(32deg) !important;
      transform-origin:50% 58%;
      transition:opacity 150ms ease,transform 220ms cubic-bezier(.22,1,.36,1) !important;
      will-change:transform,opacity;
    }

    .ice-cursor.hover{
      width:48px !important;
      height:48px !important;
    }

    .ice-cursor.hover .waffle-cursor-shape{
      opacity:0 !important;
      transform:scale(.46) rotate(var(--pancake-spin)) !important;
    }

    .ice-cursor.hover .crepe-cursor-shape{
      opacity:1 !important;
      transform:scale(.96) rotate(32deg) !important;
    }

    /* Keep the video silent without repeatedly advertising that in the UI. */
    .reel-muted-badge{
      display:none !important;
    }

    .reel-note span:first-child{
      display:none !important;
    }

    .reel-note{
      justify-content:flex-end !important;
    }
  `;
  document.head.appendChild(cursorStyle);

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover:hover) and (pointer:fine)').matches;
  const video = document.querySelector('.reel-video');

  /* Native video: autoplay, loop, permanently silent, no player UI. */
  if (video) {
    const lockSilent = () => {
      video.autoplay = true;
      video.loop = true;
      video.playsInline = true;
      video.defaultMuted = true;
      video.muted = true;
      video.volume = 0;
      video.controls = false;
      video.disablePictureInPicture = true;
      if ('disableRemotePlayback' in video) video.disableRemotePlayback = true;
      video.setAttribute('muted', '');
      video.setAttribute('playsinline', '');
      video.removeAttribute('controls');
    };

    const keepPlaying = () => {
      lockSilent();
      const promise = video.play();
      if (promise && typeof promise.catch === 'function') promise.catch(() => {});
    };

    const markPlaying = () => {
      lockSilent();
      video.classList.add('is-playing');
    };

    lockSilent();

    ['loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough'].forEach(type => {
      video.addEventListener(type, keepPlaying, { passive: true });
    });

    video.addEventListener('playing', markPlaying, { passive: true });
    video.addEventListener('volumechange', lockSilent, { passive: true });
    video.addEventListener('ratechange', lockSilent, { passive: true });
    video.addEventListener('contextmenu', event => event.preventDefault());

    video.addEventListener('ended', () => {
      video.currentTime = 0;
      keepPlaying();
    });

    video.addEventListener('pause', () => {
      if (!document.hidden && video.readyState >= 2) requestAnimationFrame(keepPlaying);
    });

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) keepPlaying();
    });

    requestAnimationFrame(keepPlaying);
    setTimeout(keepPlaying, 120);
    setTimeout(keepPlaying, 480);
    setTimeout(keepPlaying, 1100);
  }

  /* Leave the working image-card fit exactly as-is. Only provide its existing
     background copy for the subtle blurred empty-space treatment. */
  document.querySelectorAll('.photo-image-shell').forEach(shell => {
    const image = shell.querySelector('img');
    if (!image) return;
    const src = image.getAttribute('src');
    if (!src) return;
    shell.style.setProperty('--photo-bg', `url("${src.replace(/"/g, '\\"')}")`);
  });

  if (!finePointer || reducedMotion) return;

  /* Pancake spin uses movement energy instead of pointer angle. This gives it
     inertia and removes 180-degree direction flips / micro-jitter. */
  const cursor = document.querySelector('#iceCursor');
  if (cursor) {
    let lastX = null;
    let lastY = null;
    let lastTime = performance.now();
    let lastMoveTime = lastTime;
    let rotation = 0;
    let angularVelocity = 0;
    let spinRAF = 0;

    const paintSpin = now => {
      spinRAF = 0;

      rotation += angularVelocity;
      if (rotation > 36000) rotation %= 360;

      const idleFor = now - lastMoveTime;
      angularVelocity *= idleFor > 45 ? .88 : .955;

      cursor.style.setProperty('--pancake-spin', `${rotation.toFixed(2)}deg`);

      if (Math.abs(angularVelocity) > .015) {
        spinRAF = requestAnimationFrame(paintSpin);
      }
    };

    const feedSpin = event => {
      const now = performance.now();

      if (lastX !== null && !cursor.classList.contains('hover')) {
        const dx = event.clientX - lastX;
        const dy = event.clientY - lastY;
        const distance = Math.hypot(dx, dy);
        const dt = Math.max(6, now - lastTime);
        const speed = distance / dt;

        /* Faster pointer movement adds more rotational energy, but the cap and
           inertia keep the result calm instead of snapping between angles. */
        const impulse = Math.min(2.8, distance * .024 + speed * .46);
        angularVelocity = Math.min(5.4, angularVelocity * .72 + impulse);
        lastMoveTime = now;

        if (!spinRAF) spinRAF = requestAnimationFrame(paintSpin);
      } else if (cursor.classList.contains('hover')) {
        angularVelocity *= .72;
      }

      lastX = event.clientX;
      lastY = event.clientY;
      lastTime = now;
    };

    const cursorPointerEvent = 'onpointerrawupdate' in window ? 'pointerrawupdate' : 'pointermove';
    addEventListener(cursorPointerEvent, feedSpin, { passive:true });
  }

  const surfaces = document.querySelectorAll(
    '.photo-frame, .reel-device, .menu-launch, .primary-link, .menu-trigger, .wordmark, .menu-row'
  );

  surfaces.forEach(surface => {
    let raf = 0;
    let nextX = 50;
    let nextY = 50;
    let pullX = 0;
    let pullY = 0;

    const paint = () => {
      raf = 0;
      surface.style.setProperty('--mx', `${nextX.toFixed(1)}%`);
      surface.style.setProperty('--my', `${nextY.toFixed(1)}%`);
      surface.style.setProperty('--pull-x', `${pullX.toFixed(2)}px`);
      surface.style.setProperty('--pull-y', `${pullY.toFixed(2)}px`);

      const shell = surface.querySelector('.photo-image-shell');
      if (shell) {
        shell.style.setProperty('--mx', `${nextX.toFixed(1)}%`);
        shell.style.setProperty('--my', `${nextY.toFixed(1)}%`);
      }
    };

    surface.addEventListener('pointermove', event => {
      const rect = surface.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / Math.max(1, rect.width);
      const ny = (event.clientY - rect.top) / Math.max(1, rect.height);

      nextX = Math.max(0, Math.min(100, nx * 100));
      nextY = Math.max(0, Math.min(100, ny * 100));

      const strength = surface.matches('.primary-link,.menu-trigger,.menu-launch,.wordmark') ? 3.2 : 1.6;
      pullX = (nx - .5) * strength * 2;
      pullY = (ny - .5) * strength * 2;

      if (!raf) raf = requestAnimationFrame(paint);
    }, { passive: true });

    surface.addEventListener('pointerleave', () => {
      nextX = 50;
      nextY = 50;
      pullX = 0;
      pullY = 0;
      if (!raf) raf = requestAnimationFrame(paint);
    }, { passive: true });
  });
})();
