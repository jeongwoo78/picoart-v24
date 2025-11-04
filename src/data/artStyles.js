// PicoArt v24-revised - 인터페이스 개편 (보여주기 집중 + 친절한 교육)
// UI: 간결하게 (era, essence)
// 교육: 친절하게 (birth, death, lifespan, features, intro 유지)
// 연대기 순 정렬 (고대 → 현대)

export const styleCategories = {
  ancient: { name: '고대 미술', period: 'BC 800 ~ AD 500', era: '기원전~5세기', order: 1 },
  byzantineIslamic: { name: '비잔틴·이슬람', period: 'AD 400 ~ 1400', era: '5~15세기', order: 2 },
  renaissance: { name: '르네상스', period: '1400-1600', era: '15~16세기', order: 3 },
  baroque: { name: '바로크', period: '1600-1750', era: '17~18세기 초', order: 4 },
  rococo: { name: '로코코', period: '1700-1780', era: '18세기', order: 5 },
  romanticism: { name: '낭만주의', period: '1780-1850', era: '19세기 초반', order: 6 },
  impressionism: { name: '인상주의', period: '1860-1890', era: '19세기 후반', order: 7 },
  postImpressionism: { name: '후기인상주의', period: '1880-1910', era: '19세기 말', order: 8 },
  fauvism: { name: '야수파', period: '1900-1910', era: '20세기 초', order: 9 },
  expressionism: { name: '표현주의', period: '1905-1925', era: '20세기 초', order: 10 },
  masters: { name: '거장', period: '1862-1989', era: '19~20세기', order: 11 },
  oriental: { name: '동양화', period: '1600-1900', era: '17~19세기', order: 12 }
};

