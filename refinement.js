(() => {
  /* Final cursor geometry overrides. The older stylesheet used paint containment,
     which clipped any cursor art extending past the small hit box. */
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

    .cursor-shape{
      inset:-14px !important;
      width:auto !important;
      height:auto !important;
      overflow:visible !important;
      contain:none !important;
      transform-origin:50% 50% !important;
    }

    /* Legacy class name; this is the uploaded pancake image now. */
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
      transform:scale(1) rotate(0deg);
      transform-origin:50% 50%;
    }

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
    }

    .ice-cursor.hover{
      width:48px !important;
      height:48px !important;
    }

    .ice-cursor.hover .waffle-cursor-shape{
      opacity:0 !important;
      transform:scale(.46) rotate(20deg) !important;
    }

    .ice-cursor.hover .crepe-cursor-shape{
      opacity:1 !important;
      transform:scale(.96) rotate(32deg) !important;
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

  /* Give each image card a blurred copy behind the sharp, fully-contained image. */
  document.querySelectorAll('.photo-image-shell').forEach(shell => {
    const image = shell.querySelector('img');
    if (!image) return;
    const src = image.getAttribute('src');
    if (!src) return;
    shell.style.setProperty('--photo-bg', `url("${src.replace(/"/g, '\\"')}")`);
  });

  if (!finePointer || reducedMotion) return;

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

      /* Tiny magnetic pull: enough to feel responsive, not enough to look gimmicky. */
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
