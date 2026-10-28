import sys
from PIL import Image, ImageDraw, ImageFont
f=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',20)
out, cols, w, h, *files = sys.argv[1:]; cols, w, h = int(cols), int(w), int(h)
rows=(len(files)+cols-1)//cols; pad=16; top=30
s=Image.new('RGB',(cols*(w+pad)+pad,rows*(h+top+pad)),'#151515'); d=ImageDraw.Draw(s)
for i,fn in enumerate(files):
    im=Image.open(fn).resize((w,h)); x=pad+(i%cols)*(w+pad); y=(i//cols)*(h+top+pad)+top
    s.paste(im,(x,y)); d.text((x,y-24),fn.replace('.png',''),fill='#D2B48A',font=f)
s.save(out,quality=85)
