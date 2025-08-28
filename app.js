// EcoSphere - Fully Functional Platform JavaScript

// Application state
let currentPage = 'home';
let userLocation = null;
let progressChart = null;
let impactChart = null;

// Data from JSON
const platformData = {
  activities: [
    {
      category: "Transport",
      options: [
        {name: "Car", co2_per_km: 0.21, tokens: 0},
        {name: "Bus", co2_per_km: 0.08, tokens: 2},
        {name: "Train", co2_per_km: 0.04, tokens: 3},
        {name: "Bike", co2_per_km: 0, tokens: 5},
        {name: "Walk", co2_per_km: 0, tokens: 5}
      ]
    },
    {
      category: "Energy",
      options: [
        {name: "Used renewable energy", co2_saved: 2.5, tokens: 10},
        {name: "Turned off lights", co2_saved: 0.5, tokens: 3},
        {name: "Unplugged devices", co2_saved: 0.3, tokens: 2},
        {name: "Used energy-efficient appliances", co2_saved: 1.2, tokens: 5}
      ]
    },
    {
      category: "Food",
      options: [
        {name: "Plant-based meal", co2_saved: 2.0, tokens: 8},
        {name: "Local produce", co2_saved: 0.8, tokens: 4},
        {name: "Reduced food waste", co2_saved: 1.5, tokens: 6},
        {name: "Vegetarian day", co2_saved: 3.0, tokens: 12}
      ]
    },
    {
      category: "Shopping",
      options: [
        {name: "Bought second-hand", co2_saved: 5.0, tokens: 15},
        {name: "Chose eco-friendly product", co2_saved: 2.0, tokens: 8},
        {name: "Reduced packaging", co2_saved: 0.5, tokens: 3},
        {name: "Repaired instead of buying new", co2_saved: 8.0, tokens: 20}
      ]
    }
  ],
  products: [
    {
      id: 1,
      name: "Plant 10 Trees",
      description: "Plant 10 native trees in deforestation areas",
      price: 100,
      co2_offset: "25kg CO₂",
      image: "🌳",
      category: "Carbon Offset"
    },
    {
      id: 2, 
      name: "Solar Panel Credit",
      description: "Support 1kW solar panel installation",
      price: 200,
      co2_offset: "50kg CO₂ annually",
      image: "☀️",
      category: "Clean Energy"
    },
    {
      id: 3,
      name: "Eco-Friendly Water Bottle",
      description: "Stainless steel water bottle made from recycled materials",
      price: 50,
      co2_saved: "5kg CO₂",
      image: "🧴",
      category: "Sustainable Products"
    },
    {
      id: 4,
      name: "Ocean Cleanup Donation",
      description: "Remove 1kg of plastic from ocean",
      price: 75,
      impact: "Prevent 500 marine animals from harm",
      image: "🌊",
      category: "Environmental Protection"
    },
    {
      id: 5,
      name: "Renewable Energy Certificate",
      description: "1 MWh of clean wind energy",
      price: 150,
      co2_offset: "40kg CO₂",
      image: "💨",
      category: "Clean Energy"
    },
    {
      id: 6,
      name: "Reusable Shopping Bags Set",
      description: "Set of 5 organic cotton shopping bags",
      price: 30,
      co2_saved: "2kg CO₂ annually",
      image: "👜",
      category: "Sustainable Products"
    }
  ],
  achievements: [
    {name: "Eco Newbie", description: "Complete your first eco action", icon: "🌱", threshold: 1},
    {name: "Green Commuter", description: "Use sustainable transport 10 times", icon: "🚲", threshold: 10},
    {name: "Energy Saver", description: "Save 50kg CO₂ from energy actions", icon: "⚡", threshold: 50},
    {name: "Food Hero", description: "Choose plant-based meals 20 times", icon: "🥗", threshold: 20},
    {name: "Eco Champion", description: "Earn 1000 eco tokens", icon: "🏆", threshold: 1000},
    {name: "Climate Warrior", description: "Offset 1 ton of CO₂", icon: "⚔️", threshold: 1000}
  ]
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    console.log('EcoSphere initializing...');
    initializeApp();
});

