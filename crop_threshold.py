from PIL import Image

img_path = 'public/rkelectricals-logo.png'
out_path = 'public/rkelectricals-logo-cropped.png'
img = Image.open(img_path).convert('RGBA')

# threshold the alpha channel to only keep pixels with alpha > 50
alpha = img.split()[-1]
alpha = alpha.point(lambda p: 255 if p > 50 else 0)

bbox = alpha.getbbox()
if bbox:
    cropped = img.crop(bbox)
    cropped.save(out_path)
    print(f"Successfully cropped with thresholded bbox {bbox}")
else:
    print("Empty after thresholding")
