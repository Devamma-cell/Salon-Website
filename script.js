const services=[
 {name:"Haircut & Styling",desc:"A tailored cut, blow-dry, and finish designed around your style.",price:799,icon:"✂"},
 {name:"Hair Color",desc:"From subtle dimension to a bold new shade, made just for you.",price:2499,icon:"🎨"},
 {name:"Facial & Skin",desc:"A refreshing, feel-good facial for a healthy-looking glow.",price:1299,icon:"✦"},
 {name:"Manicure & Pedicure",desc:"A relaxing nail-care ritual with a polished finish.",price:999,icon:"♡"},
 {name:"Bridal & Occasion",desc:"Beautifully considered styling for your most special moments.",price:4999,icon:"❋"},
 {name:"Spa & Hair Treatment",desc:"Nourishing treatments to help your hair feel soft and renewed.",price:1599,icon:"☼"}
];
const stylists=[
 {name:"Aanya Sharma",role:"Senior Hair Stylist",bio:"Specialist in modern cuts and effortless styling.",img:"https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=700&q=80"},
 {name:"Meera Rao",role:"Color Specialist",bio:"Loves dimensional color and natural-looking highlights.",img:"https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=700&q=80"},
 {name:"Ishita Menon",role:"Skin & Beauty Expert",bio:"Focused on restorative facials and thoughtful self-care.",img:"https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=700&q=80"}
];
const reviews=[
 {name:"Ananya",rating:5,text:"Such a relaxing experience. My haircut came out exactly how I imagined."},
 {name:"Priya",rating:5,text:"Warm team, lovely space, and beautiful results. I'll definitely be back."},
 {name:"Rhea",rating:4,text:"Loved the consultation and the care they took with my hair color."}
];
const get=(k,f=[])=>JSON.parse(localStorage.getItem(k)||JSON.stringify(f));
const set=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
function toast(msg){document.getElementById("toastMessage").textContent=msg;bootstrap.Toast.getOrCreateInstance(document.getElementById("appToast")).show()}
function renderServices(){document.getElementById("serviceCards").innerHTML=services.map((s,i)=>`<div class="col-md-6 col-lg-4"><div class="service-card"><div class="service-icon">${s.icon}</div><h3>${s.name}</h3><p>${s.desc}</p><div class="card-bottom"><span>From ₹${s.price.toLocaleString("en-IN")}</span><button aria-label="Book ${s.name}" onclick="openBooking(${i})">↗</button></div></div></div>`).join("");document.getElementById("bookService").innerHTML=services.map((s,i)=>`<option value="${i}">${s.name} — ₹${s.price.toLocaleString("en-IN")}</option>`).join("");document.getElementById("priceCards").innerHTML=services.slice(0,3).map(s=>`<div class="col-md-4"><div class="price-card"><p class="eyebrow">LUNA SIGNATURE</p><h3>${s.name}</h3><div class="amount">₹${s.price.toLocaleString("en-IN")} <small class="fs-6 text-secondary">/ session</small></div><ul><li>Personalized consultation</li><li>Premium products</li><li>Stylist finishing touches</li></ul><button class="btn btn-outline-dark rounded-pill px-4" onclick="openBooking(${services.indexOf(s)})">Book service</button></div></div>`).join("")}
function renderStylists(){document.getElementById("stylistCards").innerHTML=stylists.map((s,i)=>`<div class="col-md-4"><div class="stylist-card"><div class="stylist-avatar" style="background-image:url('${s.img}')"></div><h3>${s.name}</h3><div class="eyebrow mb-2">${s.role}</div><p>${s.bio}</p><button class="btn btn-outline-dark rounded-pill px-4" onclick="openBooking(null,${i})">Book with ${s.name.split(" ")[0]}</button></div></div>`).join("");document.getElementById("bookStylist").innerHTML=stylists.map((s,i)=>`<option value="${i}">${s.name}</option>`).join("")}
function renderReviews(){let all=get("salonReviews",reviews);document.getElementById("reviewCards").innerHTML=all.map(r=>`<div class="col-md-4"><div class="review-card"><div class="stars">${"★".repeat(Number(r.rating))}${"☆".repeat(5-Number(r.rating))}</div><blockquote>“${escapeHtml(r.text)}”</blockquote><strong>${escapeHtml(r.name)}</strong></div></div>`).join("")}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function openBooking(serviceIndex=null,stylistIndex=null){if(serviceIndex!==null)document.getElementById("bookService").value=serviceIndex;if(stylistIndex!==null)document.getElementById("bookStylist").value=stylistIndex;bootstrap.Modal.getOrCreateInstance(document.getElementById("bookingModal")).show()}
function populateSlots(){const date=document.getElementById("bookDate").value,stylist=document.getElementById("bookStylist").value;const slots=["10:00 AM","11:00 AM","12:00 PM","01:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM","06:00 PM","07:00 PM"];const booked=get("salonBookings");const select=document.getElementById("bookTime");select.innerHTML='<option value="">Choose time</option>'+slots.filter(t=>!booked.some(b=>b.date===date&&String(b.stylist)===String(stylist)&&b.time===t)).map(t=>`<option>${t}</option>`).join("")}
function renderAdmin(){const b=get("salonBookings");document.getElementById("adminBookingCount").textContent=b.length;document.getElementById("adminReviewCount").textContent=get("salonReviews",reviews).length;document.getElementById("adminMemberCount").textContent=get("salonMembers",[]).length;document.getElementById("adminBookings").innerHTML=b.length?b.map((x,i)=>`<tr><td>${escapeHtml(x.name)}</td><td>${escapeHtml(x.service)}</td><td>${escapeHtml(x.stylistName)}</td><td>${escapeHtml(x.date)}</td><td>${escapeHtml(x.time)}</td><td><button class="btn btn-sm btn-outline-danger" onclick="cancelBooking(${i})">Cancel</button></td></tr>`).join(""):'<tr><td colspan="6" class="text-secondary">No appointments yet.</td></tr>'}
function cancelBooking(i){let b=get("salonBookings");b.splice(i,1);set("salonBookings",b);renderAdmin();populateSlots();toast("Appointment removed.")}
function applyOffer(){document.getElementById("offerNotice").textContent="Offer selected! Mention WELCOME15 when booking.";toast("WELCOME15 offer selected.")}
function joinMembership(){let email=localStorage.getItem("salonUserEmail");if(!email){toast("Please log in as a user first.");bootstrap.Modal.getOrCreateInstance(document.getElementById("loginModal")).show();return}let m=get("salonMembers");if(!m.includes(email))m.push(email);set("salonMembers",m);document.getElementById("memberNotice").textContent="You're on the Luna Circle demo list!";toast("Membership added in this browser.")}
document.getElementById("bookingForm").addEventListener("submit",e=>{e.preventDefault();let date=document.getElementById("bookDate").value;if(!date){toast("Please choose a date.");return}let b=get("salonBookings");const si=+document.getElementById("bookService").value,ti=+document.getElementById("bookStylist").value,time=document.getElementById("bookTime").value;if(b.some(x=>x.date===date&&+x.stylist===ti&&x.time===time)){toast("That slot was just booked. Choose another.");populateSlots();return}const signedIn=currentSalonUser();
 b.push({name:document.getElementById("bookName").value,phone:document.getElementById("bookPhone").value,email:signedIn?signedIn.email:"",service:services[si].name,stylist:ti,stylistName:stylists[ti].name,date,time});set("salonBookings",b);e.target.reset();populateSlots();bootstrap.Modal.getInstance(document.getElementById("bookingModal")).hide();toast("Appointment saved in this browser demo.");});