function initializeApp() {
    // Initialize user data
    initializeUserData();
    
    // Setup navigation
    initializeNavigation();
    
    // Setup location detection
    initializeLocation();
    
    // Setup activity tracker
    initializeTracker();
    
    // Setup marketplace
    initializeMarketplace();
    
    // Setup dashboard
    initializeDashboard();
    
    // Setup community
    initializeCommunity();
    
    // Setup contact form
    initializeContactForm();
    
    // Setup modal
    initializeModal();
    
    // Start live updates
    startLiveUpdates();
    
    // Show home page
    showPage('home');
    
    console.log('EcoSphere ready!');
}

// User data management
function initializeUserData() {
    const defaultData = {
        tokens: 150,
        totalCO2Saved: 0,
        totalActivities: 0,
        streak: 0,
        activities: [],
        purchases: [],
        achievements: [],
        dailyStats: {},
        joinDate: new Date().toISOString()
    };
    
    if (!localStorage.getItem('ecosphere_user')) {
        localStorage.setItem('ecosphere_user', JSON.stringify(defaultData));
    }
    
    updateTokenDisplay();
}

function getUserData() {
    return JSON.parse(localStorage.getItem('ecosphere_user') || '{}');
}

function saveUserData(data) {
    localStorage.setItem('ecosphere_user', JSON.stringify(data));
    updateTokenDisplay();
}

function updateTokenDisplay() {
    const userData = getUserData();
    const tokenElements = document.querySelectorAll('#user-token-count, #marketplace-balance');
    tokenElements.forEach(el => {
        if (el.id === 'marketplace-balance') {
            el.textContent = `${userData.tokens} EcoTokens`;
        } else {
            el.textContent = userData.tokens;
        }
    });
}

// Navigation system
function initializeNavigation() {
    const navElements = document.querySelectorAll('[data-page]');
    
    navElements.forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = element.getAttribute('data-page');
            showPage(pageId);
        });
    });
    
    // Logo clicks
    const logos = document.querySelectorAll('.nav-brand, .footer-logo');
    logos.forEach(logo => {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            showPage('home');
        });
    });
    
    // Mobile menu
    const navToggle = document.getElementById('nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
}

function showPage(pageId) {
    console.log(`Showing page: ${pageId}`);
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('page--active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('page--active');
        currentPage = pageId;
        
        // Update navigation
        updateActiveNavigation(pageId);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Handle page-specific actions
        handlePageSpecificActions(pageId);
    }
    
    closeMobileMenu();
}

function updateActiveNavigation(pageId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

function handlePageSpecificActions(pageId) {
    switch(pageId) {
        case 'home':
            animateStats();
            break;
        case 'tracker':
            loadTrackerData();
            break;
        case 'marketplace':
            loadMarketplace();
            break;
        case 'dashboard':
            loadDashboard();
            break;
        case 'community':
            loadCommunity();
            break;
    }
}

function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if (navMenu && navToggle) {
        navMenu.classList.toggle('nav-menu--active');
        
        const icon = navToggle.querySelector('i');
        if (icon) {
            icon.className = navMenu.classList.contains('nav-menu--active') 
                ? 'fas fa-times' 
                : 'fas fa-bars';
        }
    }
}

function closeMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if (navMenu && navMenu.classList.contains('nav-menu--active')) {
        navMenu.classList.remove('nav-menu--active');
        
        const icon = navToggle?.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-bars';
        }
    }
}

// Location detection
function initializeLocation() {
    const locationStatus = document.getElementById('location-status');
    
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                updateLocationDisplay('Mumbai, India (Location detected)');
            },
            function(error) {
                console.log('Location error:', error);
                updateLocationDisplay('Location not available');
            }
        );
    } else {
        updateLocationDisplay('Geolocation not supported');
    }
}

function updateLocationDisplay(location) {
    const locationStatus = document.getElementById('location-status');
    if (locationStatus) {
        locationStatus.innerHTML = `
            <i class="fas fa-map-marker-alt"></i>
            <span>${location}</span>
        `;
    }
}

// Activity Tracker
function initializeTracker() {
    const categorySelect = document.getElementById('activity-category');
    const typeSelect = document.getElementById('activity-type');
    const distanceGroup = document.getElementById('distance-group');
    const logButton = document.getElementById('log-activity');
    const clearButton = document.getElementById('clear-activities');
    
    if (categorySelect) {
        categorySelect.addEventListener('change', function() {
            updateActivityTypes(this.value);
        });
    }
    
    if (typeSelect) {
        typeSelect.addEventListener('change', function() {
            updateDistanceField();
        });
    }
    
    if (logButton) {
        logButton.addEventListener('click', logActivity);
    }
    
    if (clearButton) {
        clearButton.addEventListener('click', clearAllActivities);
    }
}

