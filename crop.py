from PIL import Image
import os

try:
    img_path = 'public/rkelectricals-logo.png'
    out_path = 'public/rkelectricals-logo-cropped.png'
    
    img = Image.open(img_path)
    
    # getbbox returns the bounding box of non-zero regions.
    # We should ensure we're looking at the alpha channel to crop transparency.
    if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
        alpha = img.convert('RGBA').split()[-1]
        bbox = alpha.getbbox()
    else:
        bbox = img.getbbox()
        
    if bbox:
        cropped = img.crop(bbox)
        cropped.save(out_path)
        print(f"Successfully cropped {img_path} to {out_path} with bbox {bbox}")
    else:
        print("Image is entirely transparent or empty.")
except Exception as e:
    print("Error:", e)
