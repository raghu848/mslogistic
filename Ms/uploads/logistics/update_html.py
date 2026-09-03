import glob
import re

html_files = glob.glob('f:/logistics/*.html')

head_script = '''    <script>
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    </script>
</head>'''

toggle_button = '''<div class="nav-right">
                <button class="theme-toggle" id="theme-toggle" title="Switch to dark mode">
                    <i class="ph-bold ph-moon"></i>
                </button>'''

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Add head script
    if "localStorage.getItem('theme')" not in content:
        content = content.replace('</head>', head_script)
        
    # 2. Add toggle button
    if 'class="theme-toggle"' not in content:
        content = content.replace('<div class="nav-right">', toggle_button)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print('Updated HTML files.')