function updateActivityTypes(category) {
    const typeSelect = document.getElementById('activity-type');
    const logButton = document.getElementById('log-activity');
    
    if (!typeSelect) return;
    
    // Clear existing options
    typeSelect.innerHTML = '<option value="">Select activity</option>';
    
    if (category) {
        const categoryData = platformData.activities.find(cat => cat.category === category);
        if (categoryData) {
            categoryData.options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = JSON.stringify(option);
                optionElement.textContent = option.name;
                typeSelect.appendChild(optionElement);
            });
        }
        typeSelect.disabled = false;
    } else {
        typeSelect.disabled = true;
    }
    
    if (logButton) {
        logButton.disabled = true;
    }
    updateDistanceField();
}

function updateDistanceField() {
    const typeSelect = document.getElementById('activity-type');
    const distanceGroup = document.getElementById('distance-group');
    const logButton = document.getElementById('log-activity');
    
    if (!typeSelect || !distanceGroup || !logButton) return;
    
    const selectedValue = typeSelect.value;
    
    if (selectedValue) {
        try {
            const activityData = JSON.parse(selectedValue);
            
            // Show distance field only for transport activities with co2_per_km
            if (activityData.hasOwnProperty('co2_per_km')) {
                distanceGroup.style.display = 'block';
            } else {
                distanceGroup.style.display = 'none';
            }
            
            // Enable log button when activity is selected
            logButton.disabled = false;
            
        } catch (error) {
            console.error('Error parsing activity data:', error);
            distanceGroup.style.display = 'none';
            logButton.disabled = true;
        }
    } else {
        distanceGroup.style.display = 'none';
        logButton.disabled = true;
    }
}

function logActivity() {
    const categorySelect = document.getElementById('activity-category');
    const typeSelect = document.getElementById('activity-type');
    const distanceInput = document.getElementById('activity-distance');
    
    if (!categorySelect.value || !typeSelect.value) {
        showModal('Error', 'Please select both category and activity type.');
        return;
    }
    
    try {
        const category = categorySelect.value;
        const activityData = JSON.parse(typeSelect.value);
        const distance = parseFloat(distanceInput?.value) || 1;
        
        // Calculate impact
        let co2Impact = 0;
        let tokens = activityData.tokens;
        
        if (activityData.hasOwnProperty('co2_per_km')) {
            // Transport activity
            co2Impact = activityData.co2_per_km * distance;
            tokens = Math.max(0, Math.floor(tokens * distance));
        } else if (activityData.hasOwnProperty('co2_saved')) {
            // Other activities (Energy, Food, Shopping)
            co2Impact = -activityData.co2_saved; // Negative means saved
        }
        
        // Create activity record
        const activity = {
            id: Date.now(),
            category,
            name: activityData.name,
            co2Impact,
            tokens,
            distance: activityData.hasOwnProperty('co2_per_km') ? distance : null,
            timestamp: new Date().toISOString(),
            location: userLocation ? 'Current Location' : 'Unknown'
        };
        
        // Save to user data
        const userData = getUserData();
        userData.activities.unshift(activity);
        userData.tokens += tokens;
        userData.totalCO2Saved += Math.abs(co2Impact);
        userData.totalActivities += 1;
        
        // Update daily stats
        const today = new Date().toDateString();
        if (!userData.dailyStats[today]) {
            userData.dailyStats[today] = { co2: 0, tokens: 0, activities: 0 };
        }
        userData.dailyStats[today].co2 += Math.abs(co2Impact);
        userData.dailyStats[today].tokens += tokens;
        userData.dailyStats[today].activities += 1;
        
        saveUserData(userData);
        
        // Show reward animation
        showTokenReward(tokens);
        
        // Update displays
        updateTodaysImpact();
        updateRecentActivities();
        updateProgressChart();
        
        // Reset form
        categorySelect.value = '';
        typeSelect.innerHTML = '<option value="">Select activity</option>';
        typeSelect.disabled = true;
        if (distanceInput) distanceInput.value = '';
        document.getElementById('distance-group').style.display = 'none';
        document.getElementById('log-activity').disabled = true;
        
        // Check achievements
        checkAchievements();
        
        console.log('Activity logged:', activity);
        
        // Show success message
        showModal('Activity Logged!', `Great job! You've earned ${tokens} EcoTokens and saved ${Math.abs(co2Impact).toFixed(1)} kg CO₂.`);
        
    } catch (error) {
        console.error('Error logging activity:', error);
        showModal('Error', 'There was an error logging your activity. Please try again.');
    }
}

