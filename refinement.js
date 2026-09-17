(() => {
  const video = document.querySelector('.reel-video');

  if (video) {
    const lockSilent = () => {
      video.defaultMuted = true;
      video.muted = true;
      if (video.volume !== 0) video.volume = 0;
      video.controls = false;
      video.removeAttribute('controls');
    };

    const keepPlaying = () => {
      lockSilent();
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    };

    lockSilent();

    ['loadedmetadata', 'loadeddata', 'canplay'].forEach(type => {
      video.addEventListener(type, keepPlaying, { passive: true });
    });

    video.addEventListener('volumechange', lockSilent);
    video.addEventListener('ended', () => {
      video.currentTime = 0;
      keepPlaying();
    });

    video.addEventListener('pause', () => {
      if (!document.hidden && video.readyState >= 2) {
        requestAnimationFrame(keepPlaying);
      }
    });

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) keepPlaying();
    });

    // Give browsers several chances after parsing/loading. Muted inline video is
    // allowed to autoplay on modern browsers, but readiness timing can differ.
    requestAnimationFrame(keepPlaying);
    setTimeout(keepPlaying, 180);
    setTimeout(keepPlaying, 700);
  }

  // Pointer-position sheen on the surfaces users can actually interact with.
  document.querySelectorAll('.photo-frame, .reel-device, .menu-launch, .primary-link, .menu-trigger')
    .forEach(surface => {
      surface.addEventListener('pointermove', event => {
        const rect = surface.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        surface.style.setProperty('--mx', `${x.toFixed(1)}%`);
        surface.style.setProperty('--my', `${y.toFixed(1)}%`);

        const shell = surface.querySelector('.photo-image-shell');
        if (shell) {
          shell.style.setProperty('--mx', `${x.toFixed(1)}%`);
          shell.style.setProperty('--my', `${y.toFixed(1)}%`);
        }
      }, { passive: true });

      surface.addEventListener('pointerleave', () => {
        surface.style.setProperty('--mx', '50%');
        surface.style.setProperty('--my', '50%');
      }, { passive: true });
    });
})();
