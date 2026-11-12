// navbar.js - شريط التنقل الموحد لمدير النظام مع إعدادات الأوسمة والصلاحيات
document.addEventListener("DOMContentLoaded", function() {
    const navContainer = document.getElementById('admin-nav-container');
    if (!navContainer) return;

    const currentPage = window.location.pathname.split("/").pop();

    // 1. تحديد دور المستخدم (مدير أو مشرف)
    let userRole = "admin"; // القيم: "admin" (مدير) أو "supervisor" (مشرف)
    try {
        const storedUser = JSON.parse(localStorage.getItem('current_admin') || localStorage.getItem('user_role') || '{}');
        if (storedUser.role) {
            userRole = storedUser.role;
        } else if (localStorage.getItem('is_supervisor') === 'true') {
            userRole = "supervisor";
        }
    } catch (e) {}

    // 2. تعريف الأقسام والصلاحيات المتاحة لكل قسم
    const navItems = [
        { href: "students_grades.html", title: "درجات الطلاب", icon: "📊", allowedFor: ["admin", "supervisor"] },
        { href: "teachers_mgmt.html", title: "إدارة المعلمين", icon: "👨‍🏫", allowedFor: ["admin", "supervisor"] },
        { href: "games_settings.html", title: "إعدادات الألعاب", icon: "🎮", allowedFor: ["admin", "supervisor"] },
        { href: "badges_settings.html", title: "إعدادات الأوسمة", icon: "🏅", allowedFor: ["admin", "supervisor"] }, // أضيفت هنا
        { href: "reports.html", title: "التقارير الشاملة", icon: "📈", allowedFor: ["admin", "supervisor"] },
        { href: "reset_data.html", title: "تصفير النتائج", icon: "⚙️", allowedFor: ["admin"] }, // مدير النظام فقط
        { href: "profile.html", title: "بياناتي الشخصية", icon: "👤", allowedFor: ["admin"] }      // مدير النظام فقط
    ];

    // 3. تصفية الأقسام بناءً على الصلاحية
    const filteredItems = navItems.filter(item => item.allowedFor.includes(userRole));

    // 4. بناء هيكل HTML للشريط العلوي
    let navHTML = `<div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; justify-content: center; background: #fff; padding: 10px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">`;
    
    filteredItems.forEach(item => {
        let isActive = currentPage === item.href ? 'background: var(--primary, #d81b60); color: white;' : 'background: #fff; color: var(--primary, #d81b60);';
        navHTML += `
            <a href="${item.href}" style="display: flex; align-items: center; gap: 5px; padding: 8px 14px; border: 2px solid var(--primary, #d81b60); border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 13px; font-family: 'Cairo', sans-serif; transition: 0.2s; ${isActive}">
                <span>${item.icon}</span> ${item.title}
            </a>
        `;
    });
    navHTML += `</div>`;

    navContainer.innerHTML = navHTML;
});