function showTokenReward(tokens) {
    const rewardElement = document.getElementById('token-reward');
    const amountElement = rewardElement.querySelector('.token-amount');
    
    if (rewardElement && amountElement) {
        amountElement.textContent = `+${tokens}`;
        rewardElement.classList.remove('hidden');
        
        setTimeout(() => {
            rewardElement.classList.add('hidden');
        }, 2000);
    }
}

function updateTodaysImpact() {
    const userData = getUserData();
    const today = new Date().toDateString();
    const todayStats = userData.dailyStats[today] || { co2: 0, tokens: 0, activities: 0 };
    
    const co2Element = document.getElementById('today-co2');
    const tokensElement = document.getElementById('today-tokens');
    const actionsElement = document.getElementById('today-actions');
    
    if (co2Element) co2Element.textContent = `${todayStats.co2.toFixed(1)} kg`;
    if (tokensElement) tokensElement.textContent = todayStats.tokens;
    if (actionsElement) actionsElement.textContent = todayStats.activities;
}

function updateRecentActivities() {
    const userData = getUserData();
    const activitiesList = document.getElementById('activities-list');
    
    if (!activitiesList) return;
    
    if (userData.activities.length === 0) {
        activitiesList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-seedling"></i>
                <p>No activities logged yet. Start tracking to see your impact!</p>
            </div>
        `;
        return;
    }
    
    const recentActivities = userData.activities.slice(0, 10);
    activitiesList.innerHTML = recentActivities.map(activity => `
        <div class="activity-item">
            <div class="activity-info">
                <div class="activity-icon">
                    <i class="fas ${getActivityIcon(activity.category)}"></i>
                </div>
                <div class="activity-details">
                    <h4>${activity.name}</h4>
                    <p>${activity.category} • ${new Date(activity.timestamp).toLocaleTimeString()}</p>
                </div>
            </div>
            <div class="activity-rewards">
                <div class="activity-tokens">+${activity.tokens} tokens</div>
                <div class="activity-co2">${Math.abs(activity.co2Impact).toFixed(1)} kg CO₂</div>
            </div>
        </div>
    `).join('');
}

function getActivityIcon(category) {
    const icons = {
        'Transport': 'fa-car',
        'Energy': 'fa-bolt',
        'Food': 'fa-utensils',
        'Shopping': 'fa-shopping-cart'
    };
    return icons[category] || 'fa-leaf';
}

function clearAllActivities() {
    if (confirm('Are you sure you want to clear all activities? This cannot be undone.')) {
        const userData = getUserData();
        userData.activities = [];
        userData.dailyStats = {};
        saveUserData(userData);
        
        updateTodaysImpact();
        updateRecentActivities();
        updateProgressChart();
        
        showModal('Activities Cleared', 'All activities have been cleared successfully.');
    }
}

function loadTrackerData() {
    updateTodaysImpact();
    updateRecentActivities();
    
    // Delay chart loading to ensure DOM is ready
    setTimeout(() => {
        updateProgressChart();
    }, 500);
}

// Progress Chart
function updateProgressChart() {
    const ctx = document.getElementById('progressChart');
    if (!ctx) return;
    
    const userData = getUserData();
    
    // Get last 7 days of data
    const labels = [];
    const co2Data = [];
    const tokenData = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateString = date.toDateString();
        const dayName = date.toLocaleDateString('en', { weekday: 'short' });
        
        labels.push(dayName);
        
        const dayStats = userData.dailyStats[dateString] || { co2: 0, tokens: 0 };
        co2Data.push(dayStats.co2);
        tokenData.push(dayStats.tokens);
    }
    
    if (progressChart) {
        progressChart.destroy();
        progressChart = null;
    }
    
    try {
        progressChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'CO₂ Saved (kg)',
                        data: co2Data,
                        borderColor: '#1FB8CD',
                        backgroundColor: 'rgba(31, 184, 205, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'EcoTokens Earned',
                        data: tokenData,
                        borderColor: '#FFC185',
                        backgroundColor: 'rgba(255, 193, 133, 0.1)',
                        fill: true,
                        tension: 0.4,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'CO₂ (kg)'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'EcoTokens'
                        },
                        grid: {
                            drawOnChartArea: false,
                        },
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error creating progress chart:', error);
    }
}

// Marketplace
function initializeMarketplace() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            filterProducts(category);
        });
    });
}

function loadMarketplace() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    const userData = getUserData();
    
    productsGrid.innerHTML = platformData.products.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">${product.image}</div>
            <div class="product-content">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-impact">
                    ${product.co2_offset || product.co2_saved || product.impact}
                </div>
                <div class="product-footer">
                    <div class="product-price">
                        <i class="fas fa-coins"></i>
                        ${product.price}
                    </div>
                    <button class="buy-btn" onclick="purchaseProduct(${product.id})" 
                            ${userData.tokens < product.price ? 'disabled' : ''}>
                        ${userData.tokens < product.price ? 'Insufficient Tokens' : 'Purchase'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterProducts(category) {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function purchaseProduct(productId) {
    const product = platformData.products.find(p => p.id === productId);
    const userData = getUserData();
    
    if (!product || userData.tokens < product.price) {
        showModal('Purchase Failed', 'Insufficient EcoTokens for this purchase.');
        return;
    }
    
    // Deduct tokens
    userData.tokens -= product.price;
    
    // Add to purchases
    const purchase = {
        id: Date.now(),
        productId: product.id,
        name: product.name,
        price: product.price,
        timestamp: new Date().toISOString()
    };
    
    if (!userData.purchases) userData.purchases = [];
    userData.purchases.unshift(purchase);
    
    saveUserData(userData);
    
    // Show success
    showModal('Purchase Successful!', `You have successfully purchased ${product.name}. Your contribution is making a real environmental impact!`);
    
    // Reload marketplace to update button states
    loadMarketplace();
    
    console.log('Product purchased:', product);
}

// Dashboard
function initializeDashboard() {
    // Dashboard is loaded when page is shown
}

function loadDashboard() {
    updateOverviewStats();
    updateAchievements();
    
    // Delay chart loading to ensure DOM is ready
    setTimeout(() => {
        updateImpactChart();
    }, 500);
}

function updateOverviewStats() {
    const userData = getUserData();
    
    const totalCO2Element = document.getElementById('total-co2');
    const totalTokensElement = document.getElementById('total-tokens');
    const totalActivitiesElement = document.getElementById('total-activities');
    const streakElement = document.getElementById('streak-days');
    
    if (totalCO2Element) totalCO2Element.textContent = `${userData.totalCO2Saved.toFixed(1)} kg`;
    if (totalTokensElement) totalTokensElement.textContent = userData.tokens;
    if (totalActivitiesElement) totalActivitiesElement.textContent = userData.totalActivities;
    if (streakElement) streakElement.textContent = calculateStreak();
}

function calculateStreak() {
    const userData = getUserData();
    const today = new Date();
    let streak = 0;
    
    for (let i = 0; i < 30; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateString = date.toDateString();
        
        if (userData.dailyStats[dateString] && userData.dailyStats[dateString].activities > 0) {
            streak++;
        } else if (i > 0) {
            break;
        }
    }
    
    return streak;
}

function updateAchievements() {
    const achievementsGrid = document.getElementById('achievements-grid');
    if (!achievementsGrid) return;
    
    const userData = getUserData();
    
    achievementsGrid.innerHTML = platformData.achievements.map(achievement => {
        const isUnlocked = checkAchievementUnlocked(achievement, userData);
        
        return `
            <div class="achievement-item ${isUnlocked ? 'unlocked' : 'locked'}">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-desc">${achievement.description}</div>
            </div>
        `;
    }).join('');
}

function checkAchievementUnlocked(achievement, userData) {
    switch (achievement.name) {
        case 'Eco Newbie':
            return userData.totalActivities >= 1;
        case 'Green Commuter':
            return userData.activities.filter(a => a.category === 'Transport' && a.tokens > 0).length >= 10;
        case 'Energy Saver':
            return userData.activities.filter(a => a.category === 'Energy').reduce((sum, a) => sum + Math.abs(a.co2Impact), 0) >= 50;
        case 'Food Hero':
            return userData.activities.filter(a => a.category === 'Food').length >= 20;
        case 'Eco Champion':
            return userData.tokens >= 1000;
        case 'Climate Warrior':
            return userData.totalCO2Saved >= 1000;
        default:
            return false;
    }
}

function checkAchievements() {
    const userData = getUserData();
    const newAchievements = [];
    
    platformData.achievements.forEach(achievement => {
        if (checkAchievementUnlocked(achievement, userData) && 
            !userData.achievements.includes(achievement.name)) {
            newAchievements.push(achievement);
            userData.achievements.push(achievement.name);
        }
    });
    
    if (newAchievements.length > 0) {
        saveUserData(userData);
        
        newAchievements.forEach(achievement => {
            setTimeout(() => {
                showModal('Achievement Unlocked!', `🎉 Congratulations! You've earned the "${achievement.name}" achievement: ${achievement.description}`);
            }, 500);
        });
    }
}

