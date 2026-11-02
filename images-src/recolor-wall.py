# EDU PROMPT 28: recolour only the sand wall of a lane photo, keeping its light and shadow (his shadow stays, recoloured).
# Sources: images-src/lane-<lane>-sand-original.webp (TRT, Weight) or lane-<lane>-original.webp (other lanes). Masks: images-src/masks/, made with rembg
# (isnet-general-use for the man and every object, birefnet-portrait for his outline). Output: images-src/<lane>-recolor.png,
# then saved as public/images/photos/lane-<lane>.jpg (JPEG quality 80, 1536x1024, no metadata).
# Usage (needs numpy, opencv-python-headless, pillow): python3 images-src/recolor-wall.py <lane> <hex> <band px>
#   trt: python3 images-src/recolor-wall.py trt '#5D6F82' 2      weight: python3 images-src/recolor-wall.py weight '#5B5E3A' 5
#   energy (wall lightened slightly for contrast): python3 images-src/recolor-wall.py energy '#CD8527' 5
import sys, numpy as np, cv2
from PIL import Image
import os
HERE = os.path.dirname(os.path.abspath(__file__))
D = os.path.join(HERE, 'masks') + '/'
OUT = HERE + '/'
SRC = {'trt': os.path.join(HERE, 'lane-trt-sand-original.webp'), 'weight': os.path.join(HERE, 'lane-weight-sand-original.webp')}
lane, hexc = sys.argv[1], sys.argv[2]
if lane not in SRC: SRC[lane] = os.path.join(HERE, f'lane-{lane}-original.webp')   # EDU PROMPT 30: other lanes
BAND = int(sys.argv[3]) if len(sys.argv) > 3 else 5
img = np.asarray(Image.open(SRC[lane]).convert('RGB')).astype(np.float32) / 255
H, W, _ = img.shape
lin = lambda c: np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
srgb = lambda c: np.where(c <= 0.0031308, c * 12.92, 1.055 * np.clip(c, 0, None) ** (1 / 2.4) - 0.055)
L = lin(img)
m1 = np.asarray(Image.open(D + f'mask-{lane}-isnet-general-use.png')).astype(np.float32) / 255
m2 = np.asarray(Image.open(D + f'mask-{lane}-birefnet-portrait.png')).astype(np.float32) / 255
fg = np.maximum(m1, m2)
fg = np.clip((fg - 0.04) / 0.92, 0, 1)            # drop faint mask haze over the wall
# Wall zone: everything above the table top (TRT); the whole frame (Weight).
zone = np.ones((H, W), np.float32)
if lane == 'trt':
    # The table top is a straight edge at y = 877 (measured at both ends of the frame); the wall stops 2px above it.
    yy = np.arange(H)[:, None]
    zone = np.repeat(np.clip((875 - yy) / 3.0, 0, 1), W, axis=1).astype(np.float32)
wall = (1 - fg) * zone
# Local wall colour B (linear), filled under the foreground by normalised convolution at a few scales.
known = ((fg < 0.02) & (zone > 0.99)).astype(np.float32)
B = np.zeros_like(L); have = np.zeros((H, W), np.float32)
for sig in (6, 18, 50, 140):
    num = cv2.GaussianBlur(L * known[..., None], (0, 0), sig); den = cv2.GaussianBlur(known, (0, 0), sig)
    est = num / np.maximum(den, 1e-6)[..., None]
    take = (den > 0.05) & (have < 0.5)
    B[take] = est[take]; have[take] = 1
# Where the wall is seen clearly, its own pixel is the wall colour (keeps every shadow edge sharp, no halo).
B[known > 0] = L[known > 0]
# Edge band (a few px around the man's outline, from the portrait mask): decide by hue. A pixel with the wall's sand hue
# is wall, or a mix of wall and something dark, and is recoloured at its own lightness; skin and other colours keep the
# mask; near-neutral pixels (black shirt, white notice) keep the mask too.
def lab(c):
    X = c @ np.array([[0.4124, 0.2126, 0.0193], [0.3576, 0.7152, 0.1192], [0.1805, 0.0722, 0.9505]], np.float32)
    X = X / np.array([0.9505, 1.0, 1.089], np.float32)
    f = np.where(X > 0.008856, np.cbrt(X), 7.787 * X + 16 / 116)
    return 116 * f[..., 1] - 16, 500 * (f[..., 0] - f[..., 1]), 200 * (f[..., 1] - f[..., 2])
Lc, ac, bc = lab(L)
hue = np.degrees(np.arctan2(bc, ac)); chroma = np.hypot(ac, bc)
known0 = (fg < 0.02) & (zone > 0.99)
h_s = float(np.median(hue[known0]))
solid = (m2 > 0.5).astype(np.uint8)
k = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * BAND + 1, 2 * BAND + 1))
band = (cv2.dilate(solid, k) - cv2.erode(solid, k)).astype(bool)
dh = np.abs((hue - h_s + 180) % 360 - 180)
w_hue = np.clip((28 - dh) / 15, 0, 1) * np.clip((chroma - 3) / 3, 0, 1)
wall = (1 - fg)
kn0 = known0.astype(np.float32)
ysm0 = cv2.GaussianBlur((0.2126 * L[..., 0] + 0.7152 * L[..., 1] + 0.0722 * L[..., 2]) * kn0, (0, 0), 10) / np.maximum(cv2.GaussianBlur(kn0, (0, 0), 10), 1e-6)
glow = band & (0.2126 * L[..., 0] + 0.7152 * L[..., 1] + 0.0722 * L[..., 2] > ysm0 * 1.02) & (dh < 30)
if BAND > 0:
    wall[band] = np.where(chroma[band] > 6, w_hue[band], wall[band])
    wall[glow] = 1.0                 # the thin bright glow at his outline is lit wall
if BAND > 0:
    wm = cv2.medianBlur((wall * 255).astype(np.uint8), 3).astype(np.float32) / 255
    wall[band] = wm[band]          # clear single stray pixels in the edge band
wall = cv2.GaussianBlur(wall, (0, 0), 0.5) * zone
print('sand hue', round(h_s, 1))
# Lightness mapping onto the new colour.
Y = lambda a: 0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]
yb = Y(B); yref = np.median(Y(L)[known > 0])
T = lin(np.array([int(hexc[i:i + 2], 16) for i in (1, 3, 5)], np.float32) / 255)
Bnew = T[None, None, :] * (yb / yref)[..., None]
# Edge band: map each pixel from its own lightness (its dark part stays dark, its sand part becomes the new colour).
yl = Y(L)
# Near his outline, no pixel may map brighter than the wall around it: the thin bright glow at the ear and hair edge
# would otherwise turn into a light rim on the new colour.
ring = cv2.dilate((m2 > 0.5).astype(np.uint8), cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (13, 13))).astype(bool) & ~(m2 > 0.98)
kn = known.astype(np.float32)
ysm = cv2.GaussianBlur(Y(L) * kn, (0, 0), 10) / np.maximum(cv2.GaussianBlur(kn, (0, 0), 10), 1e-6)
yl = np.where(ring, np.minimum(yl, ysm * 1.01), yl)
Pnew = T[None, None, :] * (yl / yref)[..., None]
out = L + wall[..., None] * (Pnew - L)
res = np.clip(srgb(np.clip(out, 0, 1)) * 255 + 0.5, 0, 255).astype(np.uint8)
Image.fromarray(res).save(OUT + f'{lane}-recolor.png')
print(lane, 'wall ref luminance', round(float(yref), 3), 'wall share', round(float((wall > 0.5).mean()), 3))
