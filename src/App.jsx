import React, { useEffect, useRef, useState } from 'react'
import {
  Activity,
  AlertCircle,
  ArrowRight,
  Bot,
  ExternalLink,
  FileText,
  Flag,
  Image as ImageIcon,
  Info,
  Layers,
  Lock,
  Mail,
  Share2,
  Shield,
  Sparkles,
  UserX,
  X,
} from 'lucide-react'

const SUPPORT_EMAIL = 'zry19950621@gmail.com'
const MODERATION_EMAIL = 'zry19950621@gmail.com'
const PRIVACY_EMAIL = 'zry19950621@gmail.com'

const UPLOAD_COPY = {
  shortEn: 'Upload only your own portrait, or imagery you are expressly authorized to use.',
  shortCn: '仅可上传本人照片，或您已获得明确合法授权使用的图片。',
  compact:
    'No celebrity, runway, editorial, screenshot, or third-party copyrighted content. / 禁止上传明星、秀场、杂志、截图或未经授权的第三方版权内容。',
  disclosureTitleEn: 'Usage & Rights',
  disclosureTitleCn: '使用与权利',
  bilingualBody: [
    {
      en: 'Use self-portraits or images you fully control. If a person appears in the image, you should have their permission where required.',
      cn: '请上传您本人照片或您拥有完整使用权的图片；若图片涉及他人，请在适用情况下取得对方许可。',
    },
    {
      en: 'Do not upload celebrities, public figures, runway imagery, editorial or magazine images, screenshots, or copyrighted third-party material.',
      cn: '请勿上传明星、公众人物、秀场图、杂志图、编辑图、截图，或任何受版权保护的第三方内容。',
    },
    {
      en: 'Draftelier AI may remove, restrict, or decline content that appears unauthorized, unsafe, infringing, deceptive, or policy-violating.',
      cn: '对于疑似未经授权、不安全、侵权、误导性或违反平台规则的内容，Draftelier AI 有权删除、限制或拒绝处理。',
    },
  ],
}

const AI_DISCLOSURE_COPY = {
  bannerEn:
    'AI-stylized output. Draftelier creates editorial interpretations, not official brand or designer works.',
  bannerCn: 'AI 风格化生成。Draftelier 输出的是编辑化演绎，并非任何品牌或设计师的官方作品。',
  footnoteEn:
    'Generated with AI as a stylistic interpretation. Not affiliated with, endorsed by, or produced in collaboration with any brand, fashion house, or designer.',
  footnoteCn:
    '本结果由 AI 进行风格化演绎生成，不隶属于、未获背书，也不代表与任何品牌、时装屋或设计师存在合作关系。',
  formalEn:
    'Draftelier AI provides AI-generated and AI-stylized visual interpretations. Outputs are not official works, licensed products, endorsements, or collaborations of any brand, fashion house, designer, estate, or rights holder, and should be understood as independent editorial-style renderings.',
}

