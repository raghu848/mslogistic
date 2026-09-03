import os

# Read index.html to extract common elements
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract head
head_end = html.find('</head>') + 7
head = html[:head_end]

# Extract navbar
nav_start = html.find('<div class="navbar-wrapper">')
nav_end = html.find('<!-- 2. Hero Section -->')
navbar = html[nav_start:nav_end]

# Extract footer
footer_start = html.find('<!-- Footer -->')
footer = html[footer_start:]

# Define page contents
pages = {
    'about.html': """
    <!-- Header -->
    <section class="section" style="background: var(--primary-navy); padding-top: 120px; padding-bottom: 80px;">
        <div class="container text-center">
            <h1 style="color: white; font-size: 3.5rem;">ABOUT MS LOGISTIC</h1>
            <p style="color: var(--accent-orange); font-size: 1.2rem; margin-top: 1rem;">Logistics That Keeps Business Moving</p>
        </div>
    </section>

    <!-- Mission & Vision -->
    <section class="section section-light">
        <div class="container grid-2">
            <div>
                <img src="assets/vertical_truck_1787800304566.jpg" alt="Logistics Network" class="split-img" style="max-height: 500px; object-fit: cover;">
            </div>
            <div>
                <h2 style="color: var(--primary-navy); margin-bottom: 1.5rem;">Who We Are</h2>
                <p style="font-size: 1.1rem; color: var(--text-gray); margin-bottom: 2rem;">MS Logistic is an international freight forwarding and logistics company helping businesses move cargo efficiently across borders. We coordinate the complete journey of your shipment — from origin pickup and documentation to international transportation, customs clearance and final delivery.</p>
                
                <h3 style="color: var(--primary-navy); margin-bottom: 1rem;">Our Mission</h3>
                <p style="font-size: 1.1rem; color: var(--text-gray); margin-bottom: 2rem;">To simplify complex supply chains by providing reliable, visible and well-coordinated logistics solutions that allow our clients to focus on growing their business.</p>

                <h3 style="color: var(--primary-navy); margin-bottom: 1rem;">Our Vision</h3>
                <p style="font-size: 1.1rem; color: var(--text-gray);">To be the most trusted logistics partner for businesses navigating international trade, recognized for our operational discipline and commitment to client success.</p>
            </div>
        </div>
    </section>
    
    <!-- Trust / Credentials (reusing from index) -->
    <div class="logo-bar" style="background: var(--primary-navy); padding: 4rem 0;">
        <div class="container logo-bar-inner" style="opacity: 1; justify-content: space-around; color: white; text-align: center;">
            <div>
                <div style="font-size: 3rem; font-weight: 700; color: var(--accent-orange);">15+</div>
                <div style="font-size: 0.9rem; letter-spacing: 1px; text-transform: uppercase;">Years Experience</div>
            </div>
            <div>
                <div style="font-size: 3rem; font-weight: 700; color: var(--accent-orange);">150+</div>
                <div style="font-size: 0.9rem; letter-spacing: 1px; text-transform: uppercase;">Countries Served</div>
            </div>
            <div>
                <div style="font-size: 3rem; font-weight: 700; color: var(--accent-orange);">10,000+</div>
                <div style="font-size: 0.9rem; letter-spacing: 1px; text-transform: uppercase;">Shipments Handled</div>
            </div>
            <div>
                <div style="font-size: 3rem; font-weight: 700; color: var(--accent-orange);">500+</div>
                <div style="font-size: 0.9rem; letter-spacing: 1px; text-transform: uppercase;">Clients Worldwide</div>
            </div>
        </div>
    </div>
    """,
    'services.html': """
    <!-- Header -->
    <section class="section" style="background: var(--primary-navy); padding-top: 120px; padding-bottom: 80px;">
        <div class="container text-center">
            <h1 style="color: white; font-size: 3.5rem;">OUR SERVICES</h1>
            <p style="color: var(--accent-orange); font-size: 1.2rem; margin-top: 1rem;">Complete Freight & Logistics Solutions</p>
        </div>
    </section>

    <!-- Services Detailed -->
    <section class="section section-light">
        <div class="container">
            <div class="grid-3">
                <div class="service-card-new" style="background-image: linear-gradient(rgba(11,21,40,0.8), rgba(11,21,40,0.95)), url('assets/srv_ocean_1787802085277.jpg'); background-size: cover; background-position: center;">
                    <div class="card-icon"><i class="ph-fill ph-boat"></i></div>
                    <h3>01 — Ocean Freight</h3>
                    <p>Move your cargo efficiently across international trade routes with flexible FCL and LCL ocean freight solutions.</p>
                </div>
                <div class="service-card-new" style="background-image: linear-gradient(rgba(11,21,40,0.8), rgba(11,21,40,0.95)), url('assets/srv_air_1787802099035.jpg'); background-size: cover; background-position: center;">
                    <div class="card-icon"><i class="ph-fill ph-airplane-tilt"></i></div>
                    <h3>02 — Air Freight</h3>
                    <p>Fast, dependable air freight solutions for urgent, time-sensitive and high-value shipments.</p>
                </div>
                <div class="service-card-new" style="background-image: linear-gradient(rgba(11,21,40,0.8), rgba(11,21,40,0.95)), url('assets/hero_logistics_truck_1787799951828.jpg'); background-size: cover; background-position: center;">
                    <div class="card-icon"><i class="ph-fill ph-truck"></i></div>
                    <h3>03 — Road Transportation</h3>
                    <p>Connect ports, airports, warehouses and final destinations through dependable road transportation solutions.</p>
                </div>
                <div class="service-card-new" style="background-image: linear-gradient(rgba(11,21,40,0.8), rgba(11,21,40,0.95)), url('assets/ind_tech_1787801555640.jpg'); background-size: cover; background-position: center;">
                    <div class="card-icon"><i class="ph-fill ph-file-text"></i></div>
                    <h3>04 — Customs Clearance</h3>
                    <p>Professional customs clearance support to help your import and export shipments move smoothly.</p>
                </div>
                <div class="service-card-new" style="background-image: linear-gradient(rgba(11,21,40,0.8), rgba(11,21,40,0.95)), url('assets/modern_warehouse_1787799964731.jpg'); background-size: cover; background-position: center;">
                    <div class="card-icon"><i class="ph-fill ph-warehouse"></i></div>
                    <h3>05 — Warehousing</h3>
                    <p>Flexible warehousing solutions designed to keep your inventory secure, accessible and ready.</p>
                </div>
                <div class="service-card-new" style="background-image: linear-gradient(rgba(11,21,40,0.8), rgba(11,21,40,0.95)), url('assets/ind_mfg_1787801541656.jpg'); background-size: cover; background-position: center;">
                    <div class="card-icon"><i class="ph-fill ph-crane"></i></div>
                    <h3>06 — Project Cargo</h3>
                    <p>Our project cargo solutions are designed around the specific requirements of complex shipments.</p>
                </div>
            </div>
        </div>
    </section>
    """,
    'tracking.html': """
    <!-- Header -->
    <section class="section" style="background: var(--primary-navy); padding-top: 120px; padding-bottom: 80px;">
        <div class="container text-center">
            <h1 style="color: white; font-size: 3.5rem;">TRACK SHIPMENT</h1>
            <p style="color: var(--accent-orange); font-size: 1.2rem; margin-top: 1rem;">Know Where Your Cargo Is.</p>
        </div>
    </section>

    <!-- Tracking Input -->
    <section class="section section-light" style="padding: 6rem 0; min-height: 50vh;">
        <div class="container" style="max-width: 600px; text-align: center;">
            <div class="form-box" style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 3rem;">
                <h3 style="color: var(--primary-navy); margin-bottom: 1rem;">Track Your Shipment With Confidence</h3>
                <p style="color: var(--text-gray); margin-bottom: 2rem;">Get shipment visibility from dispatch to delivery. Enter your tracking reference below.</p>
                
                <div class="form-group" style="text-align: left;">
                    <label style="color: var(--primary-navy); font-weight: 600;">Tracking Number / AWB / BL</label>
                    <input type="text" class="form-control" placeholder="Enter Tracking ID (e.g. MSL123456)" style="border: 2px solid #e2e8f0; color: #333;">
                </div>
                <button class="btn-primary" style="margin-top: 1.5rem; width: 100%; justify-content: center; background: var(--accent-orange);">Track Shipment <i class="ph ph-magnifying-glass"></i></button>
            </div>
        </div>
    </section>
    """,
    'contact.html': """
    <!-- Header -->
    <section class="section" style="background: var(--primary-navy); padding-top: 120px; padding-bottom: 80px;">
        <div class="container text-center">
            <h1 style="color: white; font-size: 3.5rem;">CONTACT US</h1>
            <p style="color: var(--accent-orange); font-size: 1.2rem; margin-top: 1rem;">Get a Freight Quote Tailored to Your Shipment.</p>
        </div>
    </section>

    <!-- Contact Layout -->
    <section class="section section-light">
        <div class="container grid-2">
            <!-- Contact Details -->
            <div>
                <h2 style="color: var(--primary-navy); margin-bottom: 1.5rem;">Get In Touch</h2>
                <p style="color: var(--text-gray); font-size: 1.1rem; margin-bottom: 3rem;">Have a logistics requirement, distribution challenge or supply chain project? Speak with our team and discover a solution built around your business.</p>
                
                <div style="margin-bottom: 2rem;">
                    <h4 style="color: var(--primary-navy);"><i class="ph-fill ph-map-pin" style="color: var(--accent-orange); margin-right: 8px;"></i> Corporate Office</h4>
                    <p style="color: var(--text-gray); margin-top: 0.5rem; padding-left: 32px;">Ground Floor, 1783 K Street No. 2,<br>33 Feet Road, Harjap Nagar,<br>Ludhiana, Punjab 141015, India</p>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h4 style="color: var(--primary-navy);"><i class="ph-fill ph-phone" style="color: var(--accent-orange); margin-right: 8px;"></i> Phone</h4>
                    <p style="color: var(--text-gray); margin-top: 0.5rem; padding-left: 32px;">+91 90565 13656</p>
                </div>
                
                <div style="margin-bottom: 2rem;">
                    <h4 style="color: var(--primary-navy);"><i class="ph-fill ph-envelope" style="color: var(--accent-orange); margin-right: 8px;"></i> Email</h4>
                    <p style="color: var(--text-gray); margin-top: 0.5rem; padding-left: 32px;">info@mslogistic.org</p>
                </div>
            </div>
            
            <!-- Quote Form -->
            <div class="form-box" style="background: white; border: 1px solid #e2e8f0; padding: 3rem; border-radius: 12px;">
                <h3 style="color: var(--primary-navy); margin-bottom: 0.5rem;">Request a Quote</h3>
                <p style="color: var(--text-gray); margin-bottom: 2rem;">Tell us what you need to move.</p>
                
                <div class="form-group">
                    <label style="color: var(--primary-navy);">Your Name</label>
                    <input type="text" class="form-control" placeholder="Full Name" style="border: 2px solid #e2e8f0; color: #333;">
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                        <label style="color: var(--primary-navy);">Origin</label>
                        <input type="text" class="form-control" placeholder="City or Pincode" style="border: 2px solid #e2e8f0; color: #333;">
                    </div>
                    <div class="form-group">
                        <label style="color: var(--primary-navy);">Destination</label>
                        <input type="text" class="form-control" placeholder="City or Pincode" style="border: 2px solid #e2e8f0; color: #333;">
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div class="form-group">
                        <label style="color: var(--primary-navy);">Cargo Type</label>
                        <input type="text" class="form-control" placeholder="Type of Goods" style="border: 2px solid #e2e8f0; color: #333;">
                    </div>
                    <div class="form-group">
                        <label style="color: var(--primary-navy);">Shipment Mode</label>
                        <input type="text" class="form-control" placeholder="Ocean / Air / Road" style="border: 2px solid #e2e8f0; color: #333;">
                    </div>
                </div>
                <button class="btn-primary" style="margin-top: 1rem; width: 100%; justify-content: center; background: var(--accent-orange);">Submit Request</button>
            </div>
        </div>
    </section>
    """,
    'resources.html': """
    <!-- Header -->
    <section class="section" style="background: var(--primary-navy); padding-top: 120px; padding-bottom: 80px;">
        <div class="container text-center">
            <h1 style="color: white; font-size: 3.5rem;">RESOURCES</h1>
            <p style="color: var(--accent-orange); font-size: 1.2rem; margin-top: 1rem;">Insights & Frequently Asked Questions</p>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="section section-light" id="faq">
        <div class="container">
            <div class="header-centered">
                <div class="section-subtitle">FAQ</div>
                <h2>Frequently Asked Questions</h2>
            </div>
            
            <div style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; gap: 1rem;">
                <!-- FAQ Item 1 -->
                <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem;">
                    <h4 style="color: var(--primary-navy); margin-bottom: 0.5rem;">What regions do you service?</h4>
                    <p style="color: var(--text-gray);">We provide global logistics solutions, connecting India to over 150 countries through our established network of international partners and carriers.</p>
                </div>
                
                <!-- FAQ Item 2 -->
                <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem;">
                    <h4 style="color: var(--primary-navy); margin-bottom: 0.5rem;">Do you handle customs clearance?</h4>
                    <p style="color: var(--text-gray);">Yes. Our team manages customs clearance and related documentation to ensure your cargo complies with local and international regulations.</p>
                </div>
                
                <!-- FAQ Item 3 -->
                <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem;">
                    <h4 style="color: var(--primary-navy); margin-bottom: 0.5rem;">Can I track my shipment?</h4>
                    <p style="color: var(--text-gray);">Absolutely. We provide shipment visibility and tracking, keeping you informed of your cargo's status from origin to destination.</p>
                </div>
                
                <!-- FAQ Item 4 -->
                <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem;">
                    <h4 style="color: var(--primary-navy); margin-bottom: 0.5rem;">What types of cargo do you handle?</h4>
                    <p style="color: var(--text-gray);">We manage a wide range of shipments including general commercial cargo, industrial equipment, temperature-sensitive goods and project cargo.</p>
                </div>
            </div>
        </div>
    </section>
    
    <!-- Blog Section -->
    <section class="section" style="background: #f8fafc;" id="blog">
        <div class="container">
            <div class="header-centered">
                <div class="section-subtitle">LATEST INSIGHTS</div>
                <h2>Logistics & Supply Chain Blog</h2>
            </div>
            
            <div class="grid-3">
                <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    <div style="height: 200px; background-image: url('assets/hero_logistics_truck_1787799951828.jpg'); background-size: cover; background-position: center;"></div>
                    <div style="padding: 2rem;">
                        <span style="color: var(--accent-orange); font-size: 0.85rem; font-weight: 700;">SUPPLY CHAIN</span>
                        <h4 style="margin: 0.5rem 0; color: var(--primary-navy);">Optimizing Last-Mile Delivery for Modern E-commerce</h4>
                        <p style="color: var(--text-gray); font-size: 0.95rem; margin-bottom: 1rem;">Discover strategies to improve delivery times and reduce costs in final-mile logistics.</p>
                        <a href="#" style="color: var(--accent-orange); font-weight: 600; text-decoration: none;">Read Article →</a>
                    </div>
                </div>
                
                <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    <div style="height: 200px; background-image: url('assets/srv_ocean_1787802085277.jpg'); background-size: cover; background-position: center;"></div>
                    <div style="padding: 2rem;">
                        <span style="color: var(--accent-orange); font-size: 0.85rem; font-weight: 700;">FREIGHT FORWARDING</span>
                        <h4 style="margin: 0.5rem 0; color: var(--primary-navy);">Navigating Global Ocean Freight Capacity in 2024</h4>
                        <p style="color: var(--text-gray); font-size: 0.95rem; margin-bottom: 1rem;">An analysis of current trends in container shipping and capacity management.</p>
                        <a href="#" style="color: var(--accent-orange); font-weight: 600; text-decoration: none;">Read Article →</a>
                    </div>
                </div>
                
                <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    <div style="height: 200px; background-image: url('assets/logistics_tech_1787799979723.jpg'); background-size: cover; background-position: center;"></div>
                    <div style="padding: 2rem;">
                        <span style="color: var(--accent-orange); font-size: 0.85rem; font-weight: 700;">TECHNOLOGY</span>
                        <h4 style="margin: 0.5rem 0; color: var(--primary-navy);">The Role of Digital Visibility in Supply Chains</h4>
                        <p style="color: var(--text-gray); font-size: 0.95rem; margin-bottom: 1rem;">How real-time tracking and data analytics are transforming logistics operations.</p>
                        <a href="#" style="color: var(--accent-orange); font-weight: 600; text-decoration: none;">Read Article →</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    """
}

# Generate each page
for filename, body in pages.items():
    content = f"""{head}
<body>
    {navbar}
    {body}
    {footer}
</body>
</html>
"""
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

print("Pages created successfully!")
