// admin-script.js

class AdminSystem {
    constructor() {
        this.currentUser = null;
        this.news = [];
        this.gallery = [];
        this.users = [
            { id: 1, username: 'superadmin', password: 'super123', role: 'superadmin', name: 'Super Administrator', status: 'active' },
            { id: 2, username: 'admin', password: 'admin123', role: 'admin', name: 'Administrator', status: 'active' },
            { id: 3, username: 'editor', password: 'editor123', role: 'admin', name: 'Content Editor', status: 'active' }
        ];
        
        this.init();
        this.loadSampleData();
    }

    init() {
        this.bindEvents();
        this.loadFromStorage();
        this.checkAutoLogin();
    }

    bindEvents() {
        // Login form
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Password toggle
        document.getElementById('togglePassword').addEventListener('click', () => {
            this.togglePassword();
        });

        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.currentTarget.getAttribute('data-section');
                this.showSection(section);
            });
        });

        // Logout
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.logout();
        });

        // Sidebar toggle
        document.getElementById('sidebarToggle').addEventListener('click', () => {
            this.toggleSidebar();
        });

        // Modal controls
        this.bindModalEvents();
        
        // Form submissions
        this.bindFormEvents();
    }

    bindModalEvents() {
        // Add News Modal
        document.getElementById('addNewsBtn').addEventListener('click', () => {
            this.showModal('addNewsModal');
        });

        // Add Gallery Modal
        document.getElementById('addGalleryBtn').addEventListener('click', () => {
            this.showModal('addGalleryModal');
        });

        // Close modal events
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                this.hideModal(modal.id);
                e.preventDefault();
            });
        });

        // Click outside to close modal
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideModal(modal.id);
                    e.preventDefault();
                }
            });
        });
    }

    bindFormEvents() {
        // Add News Form
        document.getElementById('addNewsForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addNews();
        });

        // Add Gallery Form
        document.getElementById('addGalleryForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addGallery();
        });
    }

    handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const role = document.querySelector('input[name="role"]:checked').value;
        const remember = document.getElementById('remember').checked;

        // Find user
        const user = this.users.find(u => 
            u.username === username && 
            u.password === password && 
            u.role === role
        );

        if (user) {
            this.currentUser = user;
            
            if (remember) {
                localStorage.setItem('bapenda_user', JSON.stringify(user));
            }

            this.showDashboard();
            this.showNotification('Login berhasil!', 'success');
        } else {
            this.showNotification('Username, password, atau role tidak sesuai!', 'error');
        }
    }

    checkAutoLogin() {
        const savedUser = localStorage.getItem('bapenda_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.showDashboard();
        }
    }

    showDashboard() {
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('adminDashboard').classList.remove('hidden');
        
        // Set user info
        document.getElementById('adminName').textContent = this.currentUser.name;
        document.getElementById('adminRole').textContent = 
            this.currentUser.role === 'superadmin' ? 'Super Admin' : 'Admin';

        // Show/hide menus based on role
        if (this.currentUser.role === 'superadmin') {
            document.getElementById('superAdminOnly').style.display = 'block';
            document.getElementById('settingsMenu').style.display = 'block';
            this.loadUsers();
        }

        this.updateStats();
        this.loadNews();
        this.loadGallery();
        this.logActivity('Login ke sistem');
    }

    logout() {
        localStorage.removeItem('bapenda_user');
        this.currentUser = null;
        document.getElementById('loginScreen').classList.remove('hidden');
        document.getElementById('adminDashboard').classList.add('hidden');
        
        // Reset form
        document.getElementById('loginForm').reset();
        
        this.showNotification('Logout berhasil!', 'success');
    }

    togglePassword() {
        const passwordField = document.getElementById('password');
        const toggleBtn = document.getElementById('togglePassword');
        const icon = toggleBtn.querySelector('i');

        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            icon.className = 'fas fa-eye-slash';
        } else {
            passwordField.type = 'password';
            icon.className = 'fas fa-eye';
        }
    }

    showSection(sectionName) {
        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');

        // Update content
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${sectionName}Section`).classList.add('active');

        // Update page title
        const titles = {
            dashboard: 'Dashboard',
            news: 'Kelola Berita',
            gallery: 'Kelola Galeri',
            users: 'Kelola User',
            settings: 'Pengaturan'
        };
        document.getElementById('pageTitle').textContent = titles[sectionName];

        // Load section specific data
        if (sectionName === 'news') {
            this.loadNews();
        } else if (sectionName === 'gallery') {
            this.loadGallery();
        } else if (sectionName === 'users') {
            this.loadUsers();
        }
    }

    toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('active');
    }

    showModal(modalId) {
        document.getElementById(modalId).classList.add('active');
    }

    hideModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
        
        // Reset forms
        const form = document.querySelector(`#${modalId} form`);
        if (form) form.reset();
    }

    addNews() {
        const title = document.getElementById('newsTitle').value;
        const category = document.getElementById('newsCategory').value;
        const image = document.getElementById('newsImage').value;
        const content = document.getElementById('newsContent').value;

        const news = {
            id: Date.now(),
            title,
            category,
            image: image || 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&w=600',
            content,
            author: this.currentUser.name,
            date: new Date().toLocaleDateString('id-ID'),
            excerpt: content.substring(0, 150) + '...'
        };

        this.news.unshift(news);
        this.saveToStorage();
        this.loadNews();
        this.updateStats();
        this.hideModal('addNewsModal');
        this.logActivity(`Menambah berita: ${title}`);
        this.showNotification('Berita berhasil ditambahkan!', 'success');
    }

    addGallery() {
        const title = document.getElementById('galleryTitle').value;
        const category = document.getElementById('galleryCategory').value;
        const image = document.getElementById('galleryImage').value;
        const description = document.getElementById('galleryDescription').value;

        const galleryItem = {
            id: Date.now(),
            title,
            category,
            image,
            description,
            date: new Date().toLocaleDateString('id-ID')
        };

        this.gallery.unshift(galleryItem);
        this.saveToStorage();
        this.loadGallery();
        this.updateStats();
        this.hideModal('addGalleryModal');
        this.logActivity(`Menambah gambar galeri: ${title}`);
        this.showNotification('Gambar berhasil ditambahkan ke galeri!', 'success');
    }

    loadNews() {
        const newsList = document.getElementById('newsList');
        
        if (this.news.length === 0) {
            newsList.innerHTML = '<p class="no-data">Belum ada berita. Klik "Tambah Berita" untuk memulai.</p>';
            return;
        }

        const newsHTML = this.news.map(news => `
            <div class="news-item">
                <img src="${news.image}" alt="${news.title}" class="news-image" 
                     onerror="this.src='https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixlib=rb-4.0.3&w=600'">
                <div class="news-content">
                    <h4 class="news-title">${news.title}</h4>
                    <div class="news-meta">
                        <span><i class="fas fa-calendar"></i> ${news.date}</span>
                        <span><i class="fas fa-user"></i> ${news.author}</span>
                        <span><i class="fas fa-tag"></i> ${news.category}</span>
                    </div>
                    <p class="news-excerpt">${news.excerpt}</p>
                </div>
                <div class="news-actions">
                    <button class="btn btn-sm btn-edit" onclick="adminSystem.editNews(${news.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-delete" onclick="adminSystem.deleteNews(${news.id})">
                        <i class="fas fa-trash"></i> Hapus
                    </button>
                </div>
            </div>
        `).join('');

        newsList.innerHTML = newsHTML;
    }

    loadGallery() {
        const galleryGrid = document.getElementById('galleryGrid');
        
        if (this.gallery.length === 0) {
            galleryGrid.innerHTML = '<p class="no-data">Belum ada gambar. Klik "Tambah Gambar" untuk memulai.</p>';
            return;
        }

        const galleryHTML = this.gallery.map(item => `
            <div class="gallery-item">
                <img src="${item.image}" alt="${item.title}" class="gallery-image"
                     onerror="this.src='https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&w=600'">
                <div class="gallery-content">
                    <h4 class="gallery-title">${item.title}</h4>
                    <span class="gallery-category">${item.category}</span>
                    <p class="gallery-description">${item.description}</p>
                    <div class="gallery-actions">
                        <button class="btn btn-sm btn-edit" onclick="adminSystem.editGallery(${item.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-sm btn-delete" onclick="adminSystem.deleteGallery(${item.id})">
                            <i class="fas fa-trash"></i> Hapus
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        galleryGrid.innerHTML = galleryHTML;
    }

    loadUsers() {
        if (this.currentUser.role !== 'superadmin') return;
        
        const usersList = document.getElementById('usersList');
        
        const usersHTML = this.users.map(user => `
            <div class="user-item">
                <div class="user-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="user-info">
                    <h4 class="user-name">${user.name}</h4>
                    <p class="user-role">${user.username} - ${user.role === 'superadmin' ? 'Super Admin' : 'Admin'}</p>
                </div>
                <span class="user-status ${user.status}">${user.status === 'active' ? 'Aktif' : 'Tidak Aktif'}</span>
                <div class="user-actions">
                    <button class="btn btn-sm btn-edit" onclick="adminSystem.editUser(${user.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    ${user.id !== this.currentUser.id ? `
                        <button class="btn btn-sm btn-delete" onclick="adminSystem.deleteUser(${user.id})">
                            <i class="fas fa-trash"></i> Hapus
                        </button>
                    ` : ''}
                </div>
            </div>
        `).join('');

        usersList.innerHTML = usersHTML;
    }

    updateStats() {
        document.getElementById('totalNews').textContent = this.news.length;
        document.getElementById('totalGallery').textContent = this.gallery.length;
        
        // Update recent news in dashboard
        const recentNews = document.getElementById('recentNews');
        if (this.news.length > 0) {
            const recentHTML = this.news.slice(0, 3).map(news => `
                <div class="activity-item">
                    <i class="fas fa-newspaper"></i>
                    <span>${news.title}</span>
                    <small>${news.date}</small>
                </div>
            `).join('');
            recentNews.innerHTML = recentHTML;
        } else {
            recentNews.innerHTML = '<p class="no-data">Belum ada berita</p>';
        }
    }

    deleteNews(id) {
        if (confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
            const newsIndex = this.news.findIndex(n => n.id === id);
            if (newsIndex !== -1) {
                const newsTitle = this.news[newsIndex].title;
                this.news.splice(newsIndex, 1);
                this.saveToStorage();
                this.loadNews();
                this.updateStats();
                this.logActivity(`Menghapus berita: ${newsTitle}`);
                this.showNotification('Berita berhasil dihapus!', 'success');
            }
        }
    }

    deleteGallery(id) {
        if (confirm('Apakah Anda yakin ingin menghapus gambar ini?')) {
            const itemIndex = this.gallery.findIndex(g => g.id === id);
            if (itemIndex !== -1) {
                const itemTitle = this.gallery[itemIndex].title;
                this.gallery.splice(itemIndex, 1);
                this.saveToStorage();
                this.loadGallery();
                this.updateStats();
                this.logActivity(`Menghapus gambar galeri: ${itemTitle}`);
                this.showNotification('Gambar berhasil dihapus!', 'success');
            }
        }
    }

    editNews(id) {
        // Placeholder for edit functionality
        this.showNotification('Fitur edit akan segera tersedia!', 'info');
    }

    editGallery(id) {
        // Placeholder for edit functionality
        this.showNotification('Fitur edit akan segera tersedia!', 'info');
    }

    editUser(id) {
        // Placeholder for edit functionality
        this.showNotification('Fitur edit user akan segera tersedia!', 'info');
    }

    deleteUser(id) {
        if (confirm('Apakah Anda yakin ingin menghapus user ini?')) {
            const userIndex = this.users.findIndex(u => u.id === id);
            if (userIndex !== -1) {
                const userName = this.users[userIndex].name;
                this.users.splice(userIndex, 1);
                this.loadUsers();
                this.logActivity(`Menghapus user: ${userName}`);
                this.showNotification('User berhasil dihapus!', 'success');
            }
        }
    }

    logActivity(message) {
        const activityLog = document.querySelector('.activity-log');
        const newActivity = document.createElement('div');
        newActivity.className = 'activity-item';
        newActivity.innerHTML = `
            <i class="fas fa-info-circle"></i>
            <span>${message}</span>
            <small>Baru saja</small>
        `;
        
        // Insert at the beginning
        activityLog.insertBefore(newActivity, activityLog.firstChild);
        
        // Keep only last 5 activities
        const activities = activityLog.querySelectorAll('.activity-item');
        if (activities.length > 5) {
            activities[activities.length - 1].remove();
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 
                           type === 'error' ? 'fa-exclamation-circle' : 
                           'fa-info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#22c55e' : 
                        type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
            z-index: 3000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            min-width: 300px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        // Close button style
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            margin-left: auto;
            padding: 0.25rem;
            border-radius: 0.375rem;
            opacity: 0.8;
        `;

        closeBtn.addEventListener('click', () => {
            this.removeNotification(notification);
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);
    }

    removeNotification(notification) {
        if (notification && notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }

    saveToStorage() {
        localStorage.setItem('bapenda_news', JSON.stringify(this.news));
        localStorage.setItem('bapenda_gallery', JSON.stringify(this.gallery));
    }

    loadFromStorage() {
        const savedNews = localStorage.getItem('bapenda_news');
        const savedGallery = localStorage.getItem('bapenda_gallery');

        if (savedNews) {
            this.news = JSON.parse(savedNews);
        }

        if (savedGallery) {
            this.gallery = JSON.parse(savedGallery);
        }
    }

    loadSampleData() {
        // Load sample data only if storage is empty
        if (this.news.length === 0) {
            this.news = [
                {
                    id: 1,
                    title: 'Transformasi Digital BAPENDA 2025',
                    category: 'utama',
                    image: 'https://images.unsplash.com/photo-1560472355-109703aa3edc?ixlib=rb-4.0.3&w=800',
                    content: 'Peluncuran sistem digital terintegrasi untuk meningkatkan efisiensi pelayanan pajak daerah dengan teknologi AI dan cloud computing.',
                    author: 'Admin BAPENDA',
                    date: '15 Desember 2024',
                    excerpt: 'Peluncuran sistem digital terintegrasi untuk meningkatkan efisiensi pelayanan pajak daerah dengan teknologi AI dan cloud computing.'
                },
                {
                    id: 2,
                    title: 'Aplikasi Mobile BAPENDA Terbaru',
                    category: 'teknologi',
                    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&w=600',
                    content: 'Nikmati kemudahan akses layanan pajak kapan saja dan di mana saja melalui aplikasi mobile yang telah diperbaharui.',
                    author: 'Tim IT',
                    date: '10 Desember 2024',
                    excerpt: 'Nikmati kemudahan akses layanan pajak kapan saja dan di mana saja melalui aplikasi mobile yang telah diperbaharui.'
                }
            ];
        }

        if (this.gallery.length === 0) {
            this.gallery = [
                {
                    id: 1,
                    title: 'Kegiatan Sosialisasi',
                    category: 'kegiatan',
                    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&w=800',
                    description: 'Sosialisasi peraturan pajak terbaru kepada masyarakat',
                    date: '20 Desember 2024'
                },
                {
                    id: 2,
                    title: 'Fasilitas Modern',
                    category: 'fasilitas',
                    image: 'https://images.unsplash.com/photo-1560472355-109703aa3edc?ixlib=rb-4.0.3&w=800',
                    description: 'Kantor pelayanan modern dengan teknologi terdepan',
                    date: '18 Desember 2024'
                },
                {
                    id: 3,
                    title: 'Launching Aplikasi',
                    category: 'event',
                    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&w=800',
                    description: 'Peluncuran aplikasi mobile BAPENDA terbaru',
                    date: '15 Desember 2024'
                }
            ];
        }
    }

    // Export data functions for integration with main website
    exportNews() {
        return this.news;
    }

    exportGallery() {
        return this.gallery;
    }

    // Import functions for website integration
    importNews(newsData) {
        this.news = newsData;
        this.saveToStorage();
        this.loadNews();
        this.updateStats();
    }

    importGallery(galleryData) {
        this.gallery = galleryData;
        this.saveToStorage();
        this.loadGallery();
        this.updateStats();
    }
}

// Initialize Admin System
let adminSystem;

document.addEventListener('DOMContentLoaded', function() {
    adminSystem = new AdminSystem();
    
    // Handle responsive menu
    handleResponsive();
    
    // Handle window resize
    window.addEventListener('resize', handleResponsive);
    
    // Add keyboard shortcuts
    addKeyboardShortcuts();
    
    // Add tooltips
    addTooltips();
    
    console.log('BAPENDA Admin System initialized successfully');
});

function handleResponsive() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    
    if (window.innerWidth <= 768) {
        sidebar.classList.remove('active');
        sidebarToggle.style.display = 'flex';
    } else {
        sidebar.classList.remove('active');
        sidebarToggle.style.display = 'none';
    }
}

function addKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // ESC to close modals
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                adminSystem.hideModal(activeModal.id);
            }
        }
        
        // Ctrl/Cmd + N for new news (if on news section)
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            const activeSection = document.querySelector('.content-section.active');
            if (activeSection && activeSection.id === 'newsSection') {
                e.preventDefault();
                adminSystem.showModal('addNewsModal');
            }
        }
        
        // Ctrl/Cmd + G for new gallery (if on gallery section)
        if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
            const activeSection = document.querySelector('.content-section.active');
            if (activeSection && activeSection.id === 'gallerySection') {
                e.preventDefault();
                adminSystem.showModal('addGalleryModal');
            }
        }
        
        // Ctrl/Cmd + L for logout
        if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
            e.preventDefault();
            if (confirm('Apakah Anda yakin ingin logout?')) {
                adminSystem.logout();
            }
        }
    });
}

function addTooltips() {
    // Add title attributes for better UX
    const elements = [
        { selector: '[data-section="dashboard"]', title: 'Lihat ringkasan sistem (Ctrl+1)' },
        { selector: '[data-section="news"]', title: 'Kelola berita dan artikel (Ctrl+2)' },
        { selector: '[data-section="gallery"]', title: 'Kelola gambar galeri (Ctrl+3)' },
        { selector: '[data-section="users"]', title: 'Kelola pengguna sistem (Ctrl+4)' },
        { selector: '[data-section="settings"]', title: 'Pengaturan sistem (Ctrl+5)' },
        { selector: '#logoutBtn', title: 'Keluar dari sistem (Ctrl+L)' },
        { selector: '#addNewsBtn', title: 'Tambah berita baru (Ctrl+N)' },
        { selector: '#addGalleryBtn', title: 'Tambah gambar baru (Ctrl+G)' }
    ];
    
    elements.forEach(({ selector, title }) => {
        const element = document.querySelector(selector);
        if (element) {
            element.setAttribute('title', title);
        }
    });
}

// Utility functions for website integration
window.BapendaAdmin = {
    getNews: () => adminSystem ? adminSystem.exportNews() : [],
    getGallery: () => adminSystem ? adminSystem.exportGallery() : [],
    addNews: (news) => adminSystem ? adminSystem.importNews(news) : null,
    addGallery: (gallery) => adminSystem ? adminSystem.importGallery(gallery) : null,
    isLoggedIn: () => adminSystem && adminSystem.currentUser !== null,
    getCurrentUser: () => adminSystem ? adminSystem.currentUser : null
};

// Error handling
window.addEventListener('error', function(e) {
    console.error('BAPENDA Admin Error:', e.error);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('BAPENDA Admin Promise Error:', e.reason);
});

// Auto-save functionality
setInterval(() => {
    if (adminSystem && adminSystem.currentUser) {
        adminSystem.saveToStorage();
    }
}, 30000); // Auto-save every 30 seconds