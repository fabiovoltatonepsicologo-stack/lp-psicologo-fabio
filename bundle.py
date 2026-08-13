import base64
import os
import re
import mimetypes

def get_base64_encoded_image(image_path):
    with open(image_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
    mime_type, _ = mimetypes.guess_type(image_path)
    if not mime_type:
        mime_type = 'image/jpeg'
    return f"data:{mime_type};base64,{encoded_string}"

def bundle():
    os.chdir('/Users/nathanmarcelosantosalmeida/Documents/LP Psicólogo Fábio')
    
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()
        
    with open('assets/css/style.css', 'r', encoding='utf-8') as f:
        css = f.read()
    html = re.sub(
        r'<link\s+rel="stylesheet"\s+href="assets/css/style\.css">',
        f'<style>\n{css}\n</style>',
        html
    )
    
    with open('assets/js/main.js', 'r', encoding='utf-8') as f:
        js = f.read()
    html = re.sub(
        r'<script\s+src="assets/js/main\.js"></script>',
        f'<script>\n{js}\n</script>',
        html
    )
    
    img_pattern = re.compile(r'src="(assets/img/[^"]+)"')
    matches = img_pattern.findall(html)
    
    for img_path in set(matches):
        if os.path.exists(img_path):
            base64_data = get_base64_encoded_image(img_path)
            html = html.replace(f'"{img_path}"', f'"{base64_data}"')
            
    with open('Aprovacao_Fabio_Completo.html', 'w', encoding='utf-8') as f:
        f.write(html)

bundle()
