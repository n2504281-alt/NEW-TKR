document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuItems = document.querySelectorAll('.menu-item-card');
  const searchInput = document.querySelector('.menu-search-input');

  if (filterButtons.length > 0 && menuItems.length > 0) {
    // Category Filtering
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Toggle active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');
        filterMenu(filterValue, searchInput ? searchInput.value.toLowerCase() : '');
      });
    });

    // Live Search
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const searchQuery = e.target.value.toLowerCase();
        const activeFilterButton = document.querySelector('.filter-btn.active');
        const activeCategory = activeFilterButton ? activeFilterButton.getAttribute('data-filter') : 'all';

        filterMenu(activeCategory, searchQuery);
      });
    }

    function filterMenu(category, query) {
      menuItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        const itemNameEn = item.querySelector('.dish-title-en') ? item.querySelector('.dish-title-en').textContent.toLowerCase() : '';
        const itemNameUr = item.querySelector('.dish-title-ur') ? item.querySelector('.dish-title-ur').textContent.toLowerCase() : '';
        const itemDescEn = item.querySelector('.dish-desc-en') ? item.querySelector('.dish-desc-en').textContent.toLowerCase() : '';
        const itemDescUr = item.querySelector('.dish-desc-ur') ? item.querySelector('.dish-desc-ur').textContent.toLowerCase() : '';

        const matchesCategory = (category === 'all' || itemCategory === category);
        const matchesQuery = (
          itemNameEn.includes(query) || 
          itemNameUr.includes(query) || 
          itemDescEn.includes(query) || 
          itemDescUr.includes(query)
        );

        if (matchesCategory && matchesQuery) {
          // Show item
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          // Hide item
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    }
  }
});