function updateImpactChart() {
    const ctx = document.getElementById('impactChart');
    if (!ctx) return;
    
    const userData = getUserData();
    
    // Calculate impact by category
    const categories = ['Transport', 'Energy', 'Food', 'Shopping'];
    const data = categories.map(category => {
        return userData.activities
            .filter(activity => activity.category === category)
            .reduce((sum, activity) => sum + Math.abs(activity.co2Impact), 0);
    });
    
    // Only show chart if there's data
    if (data.every(value => value === 0)) {
        const chartContainer = ctx.parentElement;
        if (chartContainer) {
            chartContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-chart-pie"></i>
                    <p>No activity data yet. Start logging activities to see your impact breakdown!</p>
                </div>
            `;
        }
        return;
    }
    
    if (impactChart) {
        impactChart.destroy();
        impactChart = null;
    }
    
    try {
        impactChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: categories,
                datasets: [{
                    data: data,
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5'],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error creating impact chart:', error);
    }
}

// Community
function initializeCommunity() {
    // Community loads when page is shown
}

function loadCommunity() {
    loadCommunityFeed();
    loadChallenges();
    loadLeaderboard();
}

function loadCommunityFeed() {
    const feedList = document.getElementById('community-feed');
    if (!feedList) return;
    
    // Generate realistic community feed
    const feedItems = [
        { user: 'Alex K.', action: 'planted 5 trees', time: '2 minutes ago', icon: 'fa-tree' },
        { user: 'Sarah M.', action: 'completed a bike commute challenge', time: '5 minutes ago', icon: 'fa-bicycle' },
        { user: 'David L.', action: 'chose plant-based meals for a week', time: '12 minutes ago', icon: 'fa-leaf' },
        { user: 'Maya P.', action: 'purchased solar energy credits', time: '18 minutes ago', icon: 'fa-sun' },
        { user: 'John R.', action: 'saved 15kg CO₂ through energy actions', time: '25 minutes ago', icon: 'fa-bolt' },
        { user: 'Lisa T.', action: 'joined the Ocean Cleanup initiative', time: '32 minutes ago', icon: 'fa-water' },
        { user: 'Carlos S.', action: 'earned 500 EcoTokens this week', time: '45 minutes ago', icon: 'fa-coins' },
        { user: 'Emma W.', action: 'completed Zero Waste Challenge', time: '1 hour ago', icon: 'fa-recycle' }
    ];
    
    feedList.innerHTML = feedItems.map(item => `
        <div class="feed-item">
            <div class="feed-content">
                <div class="feed-icon">
                    <i class="fas ${item.icon}"></i>
                </div>
                <div class="feed-text">
                    <div class="feed-user">${item.user}</div>
                    <div class="feed-action">${item.action}</div>
                    <div class="feed-time">${item.time}</div>
                </div>
            </div>
        </div>
    `).join('');
}

function loadChallenges() {
    const challengesGrid = document.getElementById('challenges-grid');
    if (!challengesGrid) return;
    
    const challenges = [
        {
            title: 'Green Commute Week',
            description: 'Use sustainable transport for 7 days',
            progress: 65,
            participants: '2,847',
            icon: 'fa-bicycle'
        },
        {
            title: 'Zero Waste Challenge',
            description: 'Minimize waste production for 30 days',
            progress: 40,
            participants: '1,925',
            icon: 'fa-recycle'
        },
        {
            title: 'Plant Power Month',
            description: 'Choose plant-based meals daily',
            progress: 78,
            participants: '3,421',
            icon: 'fa-seedling'
        }
    ];
    
    challengesGrid.innerHTML = challenges.map(challenge => `
        <div class="challenge-card">
            <div class="challenge-icon">
                <i class="fas ${challenge.icon}"></i>
            </div>
            <h3 class="challenge-title">${challenge.title}</h3>
            <p class="challenge-desc">${challenge.description}</p>
            <div class="challenge-progress">
                <div class="challenge-progress-bar" style="width: ${challenge.progress}%"></div>
            </div>
            <div class="challenge-stats">${challenge.participants} participants</div>
        </div>
    `).join('');
}

function loadLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard-list');
    if (!leaderboardList) return;
    
    const leaders = [
        { rank: 1, name: 'EcoWarrior2024', location: 'San Francisco, USA', score: '2,847' },
        { rank: 2, name: 'GreenPlanet', location: 'Copenhagen, Denmark', score: '2,634' },
        { rank: 3, name: 'ClimateHero', location: 'Tokyo, Japan', score: '2,521' },
        { rank: 4, name: 'SustainableLife', location: 'Berlin, Germany', score: '2,384' },
        { rank: 5, name: 'EcoChampion', location: 'Vancouver, Canada', score: '2,297' },
        { rank: 6, name: 'GreenFuture', location: 'Mumbai, India', score: '2,156' },
        { rank: 7, name: 'PlanetSaver', location: 'Sydney, Australia', score: '2,043' },
        { rank: 8, name: 'EcoMinded', location: 'Stockholm, Sweden', score: '1,987' }
    ];
    
    leaderboardList.innerHTML = leaders.map(leader => `
        <div class="leaderboard-item">
            <div class="leaderboard-rank ${leader.rank <= 3 ? 'top-3' : ''}">
                ${leader.rank}
            </div>
            <div class="leaderboard-info">
                <div class="leaderboard-name">${leader.name}</div>
                <div class="leaderboard-location">${leader.location}</div>
            </div>
            <div class="leaderboard-score">${leader.score} pts</div>
        </div>
    `).join('');
}

// Live Updates
function startLiveUpdates() {
    // Update global stats every 30 seconds
    setInterval(updateLiveStats, 30000);
    
    // Update community feed every 2 minutes
    setInterval(() => {
        if (currentPage === 'community') {
            loadCommunityFeed();
        }
    }, 120000);
    
    // Initial load
    updateLiveStats();
}

function updateLiveStats() {
    const stats = {
        users: document.getElementById('live-users'),
        co2: document.getElementById('live-co2'),
        trees: document.getElementById('live-trees'),
        tokens: document.getElementById('live-tokens')
    };
    
    // Simulate real-time increases
    Object.values(stats).forEach(element => {
        if (element) {
            const current = parseInt(element.textContent.replace(/,/g, ''));
            const increase = Math.floor(Math.random() * 10) + 1;
            const newValue = current + increase;
            element.textContent = newValue.toLocaleString();
        }
    });
}

function animateStats() {
    const statNumbers = document.querySelectorAll('#live-stats .stat-number');
    
    statNumbers.forEach((stat, index) => {
        setTimeout(() => {
            stat.style.animation = 'countUp 0.8s ease-out';
        }, index * 200);
    });
}

// Contact Form
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', handleContactForm);
}

async function handleContactForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Save to localStorage
        const contacts = JSON.parse(localStorage.getItem('ecosphere_contacts') || '[]');
        contacts.push({
            ...data,
            timestamp: new Date().toISOString(),
            id: Date.now()
        });
        localStorage.setItem('ecosphere_contacts', JSON.stringify(contacts));
        
        showModal('Message Sent!', 'Thank you for reaching out. We\'ll get back to you within 24 hours.');
        form.reset();
        
    } catch (error) {
        showModal('Error', 'There was an error sending your message. Please try again.');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Modal System
function initializeModal() {
    const modal = document.getElementById('success-modal');
    if (!modal) return;
    
    const closeElements = modal.querySelectorAll('.modal-close, #modal-ok, .modal-overlay');
    closeElements.forEach(element => {
        element.addEventListener('click', hideModal);
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            hideModal();
        }
    });
}

function showModal(title, message) {
    const modal = document.getElementById('success-modal');
    const titleElement = modal.querySelector('.modal-header h3');
    const messageElement = modal.querySelector('#modal-message');
    
    if (titleElement) titleElement.textContent = title;
    if (messageElement) messageElement.textContent = message;
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function hideModal() {
    const modal = document.getElementById('success-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

// Utility Functions
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
}

// Export functions for global access
window.purchaseProduct = purchaseProduct;
window.showPage = showPage;

console.log('EcoSphere app.js loaded successfully!');