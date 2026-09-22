(() => {
  /* Final cursor geometry overrides. Keep the pointer art outside the tiny hit box
     so the uploaded PNGs stay fully visible instead of getting clipped. */
  const cursorStyle = document.createElement('style');
  cursorStyle.id = 'zoom-cursor-final-fix';
  cursorStyle.textContent = `
    .ice-cursor{
      width:44px !important;
      height:44px !important;
      contain:none !important;
      overflow:visible !important;
      filter:none !important;
    }

    /* The parent can stretch/blur with pointer speed, but it NEVER rotates.
       Rotation belongs only to the pancake itself. */
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
      transform:scale(1) rotate(0deg) !important;
      transform-origin:50% 50% !important;
      transition:opacity 150ms ease !important;
      will-change:transform,opacity;
    }

    /* The crêpe is fixed at -32deg. Pointer movement must never alter this angle. */
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
      transform:scale(.58) rotate(-32deg) !important;
      transform-origin:50% 58% !important;
      transition:opacity 150ms ease,transform 220ms cubic-bezier(.22,1,.36,1) !important;
      will-change:transform,opacity;
    }

    .ice-cursor.hover{
      width:48px !important;
      height:48px !important;
    }

    .ice-cursor.hover .waffle-cursor-shape{
      opacity:0 !important;
    }

    .ice-cursor.hover .crepe-cursor-shape{
      opacity:1 !important;
      transform:scale(.96) rotate(-32deg) !important;
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

  /*
    Pancake-only rolling motion.
    Important details:
    - Uses pointermove universally (including Firefox) instead of relying on
      pointerrawupdate support detection.
    - Never derives rotation from pointer direction, so there are no sudden
      180-degree angle flips.
    - Writes an INLINE !important transform directly onto the pancake. This
      beats every older cursor rule in the cascade, so the spin is visible.
    - The crêpe also receives an inline !important transform locked to -32deg.
  */
  const cursor = document.querySelector('#iceCursor');
  const pancake = cursor?.querySelector('.waffle-cursor-shape');
  const crepe = cursor?.querySelector('.crepe-cursor-shape');

  if (cursor && pancake && crepe) {
    let lastX = null;
    let lastY = null;
    let lastTime = performance.now();
    let rotation = 0;
    let angularVelocity = 0;
    let targetVelocity = 0;
    let spinRAF = 0;

    const lockCrepe = () => {
      const scale = cursor.classList.contains('hover') ? .96 : .58;
      crepe.style.setProperty(
        'transform',
        `scale(${scale}) rotate(-32deg)`,
        'important'
      );
    };

    const applyPancake = () => {
      const scale = cursor.classList.contains('hover') ? .46 : 1;
      pancake.style.setProperty(
        'transform',
        `scale(${scale}) rotate(${rotation.toFixed(2)}deg)`,
        'important'
      );
    };

    const spinFrame = () => {
      spinRAF = 0;

      /* Ease toward the target speed so individual mouse events cannot create
         visible rotation jumps. */
      angularVelocity += (targetVelocity - angularVelocity) * .16;
      rotation = (rotation + angularVelocity) % 360;

      /* Movement energy fades gradually after the pointer stops. */
      targetVelocity *= .86;
      if (targetVelocity < .006) targetVelocity = 0;
      if (Math.abs(angularVelocity) < .006 && targetVelocity === 0) angularVelocity = 0;

      applyPancake();
      lockCrepe();

      if (angularVelocity !== 0 || targetVelocity !== 0) {
        spinRAF = requestAnimationFrame(spinFrame);
      }
    };

    const feedSpin = event => {
      const now = performance.now();

      if (lastX !== null) {
        const dx = event.clientX - lastX;
        const dy = event.clientY - lastY;
        const distance = Math.hypot(dx, dy);
        const dt = Math.max(7, now - lastTime);
        const speed = distance / dt;

        /* Total travel distance controls rolling speed. Direction is deliberately
           ignored, making the motion stable and smooth instead of twitchy. */
        if (distance > .1) {
          const movementVelocity = Math.min(7.2, distance * .07 + speed * 1.35);
          targetVelocity = Math.max(targetVelocity, movementVelocity);
          if (!spinRAF) spinRAF = requestAnimationFrame(spinFrame);
        }
      }

      lastX = event.clientX;
      lastY = event.clientY;
      lastTime = now;
    };

    /* Always use pointermove here. It is reliable across the desktop browsers
       this site targets and avoids raw-event support quirks. */
    addEventListener('pointermove', feedSpin, { passive:true });

    /* Hover can change without another movement event. Re-apply both transforms
       immediately whenever the cursor switches pancake <-> crêpe. */
    const cursorStateObserver = new MutationObserver(() => {
      applyPancake();
      lockCrepe();
    });
    cursorStateObserver.observe(cursor, {
      attributes:true,
      attributeFilter:['class']
    });

    applyPancake();
    lockCrepe();
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
