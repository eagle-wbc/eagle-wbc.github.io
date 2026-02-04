document.addEventListener('DOMContentLoaded', () => {
  const burgers = Array.from(document.querySelectorAll('.navbar-burger'));
  burgers.forEach((burger) => {
    burger.addEventListener('click', () => {
      burger.classList.toggle('is-active');
      const navbar = burger.closest('.navbar');
      if (navbar) {
        const menu = navbar.querySelector('.navbar-menu');
        if (menu) {
          menu.classList.toggle('is-active');
        }
      }
    });
  });

  if (typeof bulmaCarousel !== 'undefined') {
    bulmaCarousel.attach('.carousel', {
      slidesToScroll: 1,
      slidesToShow: 3,
      loop: true,
      infinite: true,
      autoplay: false,
      autoplaySpeed: 3000,
    });
  }

  if (typeof bulmaSlider !== 'undefined') {
    bulmaSlider.attach();
  }

  const gallery = document.getElementById('gallery');
  if (gallery) {
    gallery.addEventListener('click', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }
      if (!target.classList.contains('video-toggle')) {
        return;
      }
      const card = target.closest('.video-card');
      if (!card) {
        return;
      }
      const video = card.querySelector('video');
      if (!video) {
        return;
      }

      const variant = target.getAttribute('data-variant');
      if (!variant) {
        return;
      }

      card.querySelectorAll('.video-toggle').forEach((button) => {
        button.classList.remove('active');
      });
      target.classList.add('active');

      const source = video.getAttribute(`data-${variant}`);
      if (source && source !== video.currentSrc) {
        const wasPlaying = !video.paused;
        video.pause();
        video.src = source;
        video.load();
        video.currentTime = 0;
        if (wasPlaying) {
          video.play().catch(() => {});
        }
      }
    });
  }
});
