// Register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/~hs9166/iste252/PWA/sw.js').then(reg => {
      console.log('Service Worker Registered');
    });
  }
  
  // Fetch and display activities
  async function loadActivities() {
    const response = await fetch('/~hs9166/iste252/PWA/activityData.JSON');
    const data = await response.json();
    displayActivities(data.locations);
  }
  
  function displayActivities(activities) {
    const list = document.getElementById('activity-list');
    list.innerHTML = '';
    activities.forEach(activity => {
      const card = document.createElement('div');
      card.className = 'activity-card';
      card.innerHTML = `
        <img src="${activity.imageUrl}" alt="${activity.name}">
        <h2>${activity.name}</h2>
        <div class="activity-info">
          <p>${activity.rating} (${activity.reviews} reviews) | ${activity.duration}</p>
          <p>From ${activity.price}</p>
        </div>
        <button onclick="viewDetail(${activity.id})">View Details</button>
        <button onclick="toggleFavorite(${activity.id})">${activity.favorite ? 'Unfavorite' : 'Favorite'}</button>
      `;
      list.appendChild(card);
    });
  }
  
  // View activity details
  function viewDetail(id) {
    fetch('/~hs9166/iste252/PWA/activityData.json').then(response => response.json()).then(data => {
      const activity = data.locations.find(act => act.id === id);
      const detail = document.getElementById('detail-content');
      detail.innerHTML = `
        <img src="${activity.imageUrl}" alt="${activity.name}">
        <h2>${activity.name}</h2>
        <p>${activity.description}</p>
        <h3>What's Included</h3>
        <p>${activity.included.join(', ')}</p>
        <h3>Accessibility</h3>
        <ul>
          <li>Wheelchair Accessible: ${activity.accessibility.wheelchairAccessible ? 'Yes' : 'No'}</li>
          <li>Braille Available: ${activity.accessibility.braille ? 'Yes' : 'No'}</li>
        </ul>
        <h3>Reviews</h3>
        ${activity.activityDetails.reviews.map(review => `
          <p><strong>${review.username}</strong> (${review.rating}/5): ${review.comment}</p>
        `).join('')}
        <button onclick="toggleFavorite(${id})">${activity.favorite ? 'Unfavorite' : 'Favorite'}</button>
      `;
      document.getElementById('activity-detail').classList.remove('hidden');
    });
  }
  
  function closeDetail() {
    document.getElementById('activity-detail').classList.add('hidden');
  }
  
  // Favorite an activity 
  function toggleFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favorites.includes(id)) {
      favorites = favorites.filter(favId => favId !== id);
    } else {
      favorites.push(id);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
  
  // Show favorite activities
  function showFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    fetch('/~hs9166/iste252/PWA/activityData.json').then(response => response.json()).then(data => {
      displayActivities(data.locations.filter(activity => favorites.includes(activity.id)));
    });
  }
  
  // Load activities on page load
  loadActivities();
  