document.getElementById("bookDate").min=new Date().toISOString().split("T")[0];document.getElementById("bookDate").addEventListener("change",populateSlots);document.getElementById("bookStylist").addEventListener("change",populateSlots);
// Demo-only client-side registration and authentication. Not secure for production.
document.getElementById("registerForm").addEventListener("submit",e=>{
 e.preventDefault();
 const name=document.getElementById("registerName").value.trim();
 const email=document.getElementById("registerEmail").value.trim().toLowerCase();
 const phone=document.getElementById("registerPhone").value.trim();
 const password=document.getElementById("registerPassword").value;
 const users=get("salonUsers",[]);
 if(users.some(u=>u.email===email)){toast("An account with this email already exists.");return;}
 users.push({name,email,phone,password});set("salonUsers",users);
 localStorage.setItem("salonUserEmail",email);
 bootstrap.Modal.getInstance(document.getElementById("loginModal")).hide();
 e.target.reset();toast("Registration successful. You're logged in!");
 updateDashboardButton();openUserDashboard();
});
document.getElementById("userLoginForm").addEventListener("submit",e=>{
 e.preventDefault();
 const email=document.getElementById("userLoginEmail").value.trim().toLowerCase();
 const password=document.getElementById("userLoginPassword").value;
 const user=get("salonUsers",[]).find(u=>u.email===email&&u.password===password);
 if(!user){toast("Invalid login. Please register first or check your details.");return;}
 localStorage.setItem("salonUserEmail",email);
 bootstrap.Modal.getInstance(document.getElementById("loginModal")).hide();
 e.target.reset();toast("Welcome back, "+user.name+"!");
 updateDashboardButton();openUserDashboard();
});
document.getElementById("adminLoginForm").addEventListener("submit",e=>{
 e.preventDefault();
 const email=document.getElementById("adminEmail").value.trim().toLowerCase();
 const password=document.getElementById("adminPassword").value;
 if(email!=="admin@luna.demo"||password!=="admin123"){toast("Invalid demo admin credentials.");return;}
 bootstrap.Modal.getInstance(document.getElementById("loginModal")).hide();
 renderAdmin();bootstrap.Modal.getOrCreateInstance(document.getElementById("adminModal")).show();e.target.reset();
});
document.getElementById("reviewForm").addEventListener("submit",e=>{e.preventDefault();let a=get("salonReviews",reviews);const signedIn=currentSalonUser();a.unshift({name:document.getElementById("reviewName").value,rating:+document.getElementById("reviewRating").value,text:document.getElementById("reviewText").value,email:signedIn?signedIn.email:""});set("salonReviews",a);renderReviews();e.target.reset();toast("Thanks for sharing your review!")});
document.getElementById("contactForm").addEventListener("submit",e=>{e.preventDefault();document.getElementById("contactNotice").textContent="Thanks! This demo doesn't send messages.";e.target.reset()});
document.getElementById("year").textContent=new Date().getFullYear();renderServices();renderStylists();renderReviews();populateSlots();


