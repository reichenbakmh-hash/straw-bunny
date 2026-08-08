from PIL import Image, ImageDraw
import math

def make_icon(size, maskable=False, path="icon.png"):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    pad = size * 0.14 if maskable else size * 0.06
    if maskable:
        d.rounded_rectangle([0, 0, size, size], radius=size*0.5, fill=(255, 228, 236, 255))
    else:
        d.rounded_rectangle([0, 0, size, size], radius=size*0.22, fill=(255, 228, 236, 255))

    cx, cy = size / 2, size * 0.58
    body_r = size * 0.26

    # oreilles (positionnées et dimensionnées pour rester dans la zone sûre)
    ear_w, ear_h = size * 0.12, size * 0.24
    ear_center_y = size * 0.20
    for dx in (-1, 1):
        ex = cx + dx * size * 0.14
        ey = ear_center_y
        d.ellipse([ex - ear_w/2, ey - ear_h/2, ex + ear_w/2, ey + ear_h/2], fill=(255, 247, 240, 255), outline=(255, 209, 222, 255), width=max(1, int(size*0.006)))
        d.ellipse([ex - ear_w*0.32, ey - ear_h*0.32, ex + ear_w*0.32, ey + ear_h*0.30], fill=(255, 224, 234, 255))

    # corps fraise
    d.ellipse([cx - body_r, cy - body_r, cx + body_r, cy + body_r], fill=(255, 127, 166, 255))

    # feuille
    leaf_r = size * 0.07
    d.ellipse([cx - leaf_r*1.6, cy - body_r - leaf_r*0.6, cx, cy - body_r + leaf_r*0.6], fill=(159, 207, 174, 255))
    d.ellipse([cx, cy - body_r - leaf_r*0.6, cx + leaf_r*1.6, cy - body_r + leaf_r*0.6], fill=(200, 230, 208, 255))

    # visage crème
    face_r = body_r * 0.72
    d.ellipse([cx - face_r, cy - face_r*0.9, cx + face_r, cy + face_r*0.95], fill=(255, 253, 249, 255))

    # yeux
    eye_r = size * 0.018
    for dx in (-1, 1):
        ex = cx + dx * size * 0.07
        ey = cy - size * 0.01
        d.ellipse([ex-eye_r, ey-eye_r, ex+eye_r, ey+eye_r], fill=(107, 74, 85, 255))

    # joues
    cheek_r = size * 0.028
    for dx in (-1, 1):
        ex = cx + dx * size * 0.13
        ey = cy + size * 0.015
        d.ellipse([ex-cheek_r, ey-cheek_r*0.7, ex+cheek_r, ey+cheek_r*0.7], fill=(255, 182, 201, 180))

    img.save(path)

make_icon(192, False, "/home/claude/strawbunny/public/icons/icon-192.png")
make_icon(512, False, "/home/claude/strawbunny/public/icons/icon-512.png")
make_icon(512, True, "/home/claude/strawbunny/public/icons/icon-maskable-512.png")
print("done")
