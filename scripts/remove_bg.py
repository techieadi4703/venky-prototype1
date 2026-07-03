from PIL import Image
import os

input_path = "public/images/Gemini_Generated_Image_uwa0zbuwa0zbuwa0.png"
output_path = "public/images/printer-nobg.png"

img = Image.open(input_path).convert("RGBA")
pixels = img.load()
w, h = img.size

# Any pixel that is light gray/white (all channels > 140 and close together) is background
def is_bg(r, g, b):
    # Light grayish pixels where R, G, B are all similar and above a threshold
    if min(r, g, b) > 130 and max(r, g, b) - min(r, g, b) < 30:
        return True
    return False

for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        if is_bg(r, g, b):
            pixels[x, y] = (r, g, b, 0)

img.save(output_path, "PNG")
print(f"Saved to {output_path}")
