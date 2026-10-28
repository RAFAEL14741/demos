import numpy as np, os, glob, json
from PIL import Image
SRC='/tmp/claude-0/-home-claude/51f05ef2-d8e0-5457-9b7a-e199aa7e5b6b/scratchpad/SETS/'
OUT='/home/claude/demos/fma-rebrand/img/k/'
def grade(im):
    a=np.asarray(im).astype(np.float32)/255
    lo=np.percentile(a,0.5,axis=(0,1)).mean(); hi=np.percentile(a,99.5,axis=(0,1)).mean()
    a=np.clip((a-lo)/max(hi-lo,.5),0,1)*np.array([1.018,1.0,.965])
    a=np.clip(a,0,1)**np.array([.98,1,1.02])
    return Image.fromarray((np.clip(a,0,1)*255+.5).astype(np.uint8))
info={}
for d in sorted(os.listdir(SRC)):
    fs=sorted(glob.glob(SRC+d+'/*.jpg')); info[d]=len(fs)
    for i,f in enumerate(fs,1):
        im=grade(Image.open(f).convert('RGB')); W,H=im.size
        # gallery: 4:3 cover crop
        if W/H>4/3: w=round(H*4/3); x=(W-w)//2; g=im.crop((x,0,x+w,H))
        else: h=round(W*3/4); y=(H-h)//2; g=im.crop((0,y,W,y+h))
        for s in (720,1200): g.resize((s,round(s*.75)),Image.LANCZOS).save(f'{OUT}{d}-{i}-{s}.jpg',quality=78,optimize=True,progressive=True)
        if i==1:
            if W/H>.8: w=round(H*.8); x=(W-w)//2; c=im.crop((x,0,x+w,H))
            else: h=round(W/.8); y=(H-h)//2; c=im.crop((0,y,W,y+h))
            for s in (480,800): c.resize((s,round(s*1.25)),Image.LANCZOS).save(f'{OUT}{d}-c-{s}.jpg',quality=80,optimize=True,progressive=True)
print(json.dumps(info))
