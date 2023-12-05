const btn = document.getElementById('btn');

    btn.addEventListener('click', () => {
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;

      alert(`Ширина экрана: ${screenWidth}px, Высота экрана: ${screenHeight}px`);
    });


