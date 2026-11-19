// navbar.js - شريط التنقل الموحد لمدير النظام والمشرفين والمعلمين
document.addEventListener("DOMContentLoaded", function() {
    const navContainer = document.getElementById('admin-nav-container');
    if (!navContainer) return;

    const currentPage = window.location.pathname.split("/").pop();

    // 1. تحديد دور المستخدم واستخراج بيانات الجلسة ('current_staff_user')
    let userRole = "admin"; // القيم الافتراضية
    try {
        const storedUser = JSON.parse(localStorage.getItem('current_staff_user') || '{}');
        if (storedUser.role) {
            const r = String(storedUser.role).trim().toLowerCase();
            if (r === 'admin' || r === 'مدير') userRole = "admin";
            else if (r === 'supervisor' || r === 'مشرف') userRole = "supervisor";
            else userRole = "teacher";
        }
    } catch (e) {}

    // 2. تعريف الأقسام والصلاحيات بأسماء الملفات الفعلية الصحيحة تماماً
    const navItems = [
        { href: "adm_students.html", title: "بيانات الطلاب", icon: "👥", allowedFor: ["admin", "supervisor"] },
        { href: "adm_teachers.html", title: "إدارة المعلمين", icon: "👨‍🏫", allowedFor: ["admin", "supervisor"] },
        { href: "adm_games.html", title: "إعدادات الألعاب", icon: "🎮", allowedFor: ["admin", "supervisor"] },
        { href: "adm_badges.html", title: "إعدادات الأوسمة", icon: "🏅", allowedFor: ["admin", "supervisor"] },
        { href: "adm_scores.html", title: "درجات الطلاب", icon: "📊", allowedFor: ["admin", "supervisor", "teacher"] },
        { href: "adm_reports.html", title: "التقارير", icon: "📈", allowedFor: ["admin", "supervisor", "teacher"] },
        { href: "adm_followup.html", title: "متابعة الطلاب", icon: "🎯", allowedFor: ["admin", "supervisor", "teacher"] },
        { href: "adm_reset.html", title: "تصفير النتائج", icon: "⚙️", allowedFor: ["admin"] },
        { href: "adm_profile.html", title: "بياناتي الشخصية", icon: "👤", allowedFor: ["admin", "supervisor", "teacher"] }
    ];

    // 3. تصفية الأقسام بناءً على الصلاحية
    const filteredItems = navItems.filter(item => item.allowedFor.includes(userRole));

    // 4. بناء هيكل HTML للشريط العلوي
    let navHTML = `<div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; justify-content: center; background: #fff; padding: 10px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">`;
    
    filteredItems.forEach(item => {
        let isActive = currentPage === item.href 
            ? 'background: var(--primary, #d81b60); color: white; border-color: var(--primary, #d81b60);' 
            : 'background: #fff; color: var(--primary, #d81b60);';
        
        navHTML += `
            <a href="${item.href}" style="display: flex; align-items: center; gap: 5px; padding: 8px 14px; border: 2px solid var(--primary, #d81b60); border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 13px; font-family: 'Cairo', sans-serif; transition: 0.2s; ${isActive}">
                <span>${item.icon}</span> ${item.title}
            </a>
        `;
    });
    navHTML += `</div>`;

    navContainer.innerHTML = navHTML;
});
