import glob
import re

html_files = glob.glob('f:/logistics/*.html')
for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Fix Brand & Content Inconsistencies
    content = content.replace('<title>Nexus Logistics - Smart Delivery</title>', '<title>MS Logistic - International Freight Forwarding</title>')
    content = content.replace('© 2026 [COMPANY NAME]', '© 2026 MS Logistic')
    content = content.replace('hello@company.com', 'info@mslogistic.in')
    content = content.replace('+91 XXX XXX XXXX', '+91 98765 43210')
    
    # Fix Footer Links
    footer_links_old = '''<li><a href="services.html">Export Freight Forwarding</a></li>
                        <li><a href="services.html">Import Freight Forwarding</a></li>
                        <li><a href="services.html">Ocean Freight</a></li>
                        <li><a href="services.html">Air Freight</a></li>
                        <li><a href="services.html">Road Transportation</a></li>
                        <li><a href="services.html">Customs Clearance</a></li>'''
    
    footer_links_new = '''<li><a href="services.html">Ocean Freight</a></li>
                        <li><a href="services.html">Air Freight</a></li>
                        <li><a href="services.html">Road Transport</a></li>
                        <li><a href="services.html">Customs Clearance</a></li>
                        <li><a href="services.html">Warehousing</a></li>
                        <li><a href="services.html">Project Cargo</a></li>'''
    content = content.replace(footer_links_old, footer_links_new)

    # 2. Fix Stats missing numbers (#0f172a to var(--text-heading))
    content = re.sub(r'color:\s*#0f172a;?', 'color: var(--text-heading);', content)

    # 3. Global Network form control text color
    # Add inline style or rely on css. In styles.css we have .form-control. I will update it in styles.css later.

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print('Updated HTML files content.')
