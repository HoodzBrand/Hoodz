
fetch('data/lookbook.json')
  .then(res => res.json())
  .then(images => {
    const gallery = document.getElementById('lookbookGallery');
    images.forEach(img => {
      const div = document.createElement('div');
      div.className = 'lookbook-img';
      div.innerHTML = `<img src="${img}" alt="Lookbook">`;
      gallery.appendChild(div);
    });
  });