const LEGAL_PANELS = {
  transparency: {
    title: 'AI Disclosure',
    subtitle: '生成说明 / AI transparency',
    sections: [
      { heading: 'Short banner', body: [AI_DISCLOSURE_COPY.bannerEn, AI_DISCLOSURE_COPY.bannerCn] },
      { heading: 'Result footnote', body: [AI_DISCLOSURE_COPY.footnoteEn, AI_DISCLOSURE_COPY.footnoteCn] },
      { heading: 'Formal wording', body: [AI_DISCLOSURE_COPY.formalEn] },
    ],
  },
  terms: {
    title: 'Terms of Use',
    subtitle: 'Early web / app version',
    sections: [
      {
        heading: 'User Content',
        body: [
          'You may submit photos, prompts, and related materials (“User Content”) only if you own them or have all rights and permissions needed to use and submit them.',
          'If another person appears in an uploaded image, you are responsible for obtaining any permissions, consents, or releases that may be required.',
        ],
      },
      {
        heading: 'User Responsibility',
        body: [
          'You are responsible for the legality, accuracy, and permissions of all content you upload, generate, export, or share through Draftelier AI.',
          'You agree not to use the service in a way that is deceptive, unlawful, infringing, harassing, harmful, or misleading.',
        ],
      },
      {
        heading: 'Prohibited Uploads',
        body: [
          'Do not upload celebrities, public figures, runway imagery, editorial or magazine images, screenshots, copyrighted third-party content, non-consensual images, illegal material, or content that violates the rights of others.',
          'We may remove, restrict, or refuse content that appears unauthorized, unsafe, unlawful, or inconsistent with these Terms.',
        ],
      },
      {
        heading: 'AI-Generated Output',
        body: [
          'Draftelier AI provides AI-generated and AI-stylized outputs intended as independent editorial-style interpretations.',
          'Outputs are not official works of any brand, designer, fashion house, or rights holder, and must not be presented as affiliated with, endorsed by, or produced in collaboration with them.',
        ],
      },
      {
        heading: 'Intellectual Property',
        body: [
          'The Draftelier AI service, interface, brand assets, and original site materials are owned by Draftelier AI or its licensors.',
          'You retain rights you may have in your own User Content, subject to the limited rights required for us to operate, secure, review, and improve the service.',
        ],
      },
      {
        heading: 'Takedown / Removal',
        body: [
          'We reserve the right to remove, restrict, review, suspend, or disable access to content or accounts where we reasonably believe there is infringement, abuse, unsafe conduct, or policy violation.',
          `For takedown or moderation requests, contact ${MODERATION_EMAIL}.`,
        ],
      },
      {
        heading: 'Limitation of Liability',
        body: [
          'The service is provided on an “as is” and “as available” basis to the extent permitted by law.',
          'We are not responsible for how users upload, share, republish, or misuse generated outputs outside the service.',
        ],
      },
      {
        heading: 'Contact',
        body: [
          `General support: ${SUPPORT_EMAIL}`,
          `Privacy requests: ${PRIVACY_EMAIL}`,
          `Moderation / takedown: ${MODERATION_EMAIL}`,
        ],
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'Short-form web / app disclosure',
    sections: [
      {
        heading: 'What We Collect',
        body: [
          'We may collect uploaded photos, generated images, email or login information, device/browser metadata, usage events, and service diagnostics.',
          'If analytics or crash tools are enabled, they may collect interaction, device, and performance data according to their own configurations.',
        ],
      },
      {
        heading: 'How Uploads Are Used',
        body: [
          'Uploaded images are used to create AI-generated sketches, editorial posters, and related outputs requested by the user.',
          'We may also process uploads for abuse prevention, troubleshooting, moderation review, and service quality monitoring.',
        ],
      },
      {
        heading: 'Storage of Outputs',
        body: [
          'Whether uploads or generated outputs are stored, cached, or deleted depends on the current product configuration, hosting setup, and moderation needs.',
          'If you deploy this product with cloud storage, image retention, or analytics, update this policy and your App Store disclosures accordingly.',
        ],
      },
      {
        heading: 'Logs, Analytics, and Cookies',
        body: [
          'We may use cookies, local storage, logs, and analytics tools to keep the service working, remember preferences, measure usage, detect abuse, and improve performance.',
          'If third-party analytics are enabled, their handling of data is subject to their own terms and privacy policies.',
        ],
      },
      {
        heading: 'Third-Party Services',
        body: [
          'The service may rely on third-party cloud, AI generation, hosting, authentication, storage, analytics, email, or support providers.',
          'These providers may process data on our behalf as needed to operate the service.',
        ],
      },
      {
        heading: 'Deletion and Contact',
        body: [
          `To request deletion, review, or removal of uploaded or generated content, contact ${PRIVACY_EMAIL} or ${MODERATION_EMAIL}.`,
          'We may ask for information needed to verify the request and locate the relevant content.',
        ],
      },
      {
        heading: 'International Users',
        body: [
          'If you access the service from outside the country where it is operated, your information may be processed in other jurisdictions where we or our service providers operate.',
          'By using the service, you acknowledge such transfers where permitted by applicable law.',
        ],
      },
    ],
  },
  policy: {
    title: 'Objectionable Content Policy',
    subtitle: 'UGC / App Store readiness',
    sections: [
      {
        heading: 'What is not allowed',
        body: [
          'Non-consensual intimate imagery, harassment, hateful content, illegal content, child sexual abuse material, deceptive impersonation, violent extremism, and infringing or unauthorized image uploads are prohibited.',
          'Celebrities, public figures, editorial imagery, runway images, screenshots, and copyrighted third-party assets are not permitted without clear authorization.',
        ],
      },
      {
        heading: 'Moderation Actions',
        body: [
          'We may review, remove, restrict, block, or report content or accounts that appear to violate this policy or applicable law.',
          'Repeat or severe violations may result in permanent access restrictions.',
        ],
      },
      {
        heading: 'How to report',
        body: [
          'Use the in-product report entry where available, or contact our moderation team directly.',
          `Moderation / takedown contact: ${MODERATION_EMAIL}`,
        ],
      },
    ],
  },
  support: {
    title: 'Support & Safety',
    subtitle: 'Contact / moderation / future community tools',
    sections: [
      {
        heading: 'Contact Support',
        body: [`General support: ${SUPPORT_EMAIL}`, `Privacy requests: ${PRIVACY_EMAIL}`],
      },
      {
        heading: 'Report Content',
        body: [
          'If you believe content is infringing, unsafe, non-consensual, or otherwise objectionable, contact our moderation channel for review.',
          `Report / takedown: ${MODERATION_EMAIL}`,
        ],
      },
      {
        heading: 'Block User (Reserved)',
        body: [
          'If public profiles, feeds, or community sharing are added in a future release, user blocking and creator-level restrictions will appear here.',
          'This placeholder is included to support future UGC safety requirements.',
        ],
      },
    ],
  },
}

const GITHUB_LORA_REPO = 'zry19950621-star/fashionmarker-ai'
const GITHUB_LORA_REF = 'main'
const GITHUB_LORA_ROOT = 'training-runs'
const GITHUB_LORA_BASE = `https://raw.githubusercontent.com/${GITHUB_LORA_REPO}/${GITHUB_LORA_REF}/training-runs`

function buildLoraWeightPath(loraRun) {
  return loraRun ? `${GITHUB_LORA_ROOT}/${encodeURIComponent(loraRun)}/pytorch_lora_weights.safetensors` : null
}

function buildLoraWeightUrl(loraWeightPath) {
  return loraWeightPath ? `${GITHUB_LORA_BASE}/${loraWeightPath.split('/').slice(1).join('/')}` : null
}

function buildLoraWeightGithubUrl(loraWeightPath) {
  return loraWeightPath ? `https://github.com/${GITHUB_LORA_REPO}/blob/${GITHUB_LORA_REF}/${loraWeightPath}` : null
}

function buildLoraWeightContentsUrl(loraWeightPath) {
  return loraWeightPath
    ? `https://api.github.com/repos/${GITHUB_LORA_REPO}/contents/${loraWeightPath}?ref=${GITHUB_LORA_REF}`
    : null
}

const RAW_STYLES = [
  {
    id: 'dior',
    name: 'Parisian Couture',
    cnName: '巴黎高定轮廓',
    tag: 'PARISIAN COUTURE · 巴黎高定轮廓',
    lineageEn: 'Echoes the visual language of Christian Dior.',
    lineageCn: '灵感谱系向 Christian Dior 的高定语言致意。',
    enDesc: 'Soft graphite lines, poised structure, and polished couture restraint.',
    editorialDesc: 'Delicate pencil construction and sheer watercolor softness with refined couture balance.',
    trainingStyle: 'paris_new_look',
    loraReady: true,
    loraRun: 'paris-new-look-dior-pinterest-batch2',
    prompt:
      'Masterpiece Parisian haute couture fashion illustration. Medium: highly expressive, delicate graphite pencil construction lines with a translucent, soft watercolor wash. Focus on poised hourglass silhouette, sweeping elegant curves, and polished vintage archival sketching techniques. Authentic 1950s atelier drawing style, elegant and effortless on a clean paper ground.',
  },
  {
    id: 'balenciaga',
    name: 'Sculptural Elegance',
    cnName: '建构优雅',
    tag: 'SCULPTURAL ELEGANCE · 建构优雅',
    lineageEn: 'Inspired by the sculptural discipline of Cristobal Balenciaga.',
    lineageCn: '灵感谱系借鉴 Cristobal Balenciaga 的雕塑式剪裁语汇。',
    enDesc: 'Measured contours, sculpted volume, and quiet atelier precision.',
    editorialDesc: 'Restrained graphite contours and cool gouache shading create a sculpted editorial page.',
    trainingStyle: 'architectural_volume',
    loraReady: true,
    loraRun: 'architectural-volume-balenciaga-batch2',
    prompt:
      'Masterpiece sculptural atelier fashion illustration. Medium: cool, precise graphite contour lines with restrained, flat gouache wash. Focus on architectural volume, minimalist structural tailoring cues, clean bold negative space, and disciplined fashion croquis techniques. Cerebral and structured.',
  },
  {
    id: 'schiaparelli',
    name: 'Surreal Ornament',
    cnName: '超现实华饰',
    tag: 'SURREAL ORNAMENT · 超现实华饰',
    lineageEn: 'Echoes the surreal wit associated with Elsa Schiaparelli.',
    lineageCn: '灵感谱系呼应 Elsa Schiaparelli 式超现实装饰张力。',
    enDesc: 'Ink contrast and luminous accents with poetic surreal tension.',
    editorialDesc: 'Sharp black linework and luminous metallic accents create a vivid surreal editorial mood.',
    trainingStyle: 'surreal_gold',
    loraReady: true,
    loraRun: 'surreal-gold-schiaparelli-batch3-fast',
    prompt:
      "Masterpiece surreal ornament fashion illustration. Medium: sharp, aggressive black India ink outlines clashing with striking, luminous metallic gold leaf accents. Eccentric drafting gestures, trompe l'oeil details, poetic surreal tension, avant-garde couture energy, bold and dramatic.",
  },
  {
    id: 'chanel',
    name: 'Modern Croquis',
    cnName: '现代速写气场',
    tag: 'MODERN CROQUIS · 现代速写气场',
    lineageEn: 'Carries the brisk editorial cadence often linked to Karl Lagerfeld.',
    lineageCn: '灵感谱系带有 Karl Lagerfeld 式利落速写与编辑感节奏。',
    enDesc: 'Rapid strokes, backstage energy, and unfinished confidence.',
    editorialDesc: 'Aggressive marker movement and crisp highlights preserve the pulse of a live editorial fitting.',
    trainingStyle: 'modern_croquis',
    loraReady: true,
    loraRun: 'modern-croquis-karl-pinterest-batch4',
    prompt:
      'Masterpiece modern croquis fashion illustration. Medium: rapid, thick black marker strokes, pastel smudges, and dynamic white correction-fluid (Tipp-Ex) highlights. Fast backstage editorial energy, high contrast, intentional messy unfinished sketch feel, spontaneous and chic.',
  },
  {
    id: 'mugler',
    name: 'Futurist Glamour',
    cnName: '未来戏剧感',
    tag: 'FUTURIST GLAMOUR · 未来戏剧感',
    lineageEn: 'Inspired by the theatrical futurism of Thierry Mugler.',
    lineageCn: '灵感谱系向 Thierry Mugler 的未来戏剧性轮廓致意。',
    enDesc: 'Sharp contrast, engineered detail, and bold editorial intensity.',
    editorialDesc: 'Knife-sharp linework and glossy accents push the image toward a futuristic couture spectacle.',
    trainingStyle: 'insect_power',
    loraReady: true,
    loraRun: 'insect-power-second-batch-mugler-v2',
    prompt:
      'Masterpiece futurist glamour fashion illustration. Medium: knife-sharp fineliner contour lines, high-contrast flat marker shading, glossy reflective highlights. Hyper-exaggerated hourglass proportions, engineered structural detail, dramatic runway-scale tension, cyborg and insectoid motifs.',
  },
  {
    id: 'galliano',
    name: 'Baroque Narrative',
    cnName: '华丽叙事',
    tag: 'BAROQUE NARRATIVE · 华丽叙事',
    lineageEn: 'Echoes the romantic pageantry associated with John Galliano.',
    lineageCn: '灵感谱系呼应 John Galliano 式浪漫而华丽的叙事能量。',
    enDesc: 'Opulent layering, romantic movement, and couture theatrics in motion.',
    editorialDesc: 'Rich wash, embellished notation, and romantic linework turn the page into a lavish fashion story.',
    trainingStyle: 'baroque_narrative',
    loraReady: true,
    loraRun: 'baroque-narrative-galliano-pinterest-batch4',
    prompt:
      'Masterpiece baroque narrative fashion illustration. Medium: expressive, swirling ink linework, lavish and opulent watercolor layering, embellished historical dressmaking annotations, and romantic theatrical movement. Chaotic beauty, dramatic narrative, raw and passionate edge.',
  },
  {
    id: 'gaultier',
    name: 'Corset Cabaret',
    cnName: '紧身华宴',
    tag: 'CORSET CABARET · 紧身华宴',
    lineageEn: "Carries hints of Jean Paul Gaultier's body-conscious irreverence.",
    lineageCn: '灵感谱系带有 Jean Paul Gaultier 式身体意识与戏谑精神。',
    enDesc: 'Sinuous lines, corseted structure, and decadent performance flair.',
    editorialDesc: 'Tattoo-like contour and corseted notation create a theatrical, body-conscious editorial page.',
    trainingStyle: 'corset_cabaret',
    loraReady: true,
    loraRun: 'corset-cabaret-gaultier-batch4',
    prompt:
      'Masterpiece corset cabaret fashion illustration. Medium: precise tattoo-like black contour lines, intricate ballpoint pen corsetry seam notation. Body-conscious proportions, performance styling cues, decadent editorial tension, subversive and playful sensuality.',
  },
  {
    id: 'westwood',
    name: 'Punk Aristocracy',
    cnName: '朋克宫廷',
    tag: 'PUNK ARISTOCRACY · 朋克宫廷',
    lineageEn: 'Inspired by the rebellious historicism of Vivienne Westwood.',
    lineageCn: '灵感谱系借鉴 Vivienne Westwood 式叛逆历史感与宫廷错位。',
    enDesc: 'Disrupted tailoring, rebellious linework, and historical attitude re-cut.',
    editorialDesc: 'Anarchic pen gestures and subverted drape logic create a rebellious salon mood.',
    trainingStyle: 'punk_rococo',
    loraReady: true,
    loraRun: 'punk-rococo-westwood-batch4',
    prompt:
      'Masterpiece punk aristocracy fashion illustration. Medium: anarchic biro ballpoint pen and sketchy ink lines, collage-like color blocking. Disrupted historic drape, subverted tailoring (tartan and tweed notes), rebellious raw editorial attitude, DIY punk aesthetic.',
  },
  {
    id: 'maison_margiela',
    name: 'Deconstructed Modern',
    cnName: '解构现代',
    tag: 'DECONSTRUCTED MODERN · 解构现代',
    lineageEn: 'Echoes the quiet deconstruction associated with Martin Margiela.',
    lineageCn: '灵感谱系呼应 Martin Margiela 式克制而静默的解构语言。',
    enDesc: 'Faint traces, erased edges, and artisanal restraint.',
    editorialDesc: 'Light graphite residue and washed archive texture keep the page quiet, cerebral, and spare.',
    trainingStyle: 'artisanal_deconstruction',
    loraReady: false,
    loraRun: 'artisanal-deconstruction-margiela-batch1',
    prompt:
      'Masterpiece deconstructed modern fashion study. Medium: extremely faint, ghostly graphite outlines, deliberately erased construction marks, sparse pattern-study tailor notation and basting stitches, grayscale xerox-like texture. Quiet radical artisanal restraint, anonymous and cerebral beauty.',
  },
  {
    id: 'iris_van_herpen',
    name: 'Bionic Motion',
    cnName: '仿生流线',
    tag: 'BIONIC MOTION · 仿生流线',
    lineageEn: 'Inspired by the kinetic geometry of Iris van Herpen.',
    lineageCn: '灵感谱系向 Iris van Herpen 的动态几何与仿生结构致意。',
    enDesc: 'Technical geometry with kinetic, near-organic movement.',
    editorialDesc: 'Meticulous fineliner structure and wireframe rhythm create a futuristic, almost living silhouette.',
    trainingStyle: 'bionic_couture',
    loraReady: true,
    loraRun: 'bionic-couture-iris-batch3',
    prompt:
      'Masterpiece bionic motion fashion illustration. Medium: meticulous, ultra-fine technical drafting pen lines, complex living wireframe grids. Kinetic organic movement, 3D parametric geometry, translucent synthetic layers, clean blueprint-like page, avant-garde techno-couture.',
  },
  {
    id: 'issey_miyake',
    name: 'Pleated Velocity',
    cnName: '褶裥动势',
    tag: 'PLEATED VELOCITY · 褶裥动势',
    lineageEn: "Carries echoes of Issey Miyake's pleated movement studies.",
    lineageCn: '灵感谱系带有 Issey Miyake 式褶裥研究与轻盈动势。',
    enDesc: 'Pleat logic, airy motion, and sculpted lightness.',
    editorialDesc: 'Fold studies and luminous movement cues keep the drawing fluid, technical, and weightless.',
    trainingStyle: 'pleated_motion',
    loraReady: true,
    loraRun: 'pleated-motion-issey-batch4',
    prompt:
      'Masterpiece pleated velocity fashion illustration. Medium: airy and sweeping graphite lines, precise micro-pleat notation, complex origami fold logic, fluid watercolor washes. Showcasing sculptural and minimal weightlessness, dynamic kinetic energy in the fabric.',
  },
  {
    id: 'courreges',
    name: 'Space Age Precision',
    cnName: '太空几何',
    tag: 'SPACE AGE PRECISION · 太空几何',
    lineageEn: 'Inspired by the optimistic futurism of Andre Courreges.',
    lineageCn: '灵感谱系借鉴 Andre Courreges 式乐观太空未来主义。',
    enDesc: 'Crisp lines, optical white space, and mod futurism.',
    editorialDesc: 'Geometric strokes and disciplined white-space control create a polished future-facing page.',
    trainingStyle: 'space_age_clean',
    loraReady: true,
    loraRun: 'space-age-courreges-pinterest-batch4',
    prompt:
      'Masterpiece space age precision fashion illustration. Medium: crisp, ruler-straight geometric ink lines, minimal flat vector-like marker wash, vast optical white space. Highly polished 1960s mod-futurist drafting, optimistic retro-future, immaculate A-line geometry.',
  },
  {
    id: 'rabanne',
    name: 'Metallic Modularism',
    cnName: '金属模块',
    tag: 'METALLIC MODULARISM · 金属模块',
    lineageEn: 'Echoes the industrial modularity associated with Paco Rabanne.',
    lineageCn: '灵感谱系呼应 Paco Rabanne 式工业金属与模块化结构。',
    enDesc: 'Reflective edges, modular construction, and industrial couture clarity.',
    editorialDesc: 'Reflective accents and assembly cues bring hard-edged precision to the editorial silhouette.',
    trainingStyle: 'metal_modular',
    loraReady: true,
    loraRun: 'metal-modular-rabanne-batch2',
    prompt:
      'Masterpiece metallic modularism fashion illustration. Medium: sharp reflective ink edges, shimmering metallic marker shading, precise modular hardware (chainmail and disc) assembly notes. Hard-edged industrial couture contrast, space-age metallic texture.',
  },
  {
    id: 'gucci',
    name: 'Romantic Maximalism',
    cnName: '浪漫极繁',
    tag: 'ROMANTIC MAXIMALISM · 浪漫极繁',
    lineageEn: "Carries traces of Alessandro Michele's layered romanticism.",
    lineageCn: '灵感谱系带有 Alessandro Michele 式层叠浪漫与复古丰盛感。',
    enDesc: 'Layered color, quirky richness, and expressive editorial warmth.',
    editorialDesc: 'Messy pencils and saturated wash create an eccentric, story-rich editorial fairytale.',
    trainingStyle: 'maximalist_romance',
    loraReady: true,
    loraRun: 'maximalist-romance-gucci-pinterest-batch4',
    prompt:
      'Masterpiece romantic maximalism fashion illustration. Medium: heavily layered colored pencils, saturated watercolors, expressive doodle-like strokes. Quirky 1970s retro styling, gender-fluid vintage aesthetic, vibrant, eccentric, and story-rich maximalist color palettes.',
  },
  {
    id: 'mcqueen',
    name: 'Dark Poise',
    cnName: '暗调锋度',
    tag: 'DARK POISE · 暗调锋度',
    lineageEn: 'Inspired by the sharp theatricality of Lee Alexander McQueen.',
    lineageCn: '灵感谱系向 Lee Alexander McQueen 的锋利戏剧性致意。',
    enDesc: 'Smudged depth, sharp scratches, and poised gothic emotion.',
    editorialDesc: 'Charcoal density and razor graphite marks create a dark but composed couture mood.',
    trainingStyle: 'gothic_theatre',
    loraReady: true,
    loraRun: 'gothic-theatre-mcqueen-pinterest-batch4',
    prompt:
      'Masterpiece dark poise fashion illustration. Medium: heavily smudged emotional charcoal, razor-sharp aggressive graphite scratchings. Striking dramatic tension, composed beautifully macabre gothic couture linework, razor-sharp tailoring, profound dark romanticism.',
  },
  {
    id: 'ysl',
    name: 'Minimal Precision',
    cnName: '极简精裁',
    tag: 'MINIMAL PRECISION · 极简精裁',
    lineageEn: 'Echoes the refined restraint associated with Yves Saint Laurent.',
    lineageCn: '灵感谱系呼应 Yves Saint Laurent 式极简而锋利的精裁语汇。',
    enDesc: 'Sparse lines, bold blocking, and elegant negative space.',
    editorialDesc: 'Disciplined ink outlines and sharp blocking keep the page spare, sleek, and exact.',
    trainingStyle: 'minimalist_chic',
    loraReady: true,
    loraRun: 'minimalist-chic-ysl-batch3',
    prompt:
      'Masterpiece minimal precision fashion illustration. Medium: extraordinarily sparse, precise black ink outlines, flat, bold, minimalist marker color blocking. Razor-sleek tailoring (Le Smoking references), sharp shoulders, highly elegant negative space, sophisticated Parisian chic.',
  },
]

const LORA_STYLES = RAW_STYLES.map((style) => ({
  ...style,
  githubRepo: GITHUB_LORA_REPO,
  githubRef: GITHUB_LORA_REF,
  loraWeightPath: buildLoraWeightPath(style.loraRun),
  loraWeightUrl: buildLoraWeightUrl(buildLoraWeightPath(style.loraRun)),
  loraWeightGithubUrl: buildLoraWeightGithubUrl(buildLoraWeightPath(style.loraRun)),
  loraWeightContentsUrl: buildLoraWeightContentsUrl(buildLoraWeightPath(style.loraRun)),
}))

const PROVIDER_API_SETTINGS = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || '/api/gemini',
  apiKey: '',
  analysisModel: import.meta.env.VITE_ANALYSIS_MODEL || 'gemini-3.1-flash-lite',
  imageModel: import.meta.env.VITE_IMAGE_MODEL || 'gemini-3.1-flash-image',
  fallbackImageModel: import.meta.env.VITE_FALLBACK_IMAGE_MODEL || 'gemini-3.1-flash-image',
}
const MAX_UPLOAD_EDGE = 1440
const MAX_GENERATED_EDGE = 1400
const UPLOAD_QUALITY = 0.88
const POSTER_EXPORT_QUALITY = 0.9

const HORIZONTAL_POSTER_WIDTH = 2000
const HORIZONTAL_POSTER_HEIGHT = 1400
const VERTICAL_POSTER_WIDTH = 1440
const VERTICAL_POSTER_HEIGHT = 1800

const BRAND_NAME = 'Draftelier AI'
const BRAND_STUDIO = 'Draftelier AI Studio'
const BRAND_ARCHIVE = 'Draftelier AI时尚档案'
const BRAND_HANDLE = '@DraftelierAI'
const BRAND_APP_LABEL = 'Draftelier AI'
const BRAND_WEBSITE = 'WWW.DRAFTELIERAI.CLUB'

const FREE_TRIAL_LIMIT = 3
const HAS_UNLIMITED_ACCESS = true
const FREE_TRIAL_STORAGE_KEY = 'draftelier-free-trial-count'
const APP_STORE_URL = 'https://apps.apple.com/us/search?term=Draftelier%20AI'
const BRAND_LOGO_SRC = `${import.meta.env.BASE_URL}logo.png`

const APP_STORE_CTA_IMAGE =
  'data:image/svg+xml;charset=utf-8,' +
  encodeURIComponent(`<svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1024" height="1024" fill="#F7F6F4"/>
  <circle cx="512" cy="512" r="338" fill="#080808"/>
  <circle cx="512" cy="512" r="337" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
  <path d="M338 610C430 533 516 430 566 315" stroke="rgba(255,255,255,0.12)" stroke-width="6"/>
  <path d="M412 324L615 324L615 704L555 704L555 378L472 378L472 704L412 704L412 324Z" fill="rgba(255,255,255,0.08)"/>
  <path d="M631 307L689 307L734 704L673 704L666 621L620 621L611 704L555 704L631 307ZM627 572L661 572L645 409L627 572Z" fill="rgba(255,255,255,0.08)"/>
  <path d="M310 291C423 341 574 331 725 260" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
  <path d="M310 737C406 654 569 620 747 678" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>
  <text x="512" y="491" text-anchor="middle" fill="#F8F6F1" font-family="Baskerville, Didot, Times New Roman, serif" font-size="86" letter-spacing="2">DRAFTELIER</text>
  <text x="512" y="546" text-anchor="middle" fill="#F1EEE7" font-family="Helvetica Neue, Arial, sans-serif" font-size="34" letter-spacing="10">AI FASHION STUDIO</text>
  <text x="512" y="722" text-anchor="middle" fill="#F0ECE4" font-family="Baskerville, Didot, Times New Roman, serif" font-size="28" letter-spacing="3">• AI-COUTURE FASHION</text>
  <text x="512" y="766" text-anchor="middle" fill="#F0ECE4" font-family="Baskerville, Didot, Times New Roman, serif" font-size="28" letter-spacing="3">EDITORIAL</text>
</svg>`)

const DESIGNER_DISPLAY_META = {
  dior: { brandName: 'Christian Dior', origin: 'HAUTE COUTURE · 经典高定' },
  balenciaga: { brandName: 'Cristobal Balenciaga', origin: 'ARCHIVAL ATELIER · 建筑手稿' },
  schiaparelli: { brandName: 'Schiaparelli', origin: 'SURREALISM · 超现实艺术' },
  chanel: { brandName: 'Karl Lagerfeld', origin: 'MODERN CROQUIS · 现代速写' },
  mugler: { brandName: 'Thierry Mugler', origin: 'POWER COUTURE · 戏剧张力' },
  galliano: { brandName: 'John Galliano', origin: 'BAROQUE DRAMA · 华丽叙事' },
  gaultier: { brandName: 'Jean Paul Gaultier', origin: 'CORSET CABARET · 紧身戏谑' },
  westwood: { brandName: 'Vivienne Westwood', origin: 'PUNK ROCOCO · 朋克宫廷' },
  maison_margiela: { brandName: 'Maison Margiela', origin: 'ARTISANAL DECONSTRUCTION · 解构档案' },
  iris_van_herpen: { brandName: 'Iris van Herpen', origin: 'FUTURISM · 科技未来主义' },
  issey_miyake: { brandName: 'Issey Miyake', origin: 'PLEATED MOTION · 褶裥流动' },
  courreges: { brandName: 'Andre Courreges', origin: 'SPACE AGE · 太空未来' },
  rabanne: { brandName: 'Paco Rabanne', origin: 'METAL MODULAR · 金属未来' },
  gucci: { brandName: 'Alessandro Michele', origin: 'MAXIMALISM · 极繁浪漫' },
  mcqueen: { brandName: 'Alexander McQueen', origin: 'GOTHIC TAILORING · 暗黑哥特' },
  ysl: { brandName: 'Yves Saint Laurent', origin: 'MINIMALIST CHIC · 极简轮廓' },
}

const DESIGNER_STYLES = LORA_STYLES.map((style) => {
  const meta = DESIGNER_DISPLAY_META[style.id] || {}
  return {
    ...style,
    brandName: meta.brandName || style.name,
    posterName: style.name,
    origin: meta.origin || style.tag,
  }
})

const DESIGNER_STYLE_MAP = new Map(DESIGNER_STYLES.map((style) => [style.id, style]))

export function getDesignerStyle(styleId) {
  if (!styleId) return DESIGNER_STYLES[0]
  return DESIGNER_STYLE_MAP.get(String(styleId).trim()) || null
}

export function buildStyleRenderNotes(styleId) {
  const style = typeof styleId === 'object' && styleId ? styleId : getDesignerStyle(styleId)
  if (!style) return ''
  const mediumMatch = String(style.prompt || '').match(/Medium:\s*([^.]*)/i)
  const mediumLine = mediumMatch?.[1]?.trim()
  return [
    mediumLine ? `Medium: ${mediumLine}.` : style.enDesc,
    style.editorialDesc,
    `House-code mood: ${style.tag}.`,
    'Keep the result free of any house names, designer names, logos, atelier headers, signatures, stamps, labels, or other visible text.',
  ]
    .filter(Boolean)
    .join(' ')
}

export function buildDesignerPrompt(styleId) {
  const style = getDesignerStyle(styleId)
  if (!style) return null
  return [
    'Redraw this exact uploaded photo as a couture presentation sketch.',
    'CRITICAL INSTRUCTIONS:',
    '1. PHOTO FIRST: Use the uploaded photo as the only identity and composition blueprint.',
    '2. EXACT FACE: Keep the same face identity, facial structure, hairstyle, expression, age impression, and skin tone. Do not beautify, replace, or invent a different person.',
    '3. EXACT ACTION: Keep the same camera angle, head direction, arm placement, hand gesture, leg position, torso twist, and overall movement. Do not change the pose.',
    '4. EXACT OUTFIT: Keep the same garment count, layering, silhouette, fit, neckline, sleeve length, hem length, trims, prints, accessories worn on the body, and styling details from the uploaded photo.',
    '5. ORIGINAL PROPORTIONS: Preserve the photographed body proportions and outfit proportions. Do not elongate the figure into a generic fashion croquis body.',
    '6. STYLE ONLY IN RENDERING: Apply the designer style only to line quality, brushwork, marker or watercolor texture, shading language, and presentation finish. Do not redesign the look itself.',
    '7. NO BACKGROUND: Completely remove the original background. The subject must be isolated on a pure solid white or warm ivory background with no street, props, scenery, floor, or cast shadow.',
    `8. STYLE REFERENCE: ${buildStyleRenderNotes(style)}`,
    '9. NO TYPOGRAPHY: Do not include any designer names, house names, logos, atelier headers, handwritten annotations, signatures, watermarks, or printed text anywhere in the image.',
    '10. OUTPUT: Produce one high-fidelity couture presentation sketch with visible hand-drawn energy, readable garment structure, and strong photo resemblance.',
  ].join('\n')
}

export default function App() {
  const [sourceImage, setSourceImage] = useState(null)
  const [sourceMimeType, setSourceMimeType] = useState('image/jpeg')
  const [selectedStyle, setSelectedStyle] = useState(DESIGNER_STYLES[0])
  const [renderedStyle, setRenderedStyle] = useState(null)
  const [layout, setLayout] = useState('horizontal')
  const [posterMode, setPosterMode] = useState('clean')
  const [posterLanguage, setPosterLanguage] = useState('bilingual')
  const [isGenerating, setIsGenerating] = useState(false)
  const [loadingStep, setLoadingStep] = useState('')
  const [posterImage, setPosterImage] = useState(null)
  const [rawSketchImage, setRawSketchImage] = useState(null)
  const [ootdAnalysis, setOotdAnalysis] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [freeTrialCount, setFreeTrialCount] = useState(0)
  const [showDownloadPrompt, setShowDownloadPrompt] = useState(false)
  const [showUploadDisclosure, setShowUploadDisclosure] = useState(false)
  const [activePanel, setActivePanel] = useState(null)
  const [showIntro, setShowIntro] = useState(false)

  const fileInputRef = useRef(null)
  const canvasRef = useRef(null)
  const directionRef = useRef(null)
  const posterObjectUrlRef = useRef(null)
  const sketchObjectUrlRef = useRef(null)
  const apiSettings = PROVIDER_API_SETTINGS
  const isApiConfigured = Boolean(apiSettings.baseUrl.trim())

  useEffect(() => {
    return () => {
      revokeObjectUrlRef(posterObjectUrlRef)
      revokeObjectUrlRef(sketchObjectUrlRef)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (HAS_UNLIMITED_ACCESS) return
    try {
      const savedCount = Number(window.localStorage.getItem(FREE_TRIAL_STORAGE_KEY) || '0')
      if (Number.isFinite(savedCount) && savedCount > 0) {
        setFreeTrialCount(Math.min(savedCount, FREE_TRIAL_LIMIT))
      }
    } catch {
      // ignore storage failures
    }
  }, [])

  useEffect(() => {
    if (!posterImage || !sourceImage || !rawSketchImage || !renderedStyle || isGenerating) return

    const timer = window.setTimeout(() => {
      createPoster(
        sourceImage,
        rawSketchImage,
        layout,
        renderedStyle,
        ootdAnalysis,
        posterMode,
        posterLanguage,
      ).catch(() => {})
    }, 200)

    return () => window.clearTimeout(timer)
  }, [
    layout,
    ootdAnalysis,
    rawSketchImage,
    renderedStyle,
    sourceImage,
    posterImage,
    isGenerating,
    posterMode,
    posterLanguage,
  ])

  const fetchWithRetry = async (url, options, retries = 5) => {
    let lastError = '网络请求失败，请重试 (Network request failed)'

    for (let index = 0; index < retries; index += 1) {
      try {
        const response = await fetch(url, options)
        const data = await response.json().catch(() => ({}))
        if (response.ok) return data

        if (response.status === 413) {
          lastError = 'The uploaded image is too large for the current service limit. Please try a smaller photo.'
        } else if (data?.error?.message) {
          lastError = `API Error: ${data.error.message}`
        } else if (data?.error) {
          lastError = String(data.error)
        } else if (data?.message) {
          lastError = String(data.message)
        } else {
          lastError = `Request denied (Status: ${response.status})`
        }

        if (response.status !== 429 && response.status < 500) break
      } catch (error) {
        lastError = error?.message || lastError
        if (index === retries - 1) break
      }

      await new Promise((resolve) => setTimeout(resolve, 2 ** index * 1000))
    }

    throw new Error(lastError)
  }

  const handleUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const prepared = await prepareUploadImage(file)
      setSourceMimeType(prepared.mimeType)
      setSourceImage(prepared.dataUrl)
      revokeObjectUrlRef(posterObjectUrlRef, setPosterImage)
      revokeObjectUrlRef(sketchObjectUrlRef, setRawSketchImage)
      setRenderedStyle(null)
      setOotdAnalysis(null)
      setErrorMsg('')

      setTimeout(() => {
        directionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 300)
    } catch (error) {
      setSourceImage(null)
      revokeObjectUrlRef(posterObjectUrlRef, setPosterImage)
      revokeObjectUrlRef(sketchObjectUrlRef, setRawSketchImage)
      setRenderedStyle(null)
      setOotdAnalysis(null)
      setErrorMsg(error.message || 'Image processing failed. Please try another photo.')
    }
  }

  const generateSketch = async () => {
    if (!sourceImage) return

    if (!isApiConfigured) {
      setErrorMsg(
        'Generation service is not configured. / 生成服务尚未配置。',
      )
      return
    }

    if (!HAS_UNLIMITED_ACCESS && freeTrialCount >= FREE_TRIAL_LIMIT) {
      setShowDownloadPrompt(true)
      return
    }

    setIsGenerating(true)
    setErrorMsg('')
    let currentOotd = null

    try {
      setLoadingStep('Evaluating Sartorial Profile... / 正在解析穿搭特征')
      try {
        currentOotd = await requestDirectOotdAnalysis(
          sourceImage,
          sourceMimeType,
          selectedStyle,
          apiSettings,
          fetchWithRetry,
        )
      } catch (error) {
        console.warn('Direct OOTD analysis failed:', error)
        currentOotd = null
      }

      currentOotd = sanitizeOotdAnalysis(currentOotd, selectedStyle)
      setOotdAnalysis(currentOotd)

      setLoadingStep(`Rendering in ${selectedStyle.name} sketch style... / 正在渲染大师手稿`)
      const generatedImageDataUrl = await requestFashionSketch(
        sourceImage,
        sourceMimeType,
        selectedStyle,
        currentOotd,
        apiSettings,
        fetchWithRetry,
      )

      const sketchUrl = await normalizeGeneratedImage(generatedImageDataUrl)
      replaceObjectUrl(sketchObjectUrlRef, sketchUrl, setRawSketchImage)
      setRenderedStyle(selectedStyle)
      setLoadingStep('Archiving your design portfolio... / 正在装裱视觉档案')
      await createPoster(
        sourceImage,
        sketchUrl,
        layout,
        selectedStyle,
        currentOotd,
        posterMode,
        posterLanguage,
      )
      registerSuccessfulTrial()
    } catch (error) {
      setErrorMsg(error.message || 'The atelier is busy right now. Please try again. / 工坊目前繁忙，请稍后重试。')
    } finally {
      setIsGenerating(false)
      setLoadingStep('')
    }
  }

  const createPoster = (
    originalUrl,
    sketchUrl,
    currentLayout,
    currentStyle,
    currentOotd,
    currentPosterMode,
    currentPosterLanguage,
  ) =>
    new Promise((resolve, reject) => {
      const canvas = canvasRef.current
      const context = canvas?.getContext('2d')
      if (!canvas || !context || !currentStyle) {
        resolve()
        return
      }

      if (currentLayout === 'horizontal') {
        canvas.width = HORIZONTAL_POSTER_WIDTH
        canvas.height = HORIZONTAL_POSTER_HEIGHT
      } else {
        canvas.width = VERTICAL_POSTER_WIDTH
        canvas.height = VERTICAL_POSTER_HEIGHT
      }

      context.fillStyle = '#FDFCFB'
      context.fillRect(0, 0, canvas.width, canvas.height)

      const loadImage = (src) =>
        new Promise((resolveImage, rejectImage) => {
          const image = new Image()
          image.crossOrigin = 'anonymous'
          image.onload = () => resolveImage(image)
          image.onerror = () => rejectImage(new Error('Image loading failed.'))
          image.src = src
        })

      Promise.all([loadImage(originalUrl), loadImage(sketchUrl)])
        .then(async ([original, sketch]) => {
          if (currentLayout === 'horizontal') {
            renderHorizontalPoster(
              context,
              original,
              sketch,
              currentStyle,
              currentOotd,
              currentPosterMode,
              currentPosterLanguage,
            )
          } else {
            renderVerticalPoster(
              context,
              canvas,
              original,
              sketch,
              currentStyle,
              currentOotd,
              currentPosterMode,
              currentPosterLanguage,
            )
          }

          const posterUrl = await canvasToObjectUrl(canvas, POSTER_EXPORT_QUALITY)
          replaceObjectUrl(posterObjectUrlRef, posterUrl, setPosterImage)
          resolve()
        })
        .catch((error) => reject(error))
    })

  const downloadPoster = () => {
    if (!posterImage) return
    const styleId = renderedStyle?.id || selectedStyle.id
    const link = document.createElement('a')
    link.href = posterImage
    link.download = `Draftelier-AI-Poster-${styleId}.jpg`
    link.click()
  }

  const downloadSketch = () => {
    if (!rawSketchImage) return
    const styleId = renderedStyle?.id || selectedStyle.id
    const link = document.createElement('a')
    link.href = rawSketchImage
    link.download = `Draftelier-AI-Sketch-${styleId}.jpg`
    link.click()
  }

  const sharePoster = async () => {
    if (!posterImage) return
    try {
      const styleId = renderedStyle?.id || selectedStyle.id
      const response = await fetch(posterImage)
      const blob = await response.blob()
      const file = new File([blob], `Draftelier-AI-Poster-${styleId}.jpg`, { type: 'image/jpeg' })

      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: BRAND_STUDIO,
          text: `Created a fashion editorial with ${BRAND_NAME}.`,
          files: [file],
        })
      } else {
        downloadPoster()
      }
    } catch (error) {
      if (error?.name !== 'AbortError') downloadPoster()
    }
  }

  const resetAll = () => {
    revokeObjectUrlRef(posterObjectUrlRef, setPosterImage)
    revokeObjectUrlRef(sketchObjectUrlRef, setRawSketchImage)
    setRenderedStyle(null)
    setSourceImage(null)
    setSourceMimeType('image/jpeg')
    setOotdAnalysis(null)
    setErrorMsg('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const registerSuccessfulTrial = () => {
    if (HAS_UNLIMITED_ACCESS) return
    const nextCount = Math.min(freeTrialCount + 1, FREE_TRIAL_LIMIT)
    setFreeTrialCount(nextCount)
    try {
      window.localStorage.setItem(FREE_TRIAL_STORAGE_KEY, String(nextCount))
    } catch {
      // ignore storage failures
    }
    if (nextCount >= FREE_TRIAL_LIMIT) setShowDownloadPrompt(true)
  }

  const remainingFreeTrials = HAS_UNLIMITED_ACCESS
    ? Number.POSITIVE_INFINITY
    : Math.max(FREE_TRIAL_LIMIT - freeTrialCount, 0)

  const openAppStore = () => window.open(APP_STORE_URL, '_blank', 'noopener,noreferrer')
  const openLegalPanel = (panelKey) => setActivePanel(panelKey)

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white">
      <canvas ref={canvasRef} className="hidden" />

      {activePanel && <InfoPanel panelKey={activePanel} onClose={() => setActivePanel(null)} />}

      {showDownloadPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 py-8 backdrop-blur-sm">
          <div className="relative w-full max-w-[540px] border border-black bg-white p-4 shadow-2xl md:p-6">
            <button
              type="button"
              onClick={() => setShowDownloadPrompt(false)}
              className="absolute right-4 top-4 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 transition-colors hover:text-black"
            >
              Close
            </button>

            <div className="mx-auto flex max-w-[420px] flex-col items-center text-center">
              <img src={BRAND_LOGO_SRC} alt="Draftelier AI logo" className="mb-4 h-20 w-20 rounded-full border border-black/10 object-cover" />
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-black">
                Free Trial Complete
                <span className="ml-2 font-normal tracking-widest text-gray-500">/ 免费体验已完成</span>
              </p>
              <p className="mt-3 max-w-[360px] text-sm leading-relaxed text-gray-600">
                Your three complimentary editorial sketches are ready. Continue in the Draftelier AI app for more couture generations.
              </p>
              <p className="mt-2 max-w-[360px] text-sm leading-relaxed text-gray-500">
                您的 3 次免费体验已用完。继续前往 Draftelier AI App，解锁更多时装手稿生成。
              </p>

              <button
                type="button"
                onClick={openAppStore}
                className="mt-6 w-full max-w-[320px] transition-transform duration-300 hover:scale-[1.02]"
              >
                <img src={APP_STORE_CTA_IMAGE} alt="Download Draftelier AI on the App Store" className="w-full" />
              </button>

              <button
                type="button"
                onClick={openAppStore}
                className="mt-5 border border-black bg-black px-6 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-white transition-colors hover:bg-gray-800"
              >
                Download Draftelier AI
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="flex flex-col gap-6 border-b border-black px-6 py-8 md:flex-row md:items-end md:justify-between md:px-12">
        <div className="flex items-center justify-center gap-4 md:justify-start">
          <img
            src={BRAND_LOGO_SRC}
            alt="Draftelier AI logo"
            className="h-20 w-20 rounded-full border border-black/10 object-cover shadow-[0_16px_40px_rgba(0,0,0,0.08)] md:h-24 md:w-24"
          />
          <h1 className="text-center font-serif text-5xl uppercase leading-none tracking-tighter md:text-left md:text-8xl">
            Draftelier
            <br />
            AI
          </h1>
        </div>
        <div className="flex flex-col gap-1 text-center md:text-right">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em]">
            Issue N° 01 <span className="ml-1 font-normal tracking-widest text-gray-500">/ 创刊号</span>
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">
            {BRAND_NAME} <span className="ml-1 font-normal tracking-widest">/ {BRAND_ARCHIVE}</span>
          </p>
        </div>
      </header>

      <div className="border-b border-black bg-[#FAFAFA]">
        <button
          type="button"
          onClick={() => setShowIntro(!showIntro)}
          className="flex w-full items-center justify-between px-6 py-4 transition-colors hover:bg-gray-100 md:px-12"
        >
          <div className="flex items-center gap-3">
            <Info size={16} className="text-black" />
            <h2 className="m-0 text-[11px] font-bold uppercase tracking-[0.2em] text-black">
              About &amp; Workflow <span className="ml-1 font-normal text-gray-500">/ 平台介绍与使用流程</span>
            </h2>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-gray-500">
            {showIntro ? 'Close / 收起' : 'Read More / 展开'}
          </span>
        </button>

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            showIntro ? 'max-h-[1000px] border-t border-black/10 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="grid grid-cols-1 gap-8 px-6 py-8 md:grid-cols-3 md:gap-12 md:px-12">
            <div className="md:col-span-2">
              <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black">
                Concept <span className="ml-1 font-normal text-gray-500">/ 设计理念</span>
              </h3>
              <div className="space-y-3">
                <p className="text-justify text-xs leading-relaxed text-gray-800 md:text-[13px]">
                  <strong className="pr-1 font-serif text-sm italic text-black">Draftelier AI</strong>
                  transforms your real outfit photos into haute couture sketches and magazine-quality editorial posters. It extracts your silhouette and style cues to generate a refined fashion illustration with an editorial critique, perfect for social sharing and style archives.
                </p>
                <p className="text-justify text-[10px] leading-relaxed text-gray-500 md:text-[11px]">
                  <strong className="pr-1 font-serif text-sm italic text-gray-700">Draftelier AI</strong>
                  是一款将真实穿搭转化为高定时装手稿与杂志级海报的创作工具。系统自动提取轮廓与风格线索，生成带有高级手工坊质感的手稿，并辅以时尚点评，适用于社交分享与穿搭记录。
                </p>
              </div>
            </div>
            <div className="border-t border-black/10 pt-6 md:col-span-1 md:border-l md:border-t-0 md:border-black/10 md:pl-8 md:pt-0">
              <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black">
                Workflow <span className="ml-1 font-normal text-gray-500">/ 使用流程</span>
              </h3>
              <ol className="list-decimal space-y-3 pl-4 text-xs text-gray-800 marker:font-bold marker:text-black">
                <li className="pl-1">Upload Photo / 上传照片</li>
                <li className="pl-1">Select Style / 选择风格</li>
                <li className="pl-1">Set Format &amp; Language / 设定画幅与语言</li>
                <li className="pl-1">Tap Generate / 点击生成</li>
                <li className="pl-1">Save &amp; Share / 保存与分享</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto flex min-h-[calc(100vh-200px)] max-w-[1600px] flex-col lg:grid lg:grid-cols-12">
        <div className="order-1 relative flex min-h-[50vh] items-center justify-center bg-[#FAFAFA] p-6 md:p-12 lg:order-2 lg:col-span-8 lg:min-h-[600px]">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <span className="whitespace-nowrap font-serif text-[15vw] font-bold uppercase tracking-tighter text-gray-100 opacity-50">
              Editorial
            </span>
          </div>

          <div className="relative z-10 flex w-full flex-col items-center gap-10">
            <div
              className={`group relative mx-auto w-full ${layout === 'horizontal' ? 'max-w-[900px]' : 'max-w-[600px]'} ${
                posterImage && !isGenerating ? 'mb-10' : ''
              }`}
            >
              <div
                onClick={() => !sourceImage && fileInputRef.current?.click()}
                className={`relative overflow-hidden border border-black bg-white shadow-2xl transition-all duration-700 ${
                  layout === 'horizontal' ? 'aspect-[10/7]' : 'aspect-[4/5]'
                } ${isGenerating ? 'opacity-50 blur-sm grayscale' : ''} ${!sourceImage ? 'cursor-pointer hover:bg-gray-50' : ''}`}
              >
                {posterImage ? (
                  <img
                    src={posterImage}
                    className="pointer-events-auto h-full w-full select-none object-contain bg-white"
                    alt="Atelier result"
                    title="Long press to save or share"
                  />
                ) : sourceImage ? (
                  <div className="group/preview relative h-full w-full">
                    <img
                      src={sourceImage}
                      className="h-full w-full object-cover transition-all duration-700 group-hover/preview:brightness-75"
                      alt="Source preview"
                    />
                    {!isGenerating && (
                      <div
                        className="absolute inset-0 flex cursor-pointer items-center justify-center opacity-0 transition-opacity duration-300 group-hover/preview:opacity-100"
                        onClick={(event) => {
                          event.stopPropagation()
                          fileInputRef.current?.click()
                        }}
                      >
                        <p className="border border-white bg-black/40 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                          Change Image
                          <br />
                          <span className="mt-1 block text-center text-[9px] font-normal tracking-widest">更换照片</span>
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-transparent p-8 text-center md:p-12">
                    <img src={BRAND_LOGO_SRC} alt="Draftelier AI seal" className="mb-8 h-28 w-28 rounded-full border border-black/10 object-cover shadow-[0_20px_50px_rgba(0,0,0,0.08)]" />
                    <div className="mb-8 h-16 w-[1px] bg-black" />
                    <h3 className="mb-2 font-serif text-2xl uppercase tracking-widest text-black md:text-3xl">
                      Blank Canvas
                    </h3>
                    <h4 className="mb-6 text-base font-light tracking-[0.3em] text-gray-400 md:text-lg">空白画板</h4>
                    <p className="max-w-sm text-[9px] uppercase leading-loose tracking-[0.2em] text-gray-500 md:text-[10px]">
                      Upload your photograph and select an artistic direction to generate a high-fashion editorial spread.
                      <span className="mx-auto mt-4 block w-max border border-black px-6 py-3 font-bold uppercase tracking-widest text-black transition-colors hover:bg-black hover:text-white">
                        Tap To Upload OOTD <br className="md:hidden" />
                        <span className="font-normal">/ 点击此处传图</span>
                      </span>
                    </p>
                  </div>
                )}
                {isGenerating && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm">
                    <div className="mb-8 h-24 w-[1px] animate-pulse bg-black" />
                    <p className="text-center text-[11px] font-bold uppercase leading-relaxed tracking-[0.3em] text-black">
                      {loadingStep.split(' / ')[0] || loadingStep}
                      <br />
                      <span className="text-[9px] font-normal text-gray-600">{loadingStep.split(' / ')[1] || ''}</span>
                    </p>
                  </div>
                )}
              </div>

              {posterImage && !isGenerating && (
                <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 gap-0 border border-black bg-white shadow-xl opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={sharePoster}
                    className="flex items-center gap-2 border-r border-black px-4 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors hover:bg-black hover:text-white"
                  >
                    <Share2 size={14} /> <span className="hidden md:inline">Share</span> <span className="font-normal md:hidden">分享</span>
                  </button>
                  <button
                    type="button"
                    onClick={downloadPoster}
                    className="flex items-center gap-2 border-r border-black px-4 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors hover:bg-black hover:text-white"
                  >
                    <Layers size={14} /> <span className="hidden md:inline">Save Poster</span> <span className="font-normal md:hidden">保存海报</span>
                  </button>
                  <button
                    type="button"
                    onClick={downloadSketch}
                    className="flex items-center gap-2 border-r border-black px-4 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors hover:bg-black hover:text-white"
                  >
                    <ImageIcon size={14} /> <span className="hidden md:inline">Save Sketch</span> <span className="font-normal md:hidden">手稿</span>
                  </button>
                  <button
                    type="button"
                    onClick={resetAll}
                    className="flex items-center gap-2 px-4 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors hover:bg-black hover:text-white"
                  >
                    <ArrowRight size={14} /> <span className="hidden md:inline">New</span>
                  </button>
                </div>
              )}
            </div>

            {ootdAnalysis && !isGenerating && (
              <section
                className={`w-full border border-black bg-black p-6 text-white md:p-10 ${
                  layout === 'horizontal' ? 'max-w-[900px]' : 'max-w-[600px]'
                }`}
              >
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]">
                    <Activity size={14} /> Style Reading <span className="ml-2 hidden font-normal tracking-widest text-gray-400 md:inline">/ 风格解读</span>
                  </h2>
                  <span className="text-[10px] uppercase tracking-widest text-gray-400">AI Editorial Note</span>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2 text-center">{renderEditorialHeadlineMarkup(ootdAnalysis, posterLanguage)}</div>
                  {ootdAnalysis.hot_take_cn ? (
                    <div className="border-y border-gray-800 px-3 py-4">
                      <p className="text-sm leading-relaxed text-gray-200">{ootdAnalysis.hot_take_cn}</p>
                    </div>
                  ) : null}
                  <div className="grid gap-4 text-left md:grid-cols-2">
                    <div className="border border-gray-800 p-4">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500">Editorial Note / 造型解读</p>
                      <p className="mt-2 text-[12px] leading-relaxed text-gray-300">{ootdAnalysis.editor_note_cn}</p>
                      <p className="mt-2 text-[11px] italic leading-relaxed text-gray-500">{ootdAnalysis.editor_note_en}</p>
                    </div>
                    <div className="border border-gray-800 p-4">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500">Visual Echo / 视觉回响</p>
                      <p className="mt-2 text-[12px] leading-relaxed text-gray-300">{ootdAnalysis.stylist_note_cn}</p>
                      <p className="mt-2 text-[11px] italic leading-relaxed text-gray-500">{ootdAnalysis.stylist_note_en}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 border-t border-gray-800 pt-4">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500">AI Disclosure / AI 说明</p>
                  <p className="mt-2 text-[11px] leading-relaxed text-gray-300">{AI_DISCLOSURE_COPY.footnoteEn}</p>
                  <p className="mt-2 text-[11px] leading-relaxed text-gray-500">{AI_DISCLOSURE_COPY.footnoteCn}</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => openLegalPanel('support')}
                      className="inline-flex items-center gap-2 border border-gray-700 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-black"
                    >
                      <Flag size={12} /> Report Content
                    </button>
                    <button
                      type="button"
                      onClick={() => openLegalPanel('policy')}
                      className="inline-flex items-center gap-2 border border-gray-700 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-black"
                    >
                      <Shield size={12} /> Content Policy
                    </button>
                    <button
                      type="button"
                      onClick={() => openLegalPanel('support')}
                      className="inline-flex items-center gap-2 border border-gray-700 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-black"
                    >
                      <UserX size={12} /> Block User
                    </button>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>

        <div className="order-2 flex flex-col border-b border-black pb-28 lg:order-1 lg:col-span-4 lg:border-b-0 lg:border-r lg:pb-0">
          <section className="hidden border-b border-black p-6 md:p-12 lg:block">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em]">
                01. Source <span className="ml-2 font-normal tracking-widest text-gray-500">/ 照片来源</span>
              </h2>
              <span className="text-[10px] uppercase tracking-widest text-gray-400">Upload OOTD</span>
            </div>

            <div
              onClick={() => fileInputRef.current?.click()}
              className="group relative mx-auto flex aspect-[3/4] w-full max-w-[300px] cursor-pointer flex-col items-center justify-center overflow-hidden border border-black bg-white transition-colors hover:bg-gray-50"
            >
              {sourceImage ? (
                <>
                  <img
                    src={sourceImage}
                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                    alt="Source"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="border border-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                      Change Image
                      <span className="mt-1 block text-center text-[8px] font-normal tracking-widest">更换照片</span>
                    </p>
                  </div>
                </>
              ) : (
                <div className="relative flex flex-col items-center gap-4 text-black transition-transform duration-500 group-hover:scale-110">
                  <div className="h-px w-8 bg-black" />
                  <div className="absolute h-8 w-px bg-black" />
                </div>
              )}
            </div>

            <div className="mx-auto mt-6 max-w-[300px] text-left">
              <div className="border border-black/10 bg-black/[0.03] px-4 py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black">
                  Upload Rights <span className="ml-2 font-normal tracking-widest text-gray-500">/ 上传权利说明</span>
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-gray-700">{UPLOAD_COPY.shortEn}</p>
                <p className="mt-2 text-[11px] leading-relaxed text-gray-500">{UPLOAD_COPY.shortCn}</p>
                <p className="mt-3 text-[10px] leading-relaxed tracking-[0.14em] text-gray-500 md:hidden">{UPLOAD_COPY.compact}</p>

                <button
                  type="button"
                  onClick={() => setShowUploadDisclosure((current) => !current)}
                  className="mt-4 inline-flex items-center gap-2 border border-black px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-black transition-colors hover:bg-black hover:text-white"
                >
                  <FileText size={12} />
                  {showUploadDisclosure ? 'Hide Detail / 收起说明' : 'Usage & Rights / 查看说明'}
                </button>

                {showUploadDisclosure && (
                  <div className="mt-4 border-t border-black/10 pt-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black">
                      {UPLOAD_COPY.disclosureTitleEn}
                      <span className="ml-2 font-normal tracking-widest text-gray-500">/ {UPLOAD_COPY.disclosureTitleCn}</span>
                    </p>
                    <div className="mt-3 flex flex-col gap-3">
                      {UPLOAD_COPY.bilingualBody.map((item) => (
                        <div key={item.en} className="border border-black/10 bg-white px-3 py-3">
                          <p className="text-[11px] leading-relaxed text-gray-700">{item.en}</p>
                          <p className="mt-2 text-[11px] leading-relaxed text-gray-500">{item.cn}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 border border-black/10 bg-white px-4 py-3">
                <div className="flex items-start gap-3">
                  <Bot size={16} className="mt-[2px] shrink-0 text-black" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black">
                      AI Disclosure <span className="ml-2 font-normal tracking-widest text-gray-500">/ AI 生成说明</span>
                    </p>
                    <p className="mt-2 text-[11px] leading-relaxed text-gray-700">{AI_DISCLOSURE_COPY.bannerEn}</p>
                    <p className="mt-2 text-[11px] leading-relaxed text-gray-500">{AI_DISCLOSURE_COPY.bannerCn}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section ref={directionRef} className="relative flex flex-grow flex-col scroll-mt-6 p-6 pt-6 md:p-12 lg:pt-12">
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleUpload} />
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em]">
                02. Direction <span className="ml-2 font-normal tracking-widest text-gray-500">/ 时尚导向</span>
              </h2>
              <span className="text-[10px] uppercase tracking-widest text-gray-400">Style / 风格</span>
            </div>

            <p className="mb-5 text-[10px] uppercase leading-relaxed tracking-[0.16em] text-gray-500">
              Sketch inspiration source
              <span className="mt-1 block font-normal tracking-widest text-gray-400 lg:hidden">仅标注手稿灵感来源，向左划动浏览全部</span>
            </p>

            <ul className="mb-8 flex snap-x overflow-x-auto border-y border-black lg:flex-col lg:border-t lg:border-y-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {DESIGNER_STYLES.map((style) => (
                <li
                  key={style.id}
                  onClick={() => setSelectedStyle(style)}
                  className={`flex w-[260px] shrink-0 snap-center cursor-pointer flex-col border-r border-black px-4 py-5 transition-all lg:w-auto lg:shrink lg:border-b lg:border-r-0 ${
                    selectedStyle.id === style.id ? 'bg-black text-white' : 'text-black hover:bg-gray-50'
                  }`}
                >
                  <div className="flex w-full items-start justify-between gap-4">
                    <div>
                      <p
                        className={`text-[9px] font-bold uppercase tracking-[0.22em] ${
                          selectedStyle.id === style.id ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        Sketch Inspiration / 手稿灵感
                      </p>
                      <h4 className="mt-2 font-serif text-lg uppercase tracking-[0.18em]">{style.brandName}</h4>
                      <p
                        className={`mt-2 text-[9px] uppercase tracking-[0.22em] ${
                          selectedStyle.id === style.id ? 'text-gray-400' : 'text-gray-500'
                        }`}
                      >
                        {style.origin || style.tag}
                      </p>
                      <p className="mt-2 flex flex-col gap-1 font-serif text-[12px] tracking-[0.08em] xl:flex-row xl:items-baseline xl:gap-2">
                        {style.name}
                        <span
                          className={`font-sans text-[10px] font-normal tracking-[0.2em] ${
                            selectedStyle.id === style.id ? 'text-gray-400' : 'text-gray-500'
                          }`}
                        >
                          {style.cnName}
                        </span>
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      {style.locked && selectedStyle.id !== style.id && <Lock size={14} className="text-gray-300" />}
                      {selectedStyle.id === style.id && <ArrowRight size={18} className="text-white" />}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mb-8 border-t border-black pt-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em]">
                  03. Format <span className="ml-2 font-normal tracking-widest text-gray-500">/ 画幅格式</span>
                </h2>
                <span className="text-[10px] uppercase tracking-widest text-gray-400">Layout / 布局</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setLayout('horizontal')}
                  className={`border border-black py-3 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors md:py-4 ${
                    layout === 'horizontal' ? 'bg-black text-white' : 'bg-transparent text-black hover:bg-gray-50'
                  }`}
                >
                  Lookbook (10:7) <span className="mt-1 block font-normal tracking-widest">横版呈现</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLayout('vertical')}
                  className={`border border-black py-3 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors md:py-4 ${
                    layout === 'vertical' ? 'bg-black text-white' : 'bg-transparent text-black hover:bg-gray-50'
                  }`}
                >
                  Social (4:5) <span className="mt-1 block font-normal tracking-widest">社交竖版</span>
                </button>
              </div>
            </div>

            <div className="mb-8 border-t border-black pt-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em]">
                  04. Poster Note <span className="ml-2 font-normal tracking-widest text-gray-500">/ 海报点评</span>
                </h2>
                <span className="text-[10px] uppercase tracking-widest text-gray-400">Display / 展示</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPosterMode('clean')}
                  className={`border border-black py-3 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors md:py-4 ${
                    posterMode === 'clean' ? 'bg-black text-white' : 'bg-transparent text-black hover:bg-gray-50'
                  }`}
                >
                  Clean Poster <span className="mt-1 block font-normal tracking-widest">纯净海报</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPosterMode('commentary')}
                  className={`border border-black py-3 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors md:py-4 ${
                    posterMode === 'commentary' ? 'bg-black text-white' : 'bg-transparent text-black hover:bg-gray-50'
                  }`}
                >
                  Commentary <span className="mt-1 block font-normal tracking-widest">点评海报</span>
                </button>
              </div>
            </div>

            <div className="mb-8 border-t border-black pt-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em]">
                  05. Language <span className="ml-2 font-normal tracking-widest text-gray-500">/ 海报语言</span>
                </h2>
                <span className="text-[10px] uppercase tracking-widest text-gray-400">Share / 分享</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPosterLanguage('english')}
                  className={`border border-black py-3 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors md:py-4 ${
                    posterLanguage === 'english' ? 'bg-black text-white' : 'bg-transparent text-black hover:bg-gray-50'
                  }`}
                >
                  English Only <span className="mt-1 block font-normal tracking-widest">纯英文</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPosterLanguage('bilingual')}
                  className={`border border-black py-3 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors md:py-4 ${
                    posterLanguage === 'bilingual' ? 'bg-black text-white' : 'bg-transparent text-black hover:bg-gray-50'
                  }`}
                >
                  Bilingual <span className="mt-1 block font-normal tracking-widest">中英文</span>
                </button>
              </div>
            </div>

            <p className="mb-4 text-center text-[10px] uppercase tracking-[0.18em] text-gray-500 lg:mb-0">
              {HAS_UNLIMITED_ACCESS
                ? 'Unlimited Access / 无限使用'
                : remainingFreeTrials > 0
                  ? `${remainingFreeTrials} Free Trial${remainingFreeTrials === 1 ? '' : 's'} Left / 剩余免费次数 ${remainingFreeTrials}`
                  : 'Free trial complete / 免费体验已完成'}
            </p>

            {errorMsg && (
              <div className="mb-4 flex items-center gap-3 border border-black bg-white p-4 text-[11px] uppercase tracking-widest text-black lg:mt-4">
                <AlertCircle size={14} />
                {errorMsg}
              </div>
            )}

            <div className="fixed bottom-0 left-0 z-50 w-full border-t border-black bg-white p-4 lg:static lg:z-auto lg:w-auto lg:border-none lg:bg-transparent lg:p-0">
              <button
                type="button"
                onClick={generateSketch}
                disabled={!sourceImage || isGenerating}
                className="flex w-full items-center justify-center gap-3 bg-black py-5 text-[11px] font-bold uppercase tracking-[0.4em] text-white shadow-[0_0_40px_rgba(0,0,0,0.1)] transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 lg:py-6 lg:shadow-none"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-3">
                    <span className="h-2 w-2 animate-ping rounded-full bg-white" />
                    Rendering...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Generate Archive <span className="ml-1 font-normal tracking-widest text-gray-400">/ 生成视觉档案</span>
                  </span>
                )}
              </button>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-black bg-white px-6 py-8 pb-32 md:px-12 lg:pb-8">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] md:gap-6">
              <img src={BRAND_LOGO_SRC} alt="Draftelier AI seal" className="h-10 w-10 rounded-full border border-black/10 object-cover" />
              <span>AI Assisted <span className="ml-1 font-normal text-gray-500">/ 智能辅助</span></span>
              <span>Editorial Interpretation <span className="ml-1 font-normal text-gray-500">/ 编辑化演绎</span></span>
              <span>Rights-Aware Design <span className="ml-1 font-normal text-gray-500">/ 权利友好设计</span></span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-gray-400">© {new Date().getFullYear()} {BRAND_STUDIO}</div>
          </div>
          <div className="grid gap-4 border-t border-black/10 pt-6 md:grid-cols-2 xl:grid-cols-4">
            <FooterLinkCard
              title="Legal"
              subtitle="条款与隐私"
              links={[
                { label: 'Terms of Use / 使用条款', action: () => openLegalPanel('terms'), icon: <FileText size={12} /> },
                { label: 'Privacy Policy / 隐私政策', action: () => openLegalPanel('privacy'), icon: <Shield size={12} /> },
              ]}
            />
            <FooterLinkCard
              title="Transparency"
              subtitle="透明度"
              links={[
                { label: 'AI Disclosure / AI 生成说明', action: () => openLegalPanel('transparency'), icon: <Bot size={12} /> },
                { label: 'Content Policy / 内容安全规范', action: () => openLegalPanel('policy'), icon: <Sparkles size={12} /> },
              ]}
            />
            <FooterLinkCard
              title="Support"
              subtitle="支持与联系"
              links={[
                { label: `Contact / 联系我们: ${SUPPORT_EMAIL}`, href: `mailto:${SUPPORT_EMAIL}`, icon: <Mail size={12} /> },
                { label: `Privacy Req / 隐私请求: ${PRIVACY_EMAIL}`, href: `mailto:${PRIVACY_EMAIL}`, icon: <Mail size={12} /> },
              ]}
            />
            <FooterLinkCard
              title="Moderation"
              subtitle="举报与治理"
              links={[
                { label: 'Report Content / 违规举报', action: () => openLegalPanel('support'), icon: <Flag size={12} /> },
                { label: `Takedown / 下架: ${MODERATION_EMAIL}`, href: `mailto:${MODERATION_EMAIL}`, icon: <ExternalLink size={12} /> },
              ]}
            />
          </div>
        </div>
      </footer>
    </div>
  )
}

function FooterLinkCard({ title, subtitle, links }) {
  return (
    <div className="border border-black/10 bg-black/[0.02] p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black">
        {title} <span className="ml-2 font-normal tracking-widest text-gray-500">/ {subtitle}</span>
      </p>
      <div className="mt-4 flex flex-col gap-3">
        {links.map((link) =>
          link.href ? (
            <a
              key={link.label}
              href={link.href}
              className="inline-flex items-start gap-2 text-left text-[10px] font-bold uppercase leading-relaxed tracking-[0.16em] text-gray-700 transition-colors hover:text-black"
            >
              <span className="mt-[2px] shrink-0">{link.icon}</span>
              <span className="break-all normal-case lowercase">{link.label}</span>
            </a>
          ) : (
            <button
              key={link.label}
              type="button"
              onClick={link.action}
              className="inline-flex items-start gap-2 text-left text-[10px] font-bold uppercase leading-relaxed tracking-[0.16em] text-gray-700 transition-colors hover:text-black"
            >
              <span className="mt-[2px] shrink-0">{link.icon}</span>
              <span className="uppercase">{link.label}</span>
            </button>
          ),
        )}
      </div>
    </div>
  )
}

function InfoPanel({ panelKey, onClose }) {
  const panel = LEGAL_PANELS[panelKey]
  if (!panel) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl border border-black bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500 transition-colors hover:text-black"
        >
          <X size={12} /> Close
        </button>
        <div className="max-h-[82vh] overflow-y-auto p-6 md:p-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-black">{panel.title}</p>
          <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-gray-500">{panel.subtitle}</p>
          <div className="mt-8 space-y-6">
            {panel.sections.map((section) => (
              <section key={section.heading} className="border-t border-black/10 pt-5">
                <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-black">{section.heading}</h3>
                <div className="mt-3 space-y-3">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-gray-700">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function renderHorizontalPoster(context, original, sketch, style, ootd, posterMode, posterLanguage) {
  drawCoverCrop(context, original, 0, 0, 1000, 1400)

  const rightCenterX = 1500
  const posterCopy = getPosterCopy(posterLanguage)

  context.textAlign = 'center'
  context.fillStyle = '#000000'
  context.font = 'italic 72px "Snell Roundhand", "Apple Chancery", "Brush Script MT", cursive, serif'
  context.fillText(BRAND_NAME, rightCenterX, 130)

  context.font = '600 13px "Helvetica Neue", "PingFang SC", "Microsoft YaHei", sans-serif'
  context.letterSpacing = '6px'
  context.fillStyle = '#999999'
  context.fillText(posterCopy.inspiredBy, rightCenterX, 200)
  context.letterSpacing = '0px'

  context.font = 'bold 46px "Helvetica Neue", Arial, sans-serif'
  context.letterSpacing = '10px'
  context.fillStyle = '#000000'
  context.fillText(style.posterName.toUpperCase(), rightCenterX + 6, 260)
  context.letterSpacing = '0px'

  context.font = '300 18px "PingFang SC", "Microsoft YaHei", sans-serif'
  context.letterSpacing = '10px'
  context.fillStyle = '#555555'
  context.fillText(style.origin || style.tag, rightCenterX + 5, 310)
  context.letterSpacing = '0px'

  const sketchAreaWidth = 850
  const sketchAreaHeight = 680
  const sketchY = 390
  const scale = Math.min(sketchAreaWidth / sketch.width, sketchAreaHeight / sketch.height)
  const width = sketch.width * scale
  const height = sketch.height * scale

  context.save()
  context.globalCompositeOperation = 'multiply'
  context.drawImage(sketch, rightCenterX - width / 2, sketchY + (sketchAreaHeight - height) / 2, width, height)
  context.restore()

  const posterHeadline = getPosterHeadlineParts(ootd, posterLanguage, {
    primaryMaxLength: posterLanguage === 'english' ? 40 : 18,
    secondaryMaxLength: 42,
  })

  if (shouldRenderPosterCommentary(ootd, posterMode, posterLanguage) && posterHeadline.primary) {
    const primaryY = posterMode === 'commentary' ? 1068 : 1102
    context.textAlign = 'center'

    context.font =
      posterLanguage === 'english'
        ? 'italic 30px "Didot", "Bodoni 72", "Times New Roman", serif'
        : 'normal 32px "Songti SC", "Noto Serif CJK SC", "Times New Roman", serif'

    context.letterSpacing = '0px'
    context.fillStyle = '#111111'
    drawCenteredSingleLineText(context, posterHeadline.primary, rightCenterX, primaryY, 640)

    if (posterHeadline.secondary) {
      context.font = 'italic 18px "Baskerville", "Times New Roman", serif'
      context.fillStyle = '#666666'
      drawCenteredSingleLineText(context, posterHeadline.secondary, rightCenterX, primaryY + 30, 640)
    }
  }

  const commentaryBottomY = drawPosterCommentaryBlock(
    context,
    rightCenterX,
    posterLanguage === 'english' ? 1136 : 1168,
    560,
    ootd,
    posterMode,
    posterLanguage,
    {
      primaryFont:
        posterLanguage === 'english'
          ? 'italic 15px "Baskerville", "Times New Roman", serif'
          : 'normal 14px "Songti SC", "Noto Serif CJK SC", "Times New Roman", serif',
      primaryColor: '#555555',
      primaryLineHeight: posterLanguage === 'english' ? 22 : 24,
      secondaryFont: 'italic 13px "Baskerville", "Times New Roman", serif',
      secondaryColor: '#7A7A7A',
      secondaryLineHeight: 18,
      gapAfterLabel: posterLanguage === 'english' ? 28 : 30,
      gapBetweenSections: 16,
    },
  )

  const dividerY =
    posterMode === 'commentary'
      ? Math.min(
          posterLanguage === 'english' ? 1248 : 1290,
          Math.max(posterLanguage === 'english' ? 1228 : 1270, commentaryBottomY + 34),
        )
      : posterLanguage === 'english'
        ? 1244
        : 1268

  context.beginPath()
  context.strokeStyle = '#000000'
  context.lineWidth = 1
  context.moveTo(rightCenterX - 190, dividerY)
  context.lineTo(rightCenterX + 190, dividerY)
  context.stroke()

  context.fillStyle = '#000000'
  context.font = 'bold 24px "PingFang SC", "Microsoft YaHei", sans-serif'
  context.letterSpacing = '8px'
  context.fillText(posterCopy.archiveTitle, rightCenterX, dividerY + 50)

  context.font = '400 13px "PingFang SC", "Microsoft YaHei", sans-serif'
  context.letterSpacing = '3px'
  context.fillStyle = '#666666'
  context.fillText(posterCopy.archiveTagline, rightCenterX, dividerY + 85)

  const footerY = 1375
  context.font = '500 11px "Helvetica Neue", Arial, sans-serif'
  context.fillStyle = '#999999'
  context.letterSpacing = '4px'

  context.textAlign = 'left'
  context.fillText(`App:${BRAND_APP_LABEL}`, 1060, footerY)
  context.textAlign = 'center'
  context.fillText(BRAND_WEBSITE, rightCenterX, footerY)
  context.textAlign = 'right'
  context.fillText(`INS & TIKTOK : ${BRAND_HANDLE}`, 1940, footerY)
  context.letterSpacing = '0px'

  context.beginPath()
  context.strokeStyle = '#333333'
  context.lineWidth = 1.5
  context.moveTo(1880 - 14, 1350 - 14)
  context.lineTo(1880 + 14, 1350 + 14)
  context.moveTo(1880 + 14, 1350 - 14)
  context.lineTo(1880 - 14, 1350 + 14)
  context.stroke()
}

function renderVerticalPoster(context, canvas, original, sketch, style, ootd, posterMode, posterLanguage) {
  const centerX = canvas.width / 2
  const posterCopy = getPosterCopy(posterLanguage)

  drawCross(context, 80, 80)
  drawCross(context, 1360, 80)
  drawCross(context, 80, 1720)
  drawCross(context, 1360, 1720)

  context.textAlign = 'center'
  context.fillStyle = '#000000'
  context.font = 'italic 76px "Snell Roundhand", "Apple Chancery", "Brush Script MT", cursive, serif'
  context.fillText(BRAND_NAME, centerX, 130)

  context.font = '600 13px "Helvetica Neue", "PingFang SC", sans-serif'
  context.letterSpacing = '6px'
  context.fillStyle = '#999999'
  context.fillText(posterCopy.inspiredBy, centerX, 200)
  context.letterSpacing = '0px'

  context.font = 'bold 50px "Helvetica Neue", Arial, sans-serif'
  context.letterSpacing = '10px'
  context.fillStyle = '#000000'
  context.fillText(style.posterName.toUpperCase(), centerX + 7, 260)
  context.letterSpacing = '0px'

  context.font = '300 18px "PingFang SC", "Microsoft YaHei", sans-serif'
  context.letterSpacing = '10px'
  context.fillStyle = '#555555'
  context.fillText(style.origin || style.tag, centerX + 6, 310)
  context.letterSpacing = '0px'

  const matteX = 480
  const matteY = 360
  const matteWidth = 860
  const matteHeight = 980

  context.save()
  context.fillStyle = '#FBF6EA'
  context.fillRect(matteX, matteY, matteWidth, matteHeight)
  context.restore()

  const scale = Math.min(800 / sketch.width, 920 / sketch.height)
  const width = sketch.width * scale
  const height = sketch.height * scale

  context.save()
  context.globalCompositeOperation = 'multiply'
  context.drawImage(sketch, matteX + (matteWidth - width) / 2, matteY + (matteHeight - height) / 2, width, height)
  context.restore()

  context.save()
  context.shadowColor = 'rgba(0,0,0,0.12)'
  context.shadowBlur = 40
  context.shadowOffsetY = 20
  context.fillStyle = '#FFFFFF'
  context.fillRect(65, 465, 570, 750)
  context.restore()

  drawCoverCrop(context, original, 80, 480, 540, 720)

  context.save()
  context.translate(60, 1600)
  context.rotate(-Math.PI / 2)
  context.font = '500 14px "Helvetica Neue", Arial, sans-serif'
  context.fillStyle = '#AAAAAA'
  context.letterSpacing = '12px'
  context.textAlign = 'left'
  context.fillText('O U T F I T   O F   T H E   D A Y   //   # O O T D', 0, 0)
  context.restore()

  context.save()
  context.fillStyle = '#000000'
  context.fillRect(65, 540, 160, 46)
  context.fillStyle = '#FFFFFF'
  context.font = 'bold 16px "Helvetica Neue", Arial, sans-serif'
  context.textAlign = 'center'
  context.letterSpacing = '8px'
  context.fillText('#O.O.T.D', 145, 569)
  context.restore()

  const posterHeadline = getPosterHeadlineParts(ootd, posterLanguage, {
    primaryMaxLength: posterLanguage === 'english' ? 40 : 20,
    secondaryMaxLength: 46,
  })

  if (shouldRenderPosterCommentary(ootd, posterMode, posterLanguage) && posterHeadline.primary) {
    const primaryY = posterMode === 'commentary' ? 1398 : 1432
    context.textAlign = 'center'

    context.font =
      posterLanguage === 'english'
        ? 'italic 34px "Didot", "Bodoni 72", "Times New Roman", serif'
        : 'normal 36px "Songti SC", "Noto Serif CJK SC", "Times New Roman", serif'

    context.letterSpacing = '0px'
    context.fillStyle = '#111111'
    drawCenteredSingleLineText(context, posterHeadline.primary, centerX, primaryY, 780)

    if (posterHeadline.secondary) {
      context.font = 'italic 19px "Baskerville", "Times New Roman", serif'
      context.fillStyle = '#666666'
      drawCenteredSingleLineText(context, posterHeadline.secondary, centerX, primaryY + 36, 780)
    }
  }

  const commentaryBottomY = drawPosterCommentaryBlock(
    context,
    centerX,
    posterLanguage === 'english' ? 1458 : 1494,
    700,
    ootd,
    posterMode,
    posterLanguage,
    {
      primaryFont:
        posterLanguage === 'english'
          ? 'italic 16px "Baskerville", "Times New Roman", serif'
          : 'normal 15px "Songti SC", "Noto Serif CJK SC", "Times New Roman", serif',
      primaryColor: '#555555',
      primaryLineHeight: posterLanguage === 'english' ? 24 : 26,
      secondaryFont: 'italic 14px "Baskerville", "Times New Roman", serif',
      secondaryColor: '#7A7A7A',
      secondaryLineHeight: 19,
      gapAfterLabel: posterLanguage === 'english' ? 30 : 32,
      gapBetweenSections: 18,
    },
  )

  const dividerY =
    posterMode === 'commentary'
      ? Math.min(
          posterLanguage === 'english' ? 1578 : 1640,
          Math.max(posterLanguage === 'english' ? 1540 : 1606, commentaryBottomY + 38),
        )
      : posterLanguage === 'english'
        ? 1560
        : 1592

  context.beginPath()
  context.strokeStyle = '#000000'
  context.lineWidth = 1
  context.moveTo(centerX - 190, dividerY)
  context.lineTo(centerX + 190, dividerY)
  context.stroke()

  context.fillStyle = '#000000'
  context.font = 'bold 28px "PingFang SC", "Microsoft YaHei", sans-serif'
  context.letterSpacing = '8px'
  context.fillText(posterCopy.archiveTitle, centerX, dividerY + 60)

  context.textAlign = 'center'
  context.font = '400 14px "PingFang SC", "Microsoft YaHei", sans-serif'
  context.letterSpacing = '3px'
  context.fillStyle = '#666666'
  context.fillText(posterCopy.archiveTagline, centerX, dividerY + 100)

  const footerY = 1750
  context.font = '500 12px "Helvetica Neue", Arial, sans-serif'
  context.fillStyle = '#999999'
  context.letterSpacing = '4px'
  context.textAlign = 'left'
  context.fillText(`App:${BRAND_APP_LABEL}`, 80, footerY)
  context.textAlign = 'center'
  context.fillText(BRAND_WEBSITE, centerX, footerY)
  context.textAlign = 'right'
  context.fillText(`INS & TIKTOK : ${BRAND_HANDLE}`, 1360, footerY)
  context.letterSpacing = '0px'
}

function buildFallbackOotdAnalysis(style) {
  const headlineEn = 'Grace, cut with intention.'
  const headlineCn = '锋芒藏在线条背后'
  return {
    description: style.editorialDesc || style.enDesc || buildStyleRenderNotes(style),
    description_cn: '整体轮廓与线条逻辑识别清晰。',
    items: [],
    headline_en: headlineEn,
    headline_cn: headlineCn,
    hot_take_cn: '轮廓克制，时装基因却很鲜明。',
    editor_note_cn: '这组造型的线条、比例与轮廓关系已经很清楚，整体呈现出稳定而明确的时装语气。',
    editor_note_en: 'The silhouette carries a clear couture lineage.',
    stylist_note_cn: '从比例到线条，都能读到明确的风格谱系与年代回声。',
    stylist_note_en: 'The lines keep a poised editorial echo.',
    style_note_en: 'A clear silhouette with couture memory.',
    critique_en: headlineEn,
    critique_cn: headlineCn,
  }
}

function drawCross(context, x, y) {
  context.beginPath()
  context.strokeStyle = '#CCCCCC'
  context.lineWidth = 1.5
  context.moveTo(x - 20, y)
  context.lineTo(x + 20, y)
  context.moveTo(x, y - 20)
  context.lineTo(x, y + 20)
  context.stroke()
}

function drawCoverCrop(context, image, dx, dy, dWidth, dHeight) {
  const imageRatio = image.width / image.height
  const targetRatio = dWidth / dHeight
  let sx
  let sy
  let sw
  let sh

  if (imageRatio > targetRatio) {
    sh = image.height
    sw = image.height * targetRatio
    sx = (image.width - sw) / 2
    sy = 0
  } else {
    sw = image.width
    sh = image.width / targetRatio
    sx = 0
    sy = (image.height - sh) / 2
  }

  context.drawImage(image, sx, sy, sw, sh, dx, dy, dWidth, dHeight)
}

async function requestDirectOotdAnalysis(sourceImage, sourceMimeType, style, apiSettings, fetchWithRetry) {
  const base64Data = String(sourceImage || '').split(',')[1]
  if (!base64Data) throw new Error('Missing image data for analysis.')

  const data = await requestOpenAiChatCompletion(
    {
      apiSettings,
      model: apiSettings.analysisModel,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: buildDirectAnalysisPrompt() },
            { type: 'image_url', image_url: { url: `data:${sourceMimeType || 'image/jpeg'};base64,${base64Data}` } },
          ],
        },
      ],
    },
    fetchWithRetry,
  )

  let analysisText = extractAssistantText(data?.choices?.[0]?.message?.content) || '{}'
  analysisText = analysisText.replace(/```json/gi, '').replace(/```/g, '').trim()
  return sanitizeOotdAnalysis(safeJsonParse(analysisText), style)
}

async function requestFashionSketch(sourceImage, sourceMimeType, style, ootd, apiSettings, fetchWithRetry) {
  const base64Data = String(sourceImage || '').split(',')[1]
  if (!base64Data) throw new Error('Missing image data for generation.')

  const imageToImagePrompt = [
    'Transform this exact uploaded photo into a 2D hand-drawn fashion sketch.',
    'Return only one generated image and no explanatory text.',
    'Keep the same face identity, hairstyle, skin tone, pose, framing, body proportions, and outfit details from the original image.',
    'Do not redesign the clothing. Apply style only through line quality, brushwork, shading language, and presentation finish.',
    'Preserve the visible crop and composition from the uploaded photo.',
    'Maintain elegant editorial energy and readable garment structure.',
    `Style instructions: ${buildStyleRenderNotes(style)}`,
    `Reference description: ${ootd?.description || style.editorialDesc}.`,
    'No designer names, logos, signatures, watermarks, labels, or printed text anywhere in the image.',
  ].join(' ')

  try {
    const data = await requestOpenAiChatCompletion(
      {
        apiSettings,
        model: apiSettings.imageModel,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: imageToImagePrompt },
              { type: 'image_url', image_url: { url: `data:${sourceMimeType || 'image/jpeg'};base64,${base64Data}` } },
            ],
          },
        ],
      },
      fetchWithRetry,
    )

    const messageText = extractAssistantText(data?.choices?.[0]?.message?.content)
    const imageDataUrl = extractImageDataUrl(messageText)
    if (imageDataUrl) return imageDataUrl
  } catch (error) {
    console.warn('Primary image generation failed, switching to text-only fallback:', error)
  }

  const textToImagePrompt = [
    'Create a 2D hand-drawn fashion sketch on a clean white or warm ivory background.',
    'Return only one generated image and no explanatory text.',
    'Use this outfit description as the exact reference:',
    ootd?.description || style.editorialDesc,
    `Apply this rendering language: ${buildStyleRenderNotes(style)}`,
    'Keep the result editorial, poised, and paper-like, with no visible text or logos.',
  ].join(' ')

  const fallbackData = await requestOpenAiChatCompletion(
    {
      apiSettings,
      model: apiSettings.fallbackImageModel || apiSettings.imageModel,
      messages: [
        {
          role: 'user',
          content: textToImagePrompt,
        },
      ],
    },
    fetchWithRetry,
  )

  const fallbackText = extractAssistantText(fallbackData?.choices?.[0]?.message?.content)
  const fallbackImage = extractImageDataUrl(fallbackText)
  if (!fallbackImage) {
    throw new Error('Image generation did not return an image payload. / 当前接口没有返回可用图片。')
  }
  return fallbackImage
}

async function requestOpenAiChatCompletion({ apiSettings, model, messages }, fetchWithRetry) {
  const baseUrl = normalizeApiBaseUrl(apiSettings.baseUrl)
  const apiKey = String(apiSettings.apiKey || '').trim()
  if (!baseUrl) {
    throw new Error('Missing API base URL. / 缺少 API 地址。')
  }

  const headers = {
    'Content-Type': 'application/json',
  }
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`

  return fetchWithRetry(
    `${baseUrl}/chat/completions`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model,
        messages,
        stream: false,
      }),
    },
    2,
  )
}

function buildDirectAnalysisPrompt() {
  return [
    'Act as a top-tier Vogue fashion critic and fashion-forensics profiler. Analyze the clothing style in this image.',
    'This output is for a highly shareable editorial fashion commentary card.',
    'Observe only visible facts from the uploaded look.',
    'Focus on garment silhouette, tailoring language, proportion, material mood, era references, and house-code fashion DNA.',
    'Do not evaluate the person\'s attractiveness, body, or expression.',
    'Ignore shoes, bags, hats, jewelry, and background.',
    'If a detail is obscured or uncertain, omit it instead of guessing.',
    'Output ONLY a valid JSON object with NO markdown formatting, NO backticks.',
    'Use exactly this schema in the final JSON object:',
    '{"items":[{"item":"中文单品名","color_pallet":["#RRGGBB","#RRGGBB"]}],"description":"comma-separated list of visible clothing details and silhouette cues","description_cn":"中文识别总结","headline_en":"Short editorial cover line in English","headline_cn":"适合截图传播的中文标题","hot_take_cn":"一句点出风格基因的中文时装评语","editor_note_cn":"解释造型时尚基因与风格出处的专业短评","editor_note_en":"Positive English note explaining the look style DNA","stylist_note_cn":"一句描写其风格谱系或时装回响的正向短评","stylist_note_en":"Positive English note describing the look fashion echo","style_note_en":"One-line positive English note on the look fashion DNA"}',
    'Rules:',
    '1. Use Simplified Chinese for item names and all Chinese commentary fields.',
    '2. description must be English and visually specific.',
    '3. headline_en must be the elegant English companion to headline_cn, concise and no more than 6 words.',
    '4. headline_cn is the one-line poster commentary: poetic, elevated, memorable, and suitable for a luxury fashion poster, around 8 to 16 Chinese characters.',
    '5. hot_take_cn must positively identify the look\'s fashion DNA, around 12 to 22 Chinese characters.',
    '6. editor_note_cn must explain the look\'s style lineage, silhouette logic, or couture references in a positive, professional tone, around 28 to 48 Chinese characters.',
    '7. editor_note_en must express the same fashion-DNA reading in elegant English, around 8 to 18 words.',
    '8. stylist_note_cn must describe the look\'s style echo, fashion lineage, or editorial mood in a positive tone, around 18 to 36 Chinese characters.',
    '9. stylist_note_en must express that fashion echo in elegant English, around 8 to 18 words.',
    '10. Do not give any numeric rating, letter grade, or score.',
    '11. Let headline_cn lightly echo the cadence of classic couture criticism or Vogue-style show reviews, but do not directly quote any famous sentence.',
    '12. headline_cn and headline_en should read naturally together in one bilingual line.',
    '13. Keep the tone appreciative, refined, and non-negative.',
    '14. Prefer metaphor, restraint, and precision over generic praise.',
    '15. Avoid internet slang, emoji, and cliche words such as 高级感拉满, 美疯了, 绝了.',
    '16. style_note_en must be refined, positive, and concise, around 6 to 12 words.',
    '17. Each color must be uppercase #RRGGBB.',
  ].join(' ')
}

function sanitizeOotdAnalysis(payload, style) {
  if (!payload || typeof payload !== 'object') return buildFallbackOotdAnalysis(style || DESIGNER_STYLES[0])

  const items = sanitizeAnalysisItems(payload.items)
  const fallback = buildFallbackOotdAnalysis(style || DESIGNER_STYLES[0])
  const description = sanitizeInlineText(payload.description).slice(0, 320) || fallback.description
  const descriptionCn =
    sanitizeInlineText(payload.description_cn).slice(0, 72) ||
    (items.length ? `${items.map((item) => item.item).join('、')}识别清晰。`.slice(0, 72) : fallback.description_cn)
  const headlineEn = sanitizeInlineText(payload.headline_en || payload.critique_en).slice(0, 80) || fallback.headline_en
  const headlineCn = sanitizeInlineText(payload.headline_cn || payload.critique_cn).slice(0, 24) || fallback.headline_cn
  const hotTakeCn = sanitizeInlineText(payload.hot_take_cn).slice(0, 40) || fallback.hot_take_cn
  const editorNoteCn = sanitizeInlineText(payload.editor_note_cn).slice(0, 120) || fallback.editor_note_cn
  const editorNoteEn = sanitizeInlineText(payload.editor_note_en).slice(0, 220) || fallback.editor_note_en
  const stylistNoteCn = sanitizeInlineText(payload.stylist_note_cn).slice(0, 80) || fallback.stylist_note_cn
  const stylistNoteEn = sanitizeInlineText(payload.stylist_note_en).slice(0, 220) || fallback.stylist_note_en
  const styleNoteEn = sanitizeInlineText(payload.style_note_en).slice(0, 120) || fallback.style_note_en

  return {
    items,
    description,
    description_cn: descriptionCn,
    headline_en: headlineEn,
    headline_cn: headlineCn,
    hot_take_cn: hotTakeCn,
    editor_note_cn: editorNoteCn,
    editor_note_en: editorNoteEn,
    stylist_note_cn: stylistNoteCn,
    stylist_note_en: stylistNoteEn,
    style_note_en: styleNoteEn,
    critique_en: headlineEn,
    critique_cn: headlineCn,
  }
}

function sanitizeAnalysisItems(items) {
  if (!Array.isArray(items)) return []

  return items
    .map((item) => ({
      item: sanitizeInlineText(item?.item).slice(0, 20),
      color_pallet: Array.isArray(item?.color_pallet)
        ? item.color_pallet
            .map((color) => sanitizeInlineText(color).toUpperCase())
            .filter((color) => /^#[0-9A-F]{6}$/.test(color))
            .slice(0, 5)
        : [],
    }))
    .filter((item) => item.item)
}

function sanitizeInlineText(value) {
  return String(value || '').replace(/\s+/g, ' ').trim()
}

function shouldRenderPosterCommentary(ootd, posterMode, posterLanguage) {
  if (!ootd || !posterMode) return false
  return Boolean(getPosterHeadlineParts(ootd, posterLanguage).primary)
}

function getPosterCopy(posterLanguage) {
  if (posterLanguage === 'english') {
    return {
      inspiredBy: 'FASHION SKETCH INSPIRED BY',
      fashionDnaLabel: 'FASHION DNA',
      archiveTitle: 'WORLD FASHION LIBRARY',
      archiveTagline: 'Find us on REDnote: @世界时装阅览室',
    }
  }

  return {
    inspiredBy: 'FASHION SKETCH INSPIRED BY / 灵感源自',
    fashionDnaLabel: 'FASHION DNA / 时尚基因',
    archiveTitle: '世界时装阅览室',
    archiveTagline: '🔍 搜索小红书：@世界时装阅览室 生成同款大师手稿',
  }
}

function renderEditorialHeadlineMarkup(ootd, posterLanguage) {
  const headline = getPosterHeadlineParts(ootd, posterLanguage, {
    primaryMaxLength: posterLanguage === 'english' ? 64 : 22,
    secondaryMaxLength: 64,
  })
  if (!headline.primary) return null
  if (!headline.secondary) return <p className="font-serif text-2xl leading-tight text-white">{headline.primary}</p>

  return (
    <>
      <p className="font-serif text-2xl leading-tight text-white">{headline.primary}</p>
      <p className="font-serif text-sm italic leading-tight text-gray-300">{headline.secondary}</p>
    </>
  )
}

function getPosterSecondaryParts(ootd, posterMode, posterLanguage) {
  if (posterMode !== 'commentary' || !ootd) return { primary: '', secondary: '' }
  if (posterLanguage === 'english') {
    return {
      primary: sanitizeInlineText(ootd.editor_note_en || ootd.style_note_en || ootd.headline_en || ootd.critique_en),
      secondary: '',
    }
  }

  return {
    primary: sanitizeInlineText(ootd.editor_note_cn || ootd.hot_take_cn || ootd.stylist_note_cn),
    secondary: sanitizeInlineText(ootd.editor_note_en || ootd.style_note_en),
  }
}

function getPosterHeadlineParts(
  ootd,
  posterLanguage,
  { primaryMaxLength = 18, secondaryMaxLength = 42 } = {},
) {
  if (!ootd) return { primary: '', secondary: '' }
  const headlineCn = sanitizeInlineText(ootd.headline_cn || ootd.critique_cn)
  const headlineEn = sanitizeInlineText(ootd.headline_en || ootd.critique_en)
  if (posterLanguage === 'english') {
    return { primary: (headlineEn || headlineCn).slice(0, primaryMaxLength), secondary: '' }
  }

  return {
    primary: headlineCn.slice(0, primaryMaxLength),
    secondary: headlineEn.slice(0, secondaryMaxLength),
  }
}

function drawCenteredSingleLineText(context, text, centerX, y, maxWidth) {
  const trimmed = trimCanvasTextToWidth(context, text, maxWidth)
  if (!trimmed) return
  context.fillText(trimmed, centerX, y)
}

function drawPosterCommentaryBlock(
  context,
  centerX,
  labelY,
  maxWidth,
  ootd,
  posterMode,
  posterLanguage,
  {
    primaryFont,
    primaryColor,
    primaryLineHeight,
    secondaryFont,
    secondaryColor,
    secondaryLineHeight,
    gapAfterLabel = 28,
    gapBetweenSections = 16,
  },
) {
  const posterSecondary = getPosterSecondaryParts(ootd, posterMode, posterLanguage)
  if (!posterSecondary.primary) return labelY

  context.textAlign = 'center'
  context.font = '600 10px "Helvetica Neue", "PingFang SC", "Microsoft YaHei", sans-serif'
  context.letterSpacing = '4px'
  context.fillStyle = '#888888'
  context.fillText(getPosterCopy(posterLanguage).fashionDnaLabel, centerX, labelY)
  context.letterSpacing = '0px'

  let cursorY = labelY + gapAfterLabel
  context.font = primaryFont
  context.fillStyle = primaryColor
  cursorY = drawCenteredWrappedText(context, posterSecondary.primary, centerX, cursorY, maxWidth, primaryLineHeight)

  if (posterSecondary.secondary) {
    cursorY += gapBetweenSections
    context.font = secondaryFont
    context.fillStyle = secondaryColor
    cursorY = drawCenteredWrappedText(context, posterSecondary.secondary, centerX, cursorY, maxWidth, secondaryLineHeight)
  }

  return cursorY
}

function drawCenteredWrappedText(context, text, centerX, startY, maxWidth, lineHeight) {
  const lines = wrapCanvasText(context, text, maxWidth)
  if (!lines.length) return startY
  lines.forEach((line, index) => {
    context.fillText(line, centerX, startY + index * lineHeight)
  })
  return startY + (lines.length - 1) * lineHeight
}

function wrapCanvasText(context, text, maxWidth) {
  const cleaned = sanitizeInlineText(text)
  if (!cleaned) return []
  const tokens = cleaned.match(/[\u3400-\u9FFF]|[^\s\u3400-\u9FFF]+|\s+/g) || [cleaned]
  const lines = []
  let currentLine = ''

  for (const token of tokens) {
    const candidate = `${currentLine}${token}`
    if (!currentLine || context.measureText(candidate.trimEnd()).width <= maxWidth) {
      currentLine = candidate
      continue
    }
    lines.push(currentLine.trim())
    currentLine = token.trimStart()
  }

  if (currentLine.trim()) lines.push(currentLine.trim())
  return lines
}

function trimCanvasTextToWidth(context, text, maxWidth) {
  let result = text.trim()
  while (result && context.measureText(`${result}…`).width > maxWidth) {
    result = result.slice(0, -1).trimEnd()
  }
  if (result !== text.trim()) return `${result}…`
  return result
}

function safeJsonParse(value) {
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

function normalizeApiBaseUrl(baseUrl) {
  return String(baseUrl || '').trim().replace(/\/+$/, '')
}

function extractAssistantText(content) {
  if (typeof content === 'string') return content
  if (!Array.isArray(content)) return ''
  return content
    .map((item) => {
      if (typeof item === 'string') return item
      if (item?.type === 'text') return item.text || ''
      return ''
    })
    .join('\n')
    .trim()
}

function extractImageDataUrl(text) {
  const match = String(text || '').match(/data:image\/[a-zA-Z0-9.+-]+;base64,[A-Za-z0-9+/=]+/i)
  return match ? match[0] : ''
}

async function prepareUploadImage(file) {
  const image = await loadFileAsImage(file)
  const scale = Math.min(1, MAX_UPLOAD_EDGE / Math.max(image.width, image.height))
  const targetWidth = Math.max(1, Math.round(image.width * scale))
  const targetHeight = Math.max(1, Math.round(image.height * scale))
  const canvas = document.createElement('canvas')
  canvas.width = targetWidth
  canvas.height = targetHeight
  const context = canvas.getContext('2d')
  context.fillStyle = '#FFFFFF'
  context.fillRect(0, 0, targetWidth, targetHeight)
  context.drawImage(image, 0, 0, targetWidth, targetHeight)
  return { dataUrl: canvas.toDataURL('image/jpeg', UPLOAD_QUALITY), mimeType: 'image/jpeg' }
}

async function normalizeGeneratedImage(imageDataUrl) {
  const image = await loadImageFromUrl(imageDataUrl)
  const scale = Math.min(1, MAX_GENERATED_EDGE / Math.max(image.width, image.height))
  if (scale >= 0.999) return imageDataUrl
  const targetWidth = Math.max(1, Math.round(image.width * scale))
  const targetHeight = Math.max(1, Math.round(image.height * scale))
  const canvas = document.createElement('canvas')
  canvas.width = targetWidth
  canvas.height = targetHeight
  const context = canvas.getContext('2d')
  context.fillStyle = '#FFFFFF'
  context.fillRect(0, 0, targetWidth, targetHeight)
  context.drawImage(image, 0, 0, targetWidth, targetHeight)
  return canvasToObjectUrl(canvas, UPLOAD_QUALITY)
}

function canvasToObjectUrl(canvas, quality = UPLOAD_QUALITY) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Poster export failed. Please try again.'))
          return
        }
        resolve(URL.createObjectURL(blob))
      },
      'image/jpeg',
      quality,
    )
  })
}

function loadFileAsImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Image reading failed. Please try another photo.'))
    reader.onload = () => {
      const image = new Image()
      image.onerror = () => reject(new Error('Image parsing failed. Please try another photo.'))
      image.onload = () => resolve(image)
      image.src = String(reader.result || '')
    }
    reader.readAsDataURL(file)
  })
}

function loadImageFromUrl(src) {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onerror = () => reject(new Error('Image parsing failed. Please try another photo.'))
    image.onload = () => resolve(image)
    image.src = String(src || '')
  })
}

function replaceObjectUrl(ref, nextUrl, setter) {
  revokeObjectUrlRef(ref)
  ref.current = typeof nextUrl === 'string' && nextUrl.startsWith('blob:') ? nextUrl : null
  setter(nextUrl)
}

function revokeObjectUrlRef(ref, setter) {
  if (typeof ref?.current === 'string' && ref.current.startsWith('blob:')) {
    URL.revokeObjectURL(ref.current)
  }
  if (ref) ref.current = null
  if (setter) setter(null)
}
