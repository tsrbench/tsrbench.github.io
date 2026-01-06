from PIL import Image, ImageDraw, ImageFont
import os

# Create placeholder image
img = Image.new('RGB', (1000, 700), color='white')
draw = ImageDraw.Draw(img)

# Add border
draw.rectangle([10, 10, 990, 690], outline='lightgray', width=3)

# Add text
text = "Case Image\nComing Soon"
try:
    font = ImageFont.truetype("Arial", 60)
except:
    font = ImageFont.load_default()

# Center text
bbox = draw.textbbox((0, 0), text, font=font)
text_width = bbox[2] - bbox[0]
text_height = bbox[3] - bbox[1]
x = (1000 - text_width) // 2
y = (700 - text_height) // 2

draw.multiline_text((x, y), text, fill='gray', font=font, align='center')

# Save
output_path = 'website/img/cases/placeholder.png'
img.save(output_path)
print(f"Created {output_path}")