// User dashboard helpers (browser-only demo).
function currentSalonUser(){
 const email=(localStorage.getItem("salonUserEmail")||"").toLowerCase();
 return get("salonUsers",[]).find(u=>u.email.toLowerCase()===email)||null;
}
function updateDashboardButton(){
 const btn=document.getElementById("dashboardNavBtn");
 if(btn) btn.hidden=!currentSalonUser();
}
function openUserDashboard(){
 const user=currentSalonUser();
 if(!user){toast("Please register or log in as a user first.");bootstrap.Modal.getOrCreateInstance(document.getElementById("loginModal")).show();return;}
 const bookings=get("salonBookings",[]).filter(b=>b.name===user.name || (b.email && b.email.toLowerCase()===user.email));
 const reviews=get("salonReviews",[]).filter(r=>r.email && r.email.toLowerCase()===user.email);
 const members=get("salonMembers",[]);
 document.getElementById("dashboardUserName").textContent="Hello, "+user.name+"!";
 document.getElementById("dashboardUserEmail").textContent=user.email;
 document.getElementById("dashboardPhone").textContent=user.phone ? "Phone: "+user.phone : "Phone: Not provided";
 document.getElementById("userBookingCount").textContent=bookings.length;
 document.getElementById("userMemberStatus").textContent=members.includes(user.email)?"Active":"Not joined";
 document.getElementById("userReviewCount").textContent=reviews.length;
 document.getElementById("userAppointmentsTable").innerHTML=bookings.length?bookings.map(b=>`<tr><td>${escapeHtml(b.service)}</td><td>${escapeHtml(b.stylistName||"—")}</td><td>${escapeHtml(b.date)}</td><td>${escapeHtml(b.time)}</td><td><span class="badge text-bg-success">Booked</span></td><td><button class="btn btn-sm btn-outline-danger" onclick="cancelUserBooking('${String(b.date).replace(/'/g,"&#39;")}','${String(b.time).replace(/'/g,"&#39;")}','${String(b.service).replace(/'/g,"&#39;")}')">Cancel</button></td></tr>`).join(""):'<tr><td colspan="6" class="text-secondary">You have no appointments yet. Book your first visit!</td></tr>';
 bootstrap.Modal.getOrCreateInstance(document.getElementById("userDashboardModal")).show();
}
function cancelUserBooking(date,time,service){
 const user=currentSalonUser();if(!user)return;
 let all=get("salonBookings",[]);
 const idx=all.findIndex(b=>(b.name===user.name || (b.email&&b.email.toLowerCase()===user.email))&&b.date===date&&b.time===time&&b.service===service);
 if(idx<0){toast("Appointment could not be found.");return;}
 all.splice(idx,1);set("salonBookings",all);populateSlots();openUserDashboard();toast("Your appointment was cancelled.");
}
function bookFromDashboard(){
 bootstrap.Modal.getInstance(document.getElementById("userDashboardModal"))?.hide();
 bootstrap.Modal.getOrCreateInstance(document.getElementById("bookingModal")).show();
}
function joinMembershipFromDashboard(){
 bootstrap.Modal.getInstance(document.getElementById("userDashboardModal"))?.hide();
 joinMembership();
}
function userLogout(){
 localStorage.removeItem("salonUserEmail");updateDashboardButton();
 bootstrap.Modal.getInstance(document.getElementById("userDashboardModal"))?.hide();
 toast("You have logged out.");
}
document.addEventListener("DOMContentLoaded",updateDashboardButton);
updateDashboardButton();
// ==========================================
// ADMIN DASHBOARD
// ==========================================

