Hero video media guidelines

Target sizes:
- 1080p hero loop (5-10s): ~3-8 MB
- Optional 720p/mobile variant: ~1.5-4 MB

Delivery requirements:
- Primary: MP4 (H.264), `video/mp4`
- Optional secondary: WebM (`video/webm`)
- Pixel format: `yuv420p` for broad device support
- Enable fast start: `-movflags +faststart` (moves moov atom to file start)
- Keep loops subtle and avoid aggressive camera motion

Encoding commands:

```bash
# 1) Safe MP4 for iOS Safari + desktop
ffmpeg -i input.mov \
  -an -c:v libx264 -profile:v main -level 4.0 -pix_fmt yuv420p \
  -movflags +faststart -vf "scale=1920:-2,fps=30" \
  -preset medium -crf 22 -maxrate 6M -bufsize 12M \
  public/media/hero-loop.mp4

# 2) Optimized smaller MP4 for web delivery
ffmpeg -i input.mov \
  -an -c:v libx264 -profile:v high -level 4.1 -pix_fmt yuv420p \
  -movflags +faststart -vf "scale=1280:-2,fps=24" \
  -preset slow -crf 24 -maxrate 3M -bufsize 6M \
  public/media/hero-loop-mobile.mp4

# 3) Optional WebM companion source
ffmpeg -i input.mov \
  -an -c:v libvpx-vp9 -pix_fmt yuv420p -row-mt 1 \
  -vf "scale=1920:-2,fps=24" -b:v 0 -crf 33 \
  public/media/hero-loop.webm

# 4) Poster extraction from first frame (JPG)
ffmpeg -i input.mov -vf "select=eq(n\\,0),scale=1920:-2" -vframes 1 -q:v 2 \
  public/images/hero-poster.jpg
```
