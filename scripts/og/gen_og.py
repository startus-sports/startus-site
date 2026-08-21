# -*- coding: utf-8 -*-
"""OGP画像を headless Chrome で生成して public/og/ に置く。

ImageResponse(satori) は日本語フォントのバイナリを自前で用意する必要があり
ビルド時のネットワークに依存するため、実ブラウザでレンダリングした
静的PNGを置く方式にした。フォントの心配がなく、実行時のリスクもゼロ。
"""
import os, subprocess, urllib.parse, time

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
SCRATCH = os.path.dirname(os.path.abspath(__file__))
TEMPLATE = os.path.join(SCRATCH, 'og_template.html').replace('\\', '/')
OUT_DIR = (r"c:\Users\hisas\OneDrive - 特定非営利活動法人かなざわ総合スポーツクラブ"
           r"\2 AI-document-onedrive\startus-site\startus-site\public\og")
os.makedirs(OUT_DIR, exist_ok=True)

# name, title(HTMLタグ可), lead, facts(| 区切り), cta
CARDS = [
    ('default',
     '金沢で、<span class="hl">スポーツを始めよう</span>。',
     'かけっこ・陸上・バドミントン・チアなど約30教室。',
     '市内11会場|週6日開催|月額¥3,300〜', '無料体験受付中'),

    ('rikujo',
     '金沢の<span class="hl">陸上・かけっこ教室</span>',
     'かけっこ塾からジュニア陸上・マラソン塾まで16教室。',
     '市内5会場|週6日開催|年長〜大人', '無料体験受付中'),

    ('class-badminton',
     '金沢の<span class="hl">バドミントン教室</span>',
     'ジュニア・ビギナー・親子の4クラス。初めてでも大丈夫。',
     '高尾台中・扇台小|木/土/日|月額¥6,600', '無料体験受付中'),

    ('class-tennis',
     '金沢の<span class="hl">ジュニアテニス教室</span>',
     '屋内コートだから、雨でも雪でも中止になりません。',
     '屋内コート|毎週水曜|小学生〜中学生', '無料体験受付中'),

    ('class-dance',
     '金沢の<span class="hl">バレエ・ダンス・チア教室</span>',
     'バレエ・ヒップホップ・チア・ダンスの5クラス。年中から。',
     '金沢市総合体育館ほか|火/水/金|月額¥6,600', '無料体験受付中'),

    ('class-kinball',
     '金沢の<span class="hl">キンボールスポーツ教室</span>',
     '大きなボールを使う、運動が得意でなくても楽しめる競技。',
     '高尾台中学校|毎週日曜|月額¥4,100', '無料体験受付中'),

    ('class-skating',
     '金沢の<span class="hl">アイススケート教室</span>',
     '石川県スケート連盟の指導員が、立ち方から教えます。',
     '通年開催|毎週土曜午前|小学生以上', '見学・相談受付中'),
]


def render(name, title, lead, facts, cta):
    q = urllib.parse.urlencode({'t': title, 'd': lead, 'f': facts, 'c': cta})
    url = f'file:///{TEMPLATE}?{q}'
    out = os.path.join(OUT_DIR, f'{name}.png')
    subprocess.run([
        CHROME, '--headless', '--no-sandbox', '--disable-gpu',
        r'--user-data-dir=C:\Users\hisas\AppData\Local\Temp\claude\chromeprof',
        f'--screenshot={out}', '--window-size=1200,630', '--hide-scrollbars',
        '--virtual-time-budget=6000', url,
    ], capture_output=True)
    from PIL import Image
    jpg = out[:-4] + '.jpg'
    Image.open(out).convert('RGB').save(jpg, 'JPEG', quality=88, optimize=True)
    os.remove(out)
    print(f'{name:20} {os.path.getsize(jpg):>8,} bytes (jpg)')


for c in CARDS:
    render(*c)
print('\n出力先:', OUT_DIR)