// STORAGE HELPERS

function adminGet(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function adminSave(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function adminEscape(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

function adminId() {
    return Date.now().toString() + Math.random().toString(36).slice(2, 7);
}


// OPEN ADMIN DASHBOARD

function openAdminDashboard() {
    // This flag is only for the frontend demo.
    if (sessionStorage.getItem("salonAdminLoggedIn") !== "true") {
        alert("Please log in as an administrator.");
        return;
    }

    refreshAdminDashboard();

    const modal = document.getElementById("adminDashboardModal");

    bootstrap.Modal.getOrCreateInstance(modal).show();
}


// SWITCH ADMIN SECTIONS

function showAdminSection(section, button) {
    document.querySelectorAll(".admin-section").forEach(item => {
        item.classList.remove("active");
    });

    const target = document.getElementById("admin-" + section);

    if (target) target.classList.add("active");

    document.querySelectorAll(".admin-link").forEach(item => {
        item.classList.remove("active");
    });

    if (button) button.classList.add("active");
}


// REFRESH ALL ADMIN DATA

function refreshAdminDashboard() {
    const users = adminGet("salonUsers");
    const staff = adminGet("salonStaff");
    const services = adminGet("salonServices");
    const bookings = adminGet("salonBookings");
    const members = adminGet("salonMembers");
    const reviews = adminGet("salonReviews");
    const offers = adminGet("salonOffers");
    const gallery = adminGet("salonGallery");

    document.getElementById("adminCustomerCount").textContent = users.length;
    document.getElementById("adminStaffCount").textContent = staff.length;
    document.getElementById("adminServiceCount").textContent = services.length;
    document.getElementById("adminBookingCount").textContent = bookings.length;
    document.getElementById("adminMemberCount").textContent = members.length;

    document.getElementById("adminCompletedCount").textContent =
        bookings.filter(b => b.status === "Completed").length;

    renderAdminRecentBookings(bookings);
    renderAdminStaff(staff);
    renderAdminServices(services);
    renderAdminAppointments(bookings);
    renderAdminCustomers(users, members);
    renderAdminMemberships(members);
    renderAdminReviews(reviews, users);
    renderAdminOffers(offers);
    renderAdminGallery(gallery);
}


// RECENT BOOKINGS

function renderAdminRecentBookings(bookings) {
    const tbody = document.getElementById("adminRecentBookings");

    const recent = [...bookings]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

    tbody.innerHTML = recent.length
        ? recent.map(b => `
            <tr>
                <td>${adminEscape(b.name)}</td>
                <td>${adminEscape(b.service)}</td>
                <td>${adminEscape(b.date)}</td>
                <td>${adminEscape(b.status || "Pending")}</td>
            </tr>
        `).join("")
        : `<tr><td colspan="4">No appointments found.</td></tr>`;
}


// ==========================================
// STAFF MANAGEMENT
// ==========================================

document.getElementById("staffForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    const staff = adminGet("salonStaff");
    const id = document.getElementById("staffEditId").value;

    const item = {
        id: id || adminId(),
        name: document.getElementById("staffName").value.trim(),
        specialization: document.getElementById("staffSpecialization").value.trim(),
        phone: document.getElementById("staffPhone").value.trim(),
        email: document.getElementById("staffEmail").value.trim()
    };

    if (id) {
        const index = staff.findIndex(s => String(s.id) === id);
        if (index !== -1) staff[index] = item;
    } else {
        staff.push(item);
    }

    adminSave("salonStaff", staff);

    resetStaffForm();
    refreshAdminDashboard();

    alert("Staff saved successfully.");
});


function renderAdminStaff(staff) {
    const tbody = document.getElementById("adminStaffTable");

    tbody.innerHTML = staff.length
        ? staff.map(s => `
            <tr>
                <td>${adminEscape(s.name)}</td>
                <td>${adminEscape(s.specialization)}</td>
                <td>${adminEscape(s.phone)}</td>
                <td>
                    <button class="btn btn-sm btn-warning"
                        onclick="editStaff('${s.id}')">Edit</button>

                    <button class="btn btn-sm btn-danger"
                        onclick="deleteStaff('${s.id}')">Delete</button>
                </td>
            </tr>
        `).join("")
        : `<tr><td colspan="4">No staff added.</td></tr>`;
}


function editStaff(id) {
    const staff = adminGet("salonStaff");
    const item = staff.find(s => String(s.id) === String(id));

    if (!item) return;

    document.getElementById("staffEditId").value = item.id;
    document.getElementById("staffName").value = item.name;
    document.getElementById("staffSpecialization").value = item.specialization;
    document.getElementById("staffPhone").value = item.phone || "";
    document.getElementById("staffEmail").value = item.email || "";

    showAdminSection("staff");
}


function deleteStaff(id) {
    if (!confirm("Delete this staff member?")) return;

    const staff = adminGet("salonStaff")
        .filter(s => String(s.id) !== String(id));

    adminSave("salonStaff", staff);
    refreshAdminDashboard();
}


function resetStaffForm() {
    document.getElementById("staffForm").reset();
    document.getElementById("staffEditId").value = "";
}


// ==========================================
// SERVICES MANAGEMENT
// ==========================================

document.getElementById("serviceForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    const services = adminGet("salonServices");
    const id = document.getElementById("serviceEditId").value;

    const item = {
        id: id || adminId(),
        name: document.getElementById("serviceName").value.trim(),
        category: document.getElementById("serviceCategory").value.trim(),
        price: Number(document.getElementById("servicePrice").value),
        duration: Number(document.getElementById("serviceDuration").value),
        description: document.getElementById("serviceDescription").value.trim()
    };

    if (id) {
        const index = services.findIndex(s => String(s.id) === id);
        if (index !== -1) services[index] = item;
    } else {
        services.push(item);
    }

    adminSave("salonServices", services);

    resetServiceForm();
    refreshAdminDashboard();

    alert("Service saved successfully.");
});


function renderAdminServices(services) {
    const tbody = document.getElementById("adminServicesTable");

    tbody.innerHTML = services.length
        ? services.map(s => `
            <tr>
                <td>${adminEscape(s.name)}</td>
                <td>${adminEscape(s.category)}</td>
                <td>₹${Number(s.price).toFixed(2)}</td>
                <td>${adminEscape(s.duration)} min</td>
                <td>
                    <button class="btn btn-sm btn-warning"
                        onclick="editService('${s.id}')">Edit</button>

                    <button class="btn btn-sm btn-danger"
                        onclick="deleteService('${s.id}')">Delete</button>
                </td>
            </tr>
        `).join("")
        : `<tr><td colspan="5">No services added.</td></tr>`;
}


function editService(id) {
    const services = adminGet("salonServices");
    const item = services.find(s => String(s.id) === String(id));

    if (!item) return;

    document.getElementById("serviceEditId").value = item.id;
    document.getElementById("serviceName").value = item.name;
    document.getElementById("serviceCategory").value = item.category;
    document.getElementById("servicePrice").value = item.price;
    document.getElementById("serviceDuration").value = item.duration;
    document.getElementById("serviceDescription").value = item.description || "";

    showAdminSection("services");
}


function deleteService(id) {
    if (!confirm("Delete this service?")) return;

    const services = adminGet("salonServices")
        .filter(s => String(s.id) !== String(id));

    adminSave("salonServices", services);
    refreshAdminDashboard();
}


function resetServiceForm() {
    document.getElementById("serviceForm").reset();
    document.getElementById("serviceEditId").value = "";
}


// ==========================================
// APPOINTMENT MANAGEMENT
// ==========================================

function renderAdminAppointments(bookings) {
    const tbody = document.getElementById("adminAppointmentsTable");

    tbody.innerHTML = bookings.length
        ? bookings.map((b, index) => `
            <tr>
                <td>${adminEscape(b.name)}</td>
                <td>${adminEscape(b.service)}</td>
                <td>${adminEscape(b.stylistName || b.stylist || "-")}</td>
                <td>${adminEscape(b.date)}</td>
                <td>${adminEscape(b.time)}</td>

                <td>
                    <select class="form-select form-select-sm"
                        onchange="updateBookingStatus(${index}, this.value)">
                        ${["Pending", "Confirmed", "Completed", "Cancelled"].map(status => `
                            <option value="${status}"
                                ${(b.status || "Pending") === status ? "selected" : ""}>
                                ${status}
                            </option>
                        `).join("")}
                    </select>
                </td>

                <td>
                    <button class="btn btn-sm btn-danger"
                        onclick="deleteBooking(${index})">Delete</button>
                </td>
            </tr>
        `).join("")
        : `<tr><td colspan="7">No appointments found.</td></tr>`;
}


function updateBookingStatus(index, status) {
    const bookings = adminGet("salonBookings");

    if (!bookings[index]) return;

    bookings[index].status = status;

    adminSave("salonBookings", bookings);
    refreshAdminDashboard();
}


function deleteBooking(index) {
    if (!confirm("Delete this appointment?")) return;

    const bookings = adminGet("salonBookings");
    bookings.splice(index, 1);

    adminSave("salonBookings", bookings);
    refreshAdminDashboard();
}


// ==========================================
// CUSTOMER MANAGEMENT
// ==========================================

function renderAdminCustomers(users, members) {
    const tbody = document.getElementById("adminCustomersTable");

    tbody.innerHTML = users.length
        ? users.map(user => `
            <tr>
                <td>${adminEscape(user.name)}</td>
                <td>${adminEscape(user.email)}</td>
                <td>${adminEscape(user.phone)}</td>
                <td>${members.includes(user.email) ? "Member" : "Non-member"}</td>
            </tr>
        `).join("")
        : `<tr><td colspan="4">No customers registered.</td></tr>`;
}


// ==========================================
// MEMBERSHIP MANAGEMENT
// ==========================================

function renderAdminMemberships(members) {
    const tbody = document.getElementById("adminMembershipsTable");

    tbody.innerHTML = members.length
        ? members.map(email => `
            <tr>
                <td>${adminEscape(email)}</td>
                <td>
                    <button class="btn btn-sm btn-danger"
                        onclick="removeMembership('${encodeURIComponent(email)}')">
                        Remove Membership
                    </button>
                </td>
            </tr>
        `).join("")
        : `<tr><td colspan="2">No active memberships.</td></tr>`;
}


function removeMembership(encodedEmail) {
    const email = decodeURIComponent(encodedEmail);

    if (!confirm("Remove this membership?")) return;

    const members = adminGet("salonMembers")
        .filter(item => item !== email);

    adminSave("salonMembers", members);
    refreshAdminDashboard();
}


// ==========================================
// REVIEWS MANAGEMENT
// ==========================================

function renderAdminReviews(reviews, users) {
    const tbody = document.getElementById("adminReviewsTable");

    tbody.innerHTML = reviews.length
        ? reviews.map((review, index) => {
            const customer = users.find(u => u.email === review.email);

            return `
                <tr>
                    <td>${adminEscape(customer?.name || review.email || "Guest")}</td>
                    <td>${adminEscape(review.rating || "-")}/5</td>
                    <td>${adminEscape(review.comment || review.text || "")}</td>
                    <td>
                        <button class="btn btn-sm btn-danger"
                            onclick="deleteAdminReview(${index})">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        }).join("")
        : `<tr><td colspan="4">No reviews found.</td></tr>`;
}


function deleteAdminReview(index) {
    if (!confirm("Delete this review?")) return;

    const reviews = adminGet("salonReviews");
    reviews.splice(index, 1);

    adminSave("salonReviews", reviews);
    refreshAdminDashboard();
}


// ==========================================
// OFFERS MANAGEMENT
// ==========================================

document.getElementById("offerForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    const offers = adminGet("salonOffers");
    const id = document.getElementById("offerEditId").value;

    const item = {
        id: id || adminId(),
        name: document.getElementById("offerName").value.trim(),
        discount: Number(document.getElementById("offerDiscount").value),
        expiry: document.getElementById("offerExpiry").value,
        description: document.getElementById("offerDescription").value.trim()
    };

    if (id) {
        const index = offers.findIndex(o => String(o.id) === id);
        if (index !== -1) offers[index] = item;
    } else {
        offers.push(item);
    }

    adminSave("salonOffers", offers);

    resetOfferForm();
    refreshAdminDashboard();

    alert("Offer saved successfully.");
});


function renderAdminOffers(offers) {
    const tbody = document.getElementById("adminOffersTable");

    tbody.innerHTML = offers.length
        ? offers.map(o => `
            <tr>
                <td>${adminEscape(o.name)}</td>
                <td>${adminEscape(o.discount)}%</td>
                <td>${adminEscape(o.expiry)}</td>
                <td>${adminEscape(o.description)}</td>
                <td>
                    <button class="btn btn-sm btn-warning"
                        onclick="editOffer('${o.id}')">Edit</button>

                    <button class="btn btn-sm btn-danger"
                        onclick="deleteOffer('${o.id}')">Delete</button>
                </td>
            </tr>
        `).join("")
        : `<tr><td colspan="5">No offers added.</td></tr>`;
}


function editOffer(id) {
    const offers = adminGet("salonOffers");
    const item = offers.find(o => String(o.id) === String(id));

    if (!item) return;

    document.getElementById("offerEditId").value = item.id;
    document.getElementById("offerName").value = item.name;
    document.getElementById("offerDiscount").value = item.discount;
    document.getElementById("offerExpiry").value = item.expiry;
    document.getElementById("offerDescription").value = item.description || "";

    showAdminSection("offers");
}


function deleteOffer(id) {
    if (!confirm("Delete this offer?")) return;

    const offers = adminGet("salonOffers")
        .filter(o => String(o.id) !== String(id));

    adminSave("salonOffers", offers);
    refreshAdminDashboard();
}


function resetOfferForm() {
    document.getElementById("offerForm").reset();
    document.getElementById("offerEditId").value = "";
}


// ==========================================
// GALLERY MANAGEMENT
// ==========================================

document.getElementById("galleryForm")?.addEventListener("submit", function(e) {
    e.preventDefault();

    const gallery = adminGet("salonGallery");

    gallery.push({
        id: adminId(),
        url: document.getElementById("galleryImageUrl").value.trim(),
        title: document.getElementById("galleryImageTitle").value.trim()
    });

    adminSave("salonGallery", gallery);

    this.reset();
    refreshAdminDashboard();

    alert("Gallery image added.");
});


function renderAdminGallery(gallery) {
    const container = document.getElementById("adminGalleryList");

    container.innerHTML = gallery.length
        ? gallery.map(item => `
            <div class="admin-gallery-item">
                <img src="${adminEscape(item.url)}"
                    alt="${adminEscape(item.title)}">

                <div class="flex-grow-1">
                    <h6>${adminEscape(item.title)}</h6>
                </div>

                <button class="btn btn-sm btn-danger"
                    onclick="deleteGalleryImage('${item.id}')">
                    Delete
                </button>
            </div>
        `).join("")
        : "<p>No gallery images added.</p>";
}


function deleteGalleryImage(id) {
    if (!confirm("Delete this gallery image?")) return;

    const gallery = adminGet("salonGallery")
        .filter(item => String(item.id) !== String(id));

    adminSave("salonGallery", gallery);
    refreshAdminDashboard();
}


// ==========================================
// ADMIN LOGOUT
// ==========================================

function logoutAdmin() {
    sessionStorage.removeItem("salonAdminLoggedIn");

    const modal = document.getElementById("adminDashboardModal");

    if (modal) {
        bootstrap.Modal.getOrCreateInstance(modal).hide();
    }

    alert("Admin logged out.");
    location.reload();
}
function loginAdmin(username, password) {

    // DEMO ONLY: Replace with secure server-side authentication.
    if (username === "admin" && password === "admin123") {

        sessionStorage.setItem("salonAdminLoggedIn", "true");

        const loginModal = document.getElementById("adminLoginModal");

        if (loginModal) {
            bootstrap.Modal.getOrCreateInstance(loginModal).hide();
        }

        openAdminDashboard();

    } else {
        alert("Invalid admin username or password.");
    }
}