export const artStyles = [
  
  // ==================== 1. 고대 미술 ====================
  
  {
    id: 'greek-roman',
    category: 'ancient',
    model: 'SDXL',
    order: 1,
    name: '그리스·로마',
    nameEn: 'Greek & Roman Art',
    description: '고전 조각의 이상적 균형미',
    artist: {
      name: '고전 조각 양식',
      nameEn: 'Classical Sculpture Style',
      period: 'BC 800 ~ AD 500',
      birth: null,
      death: null,
      lifespan: 'BC 800 ~ AD 500',
      nationality: '그리스·로마',
      movement: '고대 미술',
      essence: '이상적 인체 비례, 사실적 표현, 완벽한 균형미',
      features: '이상적 인체 비례, 사실적 표현, 완벽한 균형미',
      masterpieces: ['밀로의 비너스', '라오콘 군상', '아우구스투스 조각상'],
      intro: '그리스·로마 미술은 인체의 이상적 아름다움을 추구했습니다. 완벽한 비례와 균형을 통해 신과 영웅을 표현했으며, 서양 미술의 기초가 되었습니다.'
    },
    prompt: 'Classical Greek and Roman sculpture painting style, idealized human proportions with perfect symmetry, marble-like smooth rendering, heroic noble figures, classical drapery folds, temple architecture background, serene dignified expressions, painted in ancient classical masterpiece quality',
    color: '#8B7355',
    icon: '🏛️'
  },

  {
    id: 'byzantine-islamic',
    category: 'byzantineIslamic',
    model: 'SDXL',
    order: 2,
    name: '비잔틴·이슬람',
    nameEn: 'Byzantine & Islamic Art',
    description: '황금 모자이크와 기하학 문양',
    artist: {
      name: '비잔틴·이슬람 양식',
      nameEn: 'Byzantine & Islamic Style',
      period: 'AD 400 ~ 1400',
      birth: null,
      death: null,
      lifespan: 'AD 400 ~ 1400',
      nationality: '동로마·이슬람 문화권',
      movement: '고대 미술',
      essence: '황금 모자이크, 기하학 문양, 종교적 상징성',
      features: '황금 모자이크, 기하학 문양, 종교적 상징성',
      masterpieces: ['하기아 소피아 모자이크', '알함브라 궁전', '바위의 돔'],
      intro: '비잔틴은 황금빛 모자이크로 신성함을, 이슬람은 기하학 문양으로 무한의 아름다움을 표현했습니다.'
    },
    subStyles: {
      byzantine: {
        prompt: 'Byzantine religious icon painting style, golden mosaic background, sacred solemn frontal figures, ornate halos, jewel-toned colors, flattened perspective, spiritual transcendent atmosphere, painted in Byzantine masterpiece quality'
      },
      islamic: {
        prompt: 'Islamic decorative art painting style, intricate geometric arabesque patterns, Islamic calligraphy elements, turquoise and cobalt blue colors, gold accents, no human figures, symmetrical designs, ornamental floral motifs, painted in Islamic art masterpiece quality'
      }
    },
    color: '#FFD700',
    icon: '🕌'
  },

  // ==================== 10. 거장 (거장 탭 전용) - 연대기순 ====================
  
  {
    id: 'vangogh-master',
    category: 'masters',
    model: 'SDXL',
    isMaster: true,
    order: 36,
    name: '빈센트 반 고흐',
    nameEn: 'Vincent van Gogh',
    description: '소용돌이치는 별밤',
    artist: {
      name: '빈센트 반 고흐',
      nameEn: 'Vincent van Gogh',
      period: '1853-1890',
      birth: 1853,
      death: 1890,
      lifespan: '1853-1890 (37세)',
      era: '19세기 중후반',
      nationality: '네덜란드',
      movement: '후기인상주의',
      essence: '격렬한 감정의 직접적 표현, 두터운 임파스토, 회오리치는 에너지',
      features: '격렬한 감정의 직접적 표현, 두터운 임파스토, 회오리치는 에너지',
      masterpieces: ['별이 빛나는 밤', '해바라기', '까마귀가 나는 밀밭'],
      intro: '비극적 삶과 불멸의 예술. 10년간 그린 900점의 작품으로 표현주의와 20세기 미술 전체에 혁명을 일으킨 천재입니다.'
    },
    prompt: 'Vincent van Gogh Post-Impressionist painting style, bold expressive swirling brushstrokes full of emotion, vibrant intense colors with yellows blues and oranges, thick impasto paint application creating texture, turbulent energetic movement, starry nights and sunflower fields, cypress trees, painted in van Gogh passionate masterpiece quality',
    color: '#F4C430',
    icon: '🌟'
  },

  {
    id: 'klimt',
    category: 'masters',
    model: 'SDXL',
    isMaster: true,
    order: 37,
    name: '구스타프 클림트',
    nameEn: 'Gustav Klimt',
    description: '황금빛 장식의 대가',
    artist: {
      name: '구스타프 클림트',
      nameEn: 'Gustav Klimt',
      period: '1862-1918',
      birth: 1862,
      death: 1918,
      lifespan: '1862-1918 (55세)',
      era: '19세기 중후반',
      nationality: '오스트리아',
      movement: '아르누보',
      essence: '황금시대 비잔틴 부활, 에로티시즘과 신성함의 융합, 장식예술의 회화적 승화',
      features: '황금시대 비잔틴 부활, 에로티시즘과 신성함의 융합, 장식예술의 회화적 승화',
      masterpieces: ['키스', '아델레 블로흐바우어의 초상', '다나에'],
      intro: '세기말 비엔나의 황제. 빈 분리파를 이끌며 전통과 결별했고, 황금빛 장식으로 현대 그래픽 디자인의 토대를 세웠습니다.'
    },
    prompt: 'Gustav Klimt Art Nouveau style, luxurious gold leaf and metallic patterns, intricate decorative ornamental designs with spirals and geometric shapes, sensual elongated figures embraced in golden embrace, mosaic-like surfaces with Byzantine influence, rich jewel-tone colors, symbolic mystical imagery, flat ornamental space, painted in Klimt opulent Viennese Art Nouveau masterpiece quality',
    color: '#FFD700',
    icon: '✨'
  },

  {
    id: 'munch-master',
    category: 'masters',
    model: 'SDXL',
    isMaster: true,
    order: 38,
    name: '에드바르 뭉크',
    nameEn: 'Edvard Munch',
    description: '절규하는 영혼',
    artist: {
      name: '에드바르 뭉크',
      nameEn: 'Edvard Munch',
      period: '1863-1944',
      birth: 1863,
      death: 1944,
      lifespan: '1863-1944 (80세)',
      era: '19세기 중후반',
      nationality: '노르웨이',
      movement: '표현주의',
      essence: '심리적 두려움의 시각화, 색채 심리학, 반복적 주제 탐구',
      features: '심리적 두려움의 시각화, 색채 심리학, 반복적 주제 탐구',
      masterpieces: ['절규', '생명의 춤', '별이 빛나는 밤'],
      intro: '현대인의 불안을 그린 선지자. "절규"는 20세기 가장 영향력 있는 이미지가 되었으며, 80년 생애 동안 실존적 고통을 예술로 승화시켰습니다.'
    },
    prompt: 'Edvard Munch Expressionist painting style, intense psychological anxiety and existential emotion, distorted swirling forms conveying inner turmoil, sinuous flowing lines creating movement, dramatic color contrasts with reds oranges and blues, isolated alienated figures, screaming faces and expressions of anguish, haunting atmospheric quality, painted in Munch emotionally powerful masterpiece quality',
    color: '#E74C3C',
    icon: '😱'
  },

  {
    id: 'matisse-master',
    category: 'masters',
    model: 'SDXL',
    isMaster: true,
    order: 39,
    name: '앙리 마티스',
    nameEn: 'Henri Matisse',
    description: '색채의 조화',
    artist: {
      name: '앙리 마티스',
      nameEn: 'Henri Matisse',
      period: '1869-1954',
      birth: 1869,
      death: 1954,
      lifespan: '1869-1954 (84세)',
      era: '19세기 중후반',
      nationality: '프랑스',
      movement: '야수파',
      essence: '색채 자체의 독립적 힘, 평면적 장식성, 기쁨의 철학',
      features: '색채 자체의 독립적 힘, 평면적 장식성, 기쁨의 철학',
      masterpieces: ['춤', '음악', '재즈 (컷아웃)'],
      intro: '20세기 색채혁명의 거장. 피카소와 쌍벽을 이루며 현대미술을 이끌었고, 84세까지 끊임없이 혁신하며 "가위로 그림을 그렸습니다".'
    },
    prompt: 'Henri Matisse Fauvist painting style, bold pure non-naturalistic colors for emotional effect, simplified decorative forms with flowing contours, vibrant reds greens blues and purples in harmonious arrangements, dance and music themes with joyful movement, flat pattern-like surfaces, sensual elegant compositions, painted in Matisse refined Fauvist masterpiece quality',
    color: '#FF1744',
    icon: '💃'
  },

  {
    id: 'picasso',
    category: 'masters',
    model: 'SDXL',
    isMaster: true,
    order: 40,
    name: '파블로 피카소',
    nameEn: 'Pablo Picasso',
    description: '입체주의의 혁명가',
    artist: {
      name: '파블로 피카소',
      nameEn: 'Pablo Picasso',
      period: '1881-1973',
      birth: 1881,
      death: 1973,
      lifespan: '1881-1973 (91세)',
      era: '19세기 말',
      nationality: '스페인',
      movement: '입체주의',
      essence: '시점의 혁명적 해체, 형태의 기하학적 재구성, 끊임없는 양식 변화',
      features: '시점의 혁명적 해체, 형태의 기하학적 재구성, 끊임없는 양식 변화',
      masterpieces: ['아비뇽의 처녀들', '게르니카', '꿈'],
      intro: '20세기 미술의 절대 군주. 입체주의로 500년 원근법을 파괴했고, 91년 생애 동안 5만점을 창조하며 미술사 자체를 재정의했습니다.'
    },
    prompt: 'Pablo Picasso Cubist painting style, fragmented geometric forms showing multiple viewpoints simultaneously, angular faceted planes intersecting, analytical deconstruction of subjects, overlapping transparent surfaces, revolutionary approach to perspective and space, painted in Picasso groundbreaking Cubist masterpiece quality',
    color: '#795548',
    icon: '🎭'
  },

  {
    id: 'dali',
    category: 'masters',
    model: 'SDXL',
    isMaster: true,
    order: 41,
    name: '살바도르 달리',
    nameEn: 'Salvador Dalí',
    description: '초현실주의의 꿈',
    artist: {
      name: '살바도르 달리',
      nameEn: 'Salvador Dalí',
      period: '1904-1989',
      birth: 1904,
      death: 1989,
      lifespan: '1904-1989 (84세)',
      era: '19~20세기 초',
      nationality: '스페인',
      movement: '초현실주의',
      essence: '무의식의 정밀한 시각화, 편집광적 비판방법, 상징의 극대화',
      features: '무의식의 정밀한 시각화, 편집광적 비판방법, 상징의 극대화',
      masterpieces: ['기억의 지속', '아토믹 레다', '십자가의 성 요한'],
      intro: '광기와 천재의 경계. 프로이트의 무의식을 완벽한 기교로 구현했고, 예술가를 브랜드화한 최초의 현대 아티스트입니다.'
    },
    prompt: 'Salvador Dalí Surrealist painting style, hyper-realistic precise details in impossible dreamlike scenes, melting distorted objects defying physics and logic, vast empty desert landscapes with dramatic perspective, symbolic metaphorical imagery from subconscious mind, smooth glossy surfaces with meticulous rendering, mysterious golden light creating long shadows, painted in Dalí iconic Surrealist masterpiece quality',
    color: '#F39C12',
    icon: '🎨'
  },

  // ==================== 11. 동양화 ====================
  
  // ============= 동양화 (Oriental Art) - 국가별 3개 =============
  
  {
    id: 'korean',
    category: 'oriental',
    model: 'SDXL',
    order: 39,
    name: '한국',
    nameEn: 'Korean Art',
    description: '한국 전통 미술',
    artist: {
      name: '한국 전통 미술',
      nameEn: 'Korean Traditional Art',
      period: '조선시대 (1400-1900)',
      birth: null,
      death: null,
      lifespan: '조선시대 (1400-1900)',
      nationality: '한국',
      movement: '동양화',
      essence: '민화, 수묵화, 단청',
      features: '민화, 수묵화, 단청',
      masterpieces: ['호작도', '인왕제색도', '경복궁 단청'],
      intro: '한국 전통 미술. AI가 사진 특성에 따라 민화, 수묵화, 단청 중 최적의 스타일을 자동으로 선택합니다.'
    },
    prompt: 'Korean traditional art style, vibrant folk painting or elegant ink wash or decorative dancheong, Korean aesthetic with obangsaek colors, traditional Korean paper texture, painted in Joseon dynasty masterpiece quality',
    color: '#FF6B6B',
    icon: '🇰🇷',
    // AI가 선택할 하위 스타일들
    subStyles: ['korean-minhwa', 'korean-sumukhwa', 'korean-dancheong']
  },

  {
    id: 'chinese',
    category: 'oriental',
    model: 'SDXL',
    order: 40,
    name: '중국',
    nameEn: 'Chinese Art',
    description: '중국 전통 미술',
    artist: {
      name: '중국 전통 미술',
      nameEn: 'Chinese Traditional Art',
      period: '송~청대 (1000-1900)',
      birth: null,
      death: null,
      lifespan: '송~청대 (1000-1900)',
      nationality: '중국',
      movement: '동양화',
      essence: '수묵화, 공필화, 산수화',
      features: '수묵화, 공필화, 산수화',
      masterpieces: ['제백석의 새우', '청명상하도', '천리강산도'],
      intro: '중국 전통 미술. AI가 사진 특성에 따라 수묵화, 공필화, 산수화 중 최적의 스타일을 자동으로 선택합니다.'
    },
    prompt: 'Chinese traditional art style, ink wash painting or meticulous gongbi or majestic landscape, Chinese aesthetic with mineral pigments, elegant brushwork, painted in Song-Qing dynasty masterpiece quality',
    color: '#DC143C',
    icon: '🇨🇳',
    subStyles: ['chinese-ink', 'chinese-gongbi', 'chinese-landscape']
  },

  {
    id: 'japanese',
    category: 'oriental',
    model: 'SDXL',
    order: 41,
    name: '일본',
    nameEn: 'Japanese Art',
    description: '일본 전통 미술',
    artist: {
      name: '일본 전통 미술',
      nameEn: 'Japanese Traditional Art',
      period: '에도시대 (1600-1900)',
      birth: null,
      death: null,
      lifespan: '에도시대 (1600-1900)',
      nationality: '일본',
      movement: '동양화',
      essence: '우키요에, 수묵화, 린파',
      features: '우키요에, 수묵화, 린파',
      masterpieces: ['호쿠사이의 파도', '셋슈의 산수도', '고린의 홍백매도'],
      intro: '일본 전통 미술. AI가 사진 특성에 따라 우키요에, 수묵화, 린파 중 최적의 스타일을 자동으로 선택합니다.'
    },
    prompt: 'Japanese traditional art style, ukiyo-e woodblock print or zen ink painting or rinpa decorative art, Japanese aesthetic with elegant simplicity, traditional Japanese paper texture, painted in Edo period masterpiece quality',
    color: '#4169E1',
    icon: '🇯🇵',
    subStyles: ['japanese-ukiyoe', 'japanese-sumi-e', 'japanese-rinpa']
  },

  // ============= 하위 스타일들 (숨김 - AI 선택용) =============
  
  {
    id: 'korean-minhwa',
    category: 'oriental-detail',  // 숨김 카테고리
    model: 'SDXL',
    order: 100,
    name: '한국 민화',
    nameEn: 'Korean Minhwa',
    description: '호랑이와 모란의 해학',
    artist: {
      name: '한국 민화 양식',
      nameEn: 'Korean Folk Painting Style',
      period: '조선시대 (1600-1900)',
      birth: null,
      death: null,
      lifespan: '조선시대 (1600-1900)',
      nationality: '한국',
      movement: '동양화',
      essence: '소박한 해학, 밝은 원색, 호랑이와 까치',
      features: '소박한 해학, 밝은 원색(오방색), 호랑이와 까치',
      masterpieces: ['호작도', '화조도', '책거리'],
      intro: '조선시대 서민들의 그림. 밝은 원색과 해학적 표현으로 민간 신앙과 염원을 담았으며, 소박하지만 생명력 넘치는 한국 미의 정수입니다.'
    },
    prompt: 'Korean Minhwa folk painting style, naive charming simplicity with playful expressions, bold vibrant primary colors (red, blue, yellow) in traditional obangsaek, decorative flattened perspective, cheerful folk art aesthetic, tigers and magpies, peony flowers and auspicious symbols, painted on Korean hanji paper, painted in Joseon dynasty folk art masterpiece quality',
    color: '#FF6B6B',
    icon: '🐯'
  },

  {
    id: 'korean-sumukhwa',
    category: 'oriental-detail',
    model: 'SDXL',
    order: 101,
    name: '한국 수묵화',
    nameEn: 'Korean Ink Painting',
    description: '절제된 먹과 선비정신',
    artist: {
      name: '한국 수묵화 양식',
      nameEn: 'Korean Literati Ink Painting Style',
      period: '조선시대 (1400-1900)',
      birth: null,
      death: null,
      lifespan: '조선시대 (1400-1900)',
      nationality: '한국',
      movement: '동양화',
      essence: '절제된 필치, 담묵, 선비 정신',
      features: '절제된 필치, 담묵, 선비 정신',
      masterpieces: ['겸재 정선의 인왕제색도', '추사 김정희의 세한도', '단원 김홍도의 풍속화'],
      intro: '조선 문인들의 정신세계. 절제된 먹으로 자연과 일상을 담았으며, 중국과는 다른 한국적 여백미와 소박함을 보여줍니다.'
    },
    prompt: 'Korean literati ink painting style, restrained elegant brushwork with subtle ink gradations, scholarly refinement and simplicity, Korean mountains and pine trees, modest understated beauty, gentle atmospheric perspective, hanji paper texture, painted in Joseon scholar painting masterpiece quality',
    color: '#5D4E37',
    icon: '🏔️'
  },

  {
    id: 'korean-dancheong',
    category: 'oriental-detail',
    model: 'SDXL',
    order: 102,
    name: '한국 단청',
    nameEn: 'Korean Dancheong',
    description: '화려한 궁궐과 사찰 장식',
    artist: {
      name: '한국 단청 양식',
      nameEn: 'Korean Traditional Decorative Painting Style',
      period: '삼국~조선시대 (400-1900)',
      birth: null,
      death: null,
      lifespan: '삼국~조선시대 (400-1900)',
      nationality: '한국',
      movement: '동양화',
      essence: '오방색, 기하학 문양, 대칭 구조',
      features: '오방색, 기하학 문양, 대칭 구조',
      masterpieces: ['경복궁 단청', '불국사 단청', '해인사 팔만대장경'],
      intro: '궁궐과 사찰을 장식한 한국 전통 채색화. 오방색의 화려한 조화와 기하학적 문양으로 신성함과 권위를 표현합니다.'
    },
    prompt: 'Korean dancheong decorative painting style, vibrant five traditional colors (obangsaek: blue, red, yellow, white, black), symmetrical geometric patterns, ornate Buddhist temple decoration, intricate lotus and cloud motifs, royal palace architectural painting, brilliant saturated colors with gold accents, painted in traditional Korean dancheong masterpiece quality',
    color: '#FFD700',
    icon: '🏯'
  },

  {
    id: 'chinese-ink',
    category: 'oriental-detail',
    model: 'SDXL',
    order: 103,
    name: '중국 수묵화',
    nameEn: 'Chinese Ink Painting',
    description: '먹의 농담과 여백의 미',
    artist: {
      name: '중국 수묵화 양식',
      nameEn: 'Chinese Ink Wash Painting Style',
      period: '송~청대 (1000-1900)',
      birth: null,
      death: null,
      lifespan: '송~청대 (1000-1900)',
      nationality: '중국',
      movement: '동양화',
      essence: '먹의 농담, 여백의 미, 사군자',
      features: '먹의 농담, 여백의 미, 사군자(매난국죽)',
      masterpieces: ['제백석의 새우', '팔대산인의 물고기', '정섭의 대나무'],
      intro: '중국 문인화의 정수. 먹 하나로 농담을 표현하며, 비어있는 여백을 통해 무한을 담아냅니다. 정신의 표현을 최고로 여깁니다.'
    },
    prompt: 'Chinese ink wash painting style (shuimohua), monochrome black ink gradations from dark to light, expressive calligraphic brushstrokes, shrimp bamboo plum blossoms, minimalist elegant simplicity, white negative space (liubai), literati scholar painting tradition, spontaneous gestural marks, painted in Chinese xieyi masterpiece quality',
    color: '#2C3E50',
    icon: '🖌️'
  },

  {
    id: 'chinese-gongbi',
    category: 'oriental-detail',
    model: 'SDXL',
    order: 104,
    name: '중국 공필화',
    nameEn: 'Chinese Gongbi',
    description: '섬세한 필치와 화려한 채색',
    artist: {
      name: '중국 공필화 양식',
      nameEn: 'Chinese Meticulous Painting Style',
      period: '당~청대 (700-1900)',
      birth: null,
      death: null,
      lifespan: '당~청대 (700-1900)',
      nationality: '중국',
      movement: '동양화',
      essence: '세밀한 필치, 화려한 채색, 궁중 회화',
      features: '세밀한 필치, 화려한 채색, 궁중 회화',
      masterpieces: ['당대 여사잠도', '송대 청명상하도', '청대 백준도'],
      intro: '중국 궁중 회화의 극치. 극도로 세밀한 필치와 화려한 채색으로 꽃, 새, 인물을 정교하게 그려냅니다.'
    },
    prompt: 'Chinese gongbi meticulous painting style, extremely fine detailed brushwork, delicate precise lines, rich mineral pigments and gold leaf, birds and flowers (huaniao), elegant court ladies, brilliant colors with intricate patterns, silk painting texture, painted in imperial court gongbi masterpiece quality',
    color: '#DC143C',
    icon: '🦜'
  },

  {
    id: 'chinese-landscape',
    category: 'oriental-detail',
    model: 'SDXL',
    order: 105,
    name: '중국 산수화',
    nameEn: 'Chinese Landscape',
    description: '웅장한 산과 구름',
    artist: {
      name: '중국 산수화 양식',
      nameEn: 'Chinese Landscape Painting Style',
      period: '송~명대 (1000-1600)',
      birth: null,
      death: null,
      lifespan: '송~명대 (1000-1600)',
      nationality: '중국',
      movement: '동양화',
      essence: '웅장한 산세, 안개와 구름, 청록색',
      features: '웅장한 산세, 안개와 구름, 청록색',
      masterpieces: ['범관의 계산행려도', '곽희의 조춘도', '왕희맹의 천리강산도'],
      intro: '중국 산수화의 대표. 웅장한 산과 유유히 흐르는 물로 우주의 이치를 담았으며, 청록색 채색으로 이상향을 표현합니다.'
    },
    prompt: 'Chinese landscape painting (shanshui) style, majestic towering mountains with misty atmosphere, blue-green mineral pigments (qinglü), cascading waterfalls and winding rivers, tiny figures in vast nature, traditional three-distance perspective, poetic inscription and seals, painted in Song-Ming dynasty shanshui masterpiece quality',
    color: '#20B2AA',
    icon: '⛰️'
  },

  {
    id: 'japanese-ukiyoe',
    category: 'oriental-detail',
    model: 'SDXL',
    order: 106,
    name: '일본 우키요에',
    nameEn: 'Japanese Ukiyo-e',
    description: '파도와 후지산',
    artist: {
      name: '일본 우키요에 양식',
      nameEn: 'Japanese Ukiyo-e Woodblock Print Style',
      period: '에도시대 (1600-1900)',
      birth: null,
      death: null,
      lifespan: '에도시대 (1600-1900)',
      nationality: '일본',
      movement: '동양화',
      essence: '목판화, 대담한 구도, 프러시안 블루',
      features: '목판화, 대담한 구도, 프러시안 블루',
      masterpieces: ['호쿠사이의 파도', '히로시게의 비', '우타마로의 미인도'],
      intro: '에도시대 서민 문화의 꽃. 목판화 기법으로 대담한 구도와 선명한 색채를 보여주며, 인상파 화가들에게 큰 영향을 주었습니다.'
    },
    prompt: 'Japanese Ukiyo-e woodblock print style, bold graphic composition with dramatic cropping, vibrant flat colors with Prussian blue, The Great Wave and Mount Fuji motifs, beautiful geisha and landscapes, strong black outlines, stylized clouds and water, intricate kimono patterns, painted in Edo period ukiyo-e masterpiece quality',
    color: '#4169E1',
    icon: '🗻'
  },

  {
    id: 'japanese-sumi-e',
    category: 'oriental-detail',
    model: 'SDXL',
    order: 107,
    name: '일본 수묵화',
    nameEn: 'Japanese Sumi-e',
    description: '선의 정신과 여백',
    artist: {
      name: '일본 수묵화 양식',
      nameEn: 'Japanese Zen Ink Painting Style',
      period: '가마쿠라~에도 (1200-1900)',
      birth: null,
      death: null,
      lifespan: '가마쿠라~에도 (1200-1900)',
      nationality: '일본',
      movement: '동양화',
      essence: '선종 정신, 간결한 필치, 여백',
      features: '선종 정신, 간결한 필치, 여백',
      masterpieces: ['셋슈의 파묵산수도', '하쿠인의 달마', '센가이의 원상삼각사각'],
      intro: '선종의 영향을 받은 일본 수묵화. 최소한의 붓질로 본질을 포착하며, 여백을 통해 무를 표현합니다.'
    },
    prompt: 'Japanese sumi-e ink painting style, Zen Buddhist aesthetic with minimalist brushwork, spontaneous decisive strokes, bamboo orchids and landscapes, profound simplicity and emptiness, wabi-sabi imperfect beauty, meditative atmosphere, rice paper texture, painted in Japanese Zen sumi-e masterpiece quality',
    color: '#696969',
    icon: '🎋'
  },

  {
    id: 'japanese-rinpa',
    category: 'oriental-detail',
    model: 'SDXL',
    order: 108,
    name: '일본 린파',
    nameEn: 'Japanese Rinpa',
    description: '금박의 화려함',
    artist: {
      name: '일본 린파 양식',
      nameEn: 'Japanese Rinpa School Style',
      period: '에도시대 (1600-1900)',
      birth: null,
      death: null,
      lifespan: '에도시대 (1600-1900)',
      nationality: '일본',
      movement: '동양화',
      essence: '금박과 은박, 장식적, 우아한 곡선',
      features: '금박과 은박, 장식적, 우아한 곡선',
      masterpieces: ['오가타 고린의 홍백매도', '소타츠의 풍신뇌신도', '호잇수의 연못'],
      intro: '일본 장식미의 극치. 금박과 은박으로 화려하게 장식하며, 우아한 곡선과 대담한 생략으로 귀족적 아름다움을 표현합니다.'
    },
    prompt: 'Japanese Rinpa school decorative painting style, luxurious gold and silver leaf backgrounds, elegant curved flowing forms, stylized nature motifs (plum blossoms, irises, waves), flat bold colors with tarashikomi technique, aristocratic refined beauty, ornamental screen painting, painted in Edo period Rinpa masterpiece quality',
    color: '#FFD700',
    icon: '🌸'
  }
];

// 거장 필터링 (거장 탭용)
export const masterArtists = artStyles.filter(style => style.isMaster === true);

// 카테고리별로 화가 가져오기
export function getArtistsByCategory(category) {
  return artStyles
    .filter(style => style.category === category)
    .sort((a, b) => a.order - b.order);
}

// 화가 ID로 찾기
export function getArtistById(id) {
  return artStyles.find(style => style.id === id);
}

// 카테고리 정보 가져오기
export function getCategoryInfo(category) {
  return styleCategories[category];
}
