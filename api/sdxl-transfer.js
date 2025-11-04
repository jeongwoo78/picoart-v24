// PicoArt v24 - AI 자동 화가 선택 시스템
// 미술사조: AI가 카테고리 내 전체 작가 중 최적 선택
// 거장/동양화: 사용자 선택 → AI 확정

import { artStyles } from '../src/data/artStyles.js';

// Fallback 프롬프트 (AI 실패시 사용)
const fallbackPrompts = {
  ancient: {
    name: '고대 그리스-로마',
    prompt: 'ancient Greek and Roman classical painting style, idealized human forms, marble-like smooth rendering, heroic noble figures, classical drapery, temple architecture, serene dignified expressions, painted in ancient classical masterpiece quality'
  },
  
  byzantineIslamic: {
    name: '비잔틴·이슬람',
    prompt: 'Byzantine and Islamic art style, golden mosaic backgrounds, ornate geometric patterns, rich jewel-like colors, spiritual iconic forms, decorative arabesque motifs, sacred dignified atmosphere, painted in Byzantine-Islamic masterpiece quality'
  },
  
  renaissance: {
    name: '르네상스',
    prompt: 'Renaissance painting style, soft sfumato technique, harmonious balanced composition, warm golden Renaissance colors, detailed naturalistic rendering, gentle serene expressions, classical perspective, painted in Renaissance masterpiece quality'
  },
  
  baroque: {
    name: '바로크',
    prompt: 'Baroque painting style, dramatic chiaroscuro lighting, rich deep colors, dynamic diagonal composition, theatrical emotional atmosphere, strong contrast between light and shadow, painted in Baroque masterpiece quality'
  },
  
  rococo: {
    name: '로코코',
    prompt: 'Rococo painting style, light pastel colors, playful ornate decoration, soft delicate brushwork, romantic elegant atmosphere, graceful curved lines, whimsical charm, painted in Rococo masterpiece quality'
  },
  
  romanticism: {
    name: '낭만주의',
    prompt: 'Romantic painting style, dramatic emotional intensity, sublime natural beauty, vivid expressive colors, dynamic turbulent composition, passionate atmosphere, painted in Romantic masterpiece quality'
  },
  
  impressionism: {
    name: '인상주의',
    prompt: 'Impressionist painting style, visible short brushstrokes, pure unmixed colors, emphasis on natural light effects, outdoor plein-air atmosphere, capturing fleeting moments, painted in Impressionist masterpiece quality'
  },
  
  post_impressionism: {
    name: '후기인상주의',
    prompt: 'Post-Impressionist painting style, bold expressive colors, geometric structured forms, emotional symbolic content, innovative personal vision, painted in Post-Impressionist masterpiece quality'
  },
  
  postImpressionism: {
    name: '후기인상주의',
    prompt: 'Post-Impressionist painting style, bold expressive colors, geometric structured forms, emotional symbolic content, innovative personal vision, painted in Post-Impressionist masterpiece quality'
  },
  
  fauvism: {
    name: '야수파',
    prompt: 'Fauvist painting style, wild pure vivid colors, bold simplified forms, strong non-naturalistic palette, flat decorative patterns, expressive emotional intensity, painted in Fauvist masterpiece quality'
  },
  
  expressionism: {
    name: '표현주의',
    prompt: 'Expressionist painting style, intense emotional colors, distorted exaggerated forms, psychological depth, dramatic angular composition, inner feelings externalized, painted in Expressionist masterpiece quality'
  },
  
  klimt: {
    name: '클림트',
    prompt: 'painting by Gustav Klimt, golden ornamental patterns, Byzantine mosaic influence, decorative symbolic style, sensuous flowing forms, jewel-like colors, Art Nouveau elegance'
  },
  
  picasso: {
    name: '피카소',
    prompt: 'Cubist painting by Pablo Picasso, geometric fragmented forms, multiple simultaneous perspectives, abstract analytical composition, monochromatic or limited palette'
  },
  
  van_gogh: {
    name: '반 고흐',
    prompt: 'painting by Vincent van Gogh, thick expressive swirling brushstrokes, vibrant intense emotional colors, dynamic energetic composition, passionate turbulent style'
  },
  
  matisse: {
    name: '마티스',
    prompt: 'painting by Henri Matisse, bold pure flat colors, simplified harmonious forms, decorative rhythmic patterns, joyful life-affirming atmosphere'
  },
  
  munch: {
    name: '뭉크',
    prompt: 'painting by Edvard Munch, intense emotional psychological depth, symbolic expressive colors, haunting atmospheric mood, existential anxiety visualized'
  },
  
  dali: {
    name: '달리',
    prompt: 'Surrealist painting by Salvador Dalí, dreamlike hyperrealistic details, melting distorted forms, bizarre juxtapositions, subconscious imagery, precise meticulous technique'
  },
  
  korean: {
    name: '한국',
    prompt: 'Korean traditional art style, vibrant folk painting or elegant ink wash or decorative dancheong, Korean aesthetic with obangsaek colors, traditional Korean paper texture'
  },
  
  chinese: {
    name: '중국',
    prompt: 'Chinese traditional art style, ink wash painting or meticulous gongbi or majestic landscape, Chinese aesthetic with mineral pigments, elegant brushwork'
  },
  
  japanese: {
    name: '일본',
    prompt: 'Japanese traditional art style, ukiyo-e woodblock print or zen ink painting or rinpa decorative art, Japanese aesthetic with elegant simplicity'
  },
  
  // 하위 스타일들 (AI 선택용)
  korean_minhwa: {
    name: '한국 민화',
    prompt: 'Korean Minhwa folk painting style, bright vibrant colors, bold dark outlines, flat decorative composition, auspicious symbolic motifs, cheerful optimistic mood, traditional Korean aesthetic'
  },
  
  korean_sumukhwa: {
    name: '한국 수묵화',
    prompt: 'Korean literati ink painting style, restrained elegant brushwork, subtle ink gradations, scholarly refinement, Korean mountains and pine trees, modest understated beauty, painted in Joseon scholar painting masterpiece quality'
  },
  
  korean_dancheong: {
    name: '한국 단청',
    prompt: 'Korean dancheong decorative painting style, vibrant five traditional colors, symmetrical geometric patterns, ornate Buddhist temple decoration, intricate lotus and cloud motifs, brilliant saturated colors with gold accents'
  },
  
  chinese_ink: {
    name: '중국 수묵화',
    prompt: 'Chinese ink wash painting (Shuimohua) style, monochrome black ink tones, soft flowing brushstrokes, minimalist composition, elegant empty space (留白), contemplative serene atmosphere, traditional East Asian aesthetic'
  },
  
  chinese_gongbi: {
    name: '중국 공필화',
    prompt: 'Chinese gongbi meticulous painting style, extremely fine detailed brushwork, delicate precise lines, rich mineral pigments, birds and flowers, brilliant colors with intricate patterns, painted in imperial court gongbi masterpiece quality'
  },
  
  chinese_landscape: {
    name: '중국 산수화',
    prompt: 'Chinese landscape painting (shanshui) style, majestic towering mountains with misty atmosphere, blue-green mineral pigments, cascading waterfalls and winding rivers, painted in Song-Ming dynasty shanshui masterpiece quality'
  },
  
  japanese_ukiyoe: {
    name: '일본 우키요에',
    prompt: 'Japanese Ukiyo-e woodblock print style, flat areas of bold color, strong clear outlines, decorative patterns, stylized simplified forms, traditional Japanese aesthetic'
  },
  
  japanese_sumi_e: {
    name: '일본 수묵화',
    prompt: 'Japanese sumi-e ink painting style, Zen Buddhist aesthetic with minimalist brushwork, spontaneous decisive strokes, profound simplicity and emptiness, wabi-sabi beauty, meditative atmosphere'
  },
  
  japanese_rinpa: {
    name: '일본 린파',
    prompt: 'Japanese Rinpa school decorative painting style, luxurious gold and silver leaf backgrounds, elegant curved flowing forms, stylized nature motifs, flat bold colors, aristocratic refined beauty'
  },
  
  masters: {
    name: '거장 화풍',
    prompt: 'Master artist painting style, exceptional technical skill, distinctive artistic vision, profound emotional depth, timeless masterpiece quality'
  },
  
  oriental: {
    name: '동양화',
    prompt: 'Traditional East Asian painting style, ink wash brushwork, minimalist composition, harmony with nature, philosophical contemplation, painted in classical Oriental masterpiece quality'
  }
};

// AI 화가 자동 선택 (카테고리별 맞춤 선택)
async function selectArtistWithAI(imageBase64, selectedStyle, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    // 카테고리 분석 및 프롬프트 생성
    let categoryName, specialInstructions = '';
    
    if (selectedStyle.isMovementCategory) {
      // 미술사조: AI가 해당 시대의 모든 화가 중 자유롭게 선택
      categoryName = selectedStyle.categoryName; // "바로크", "인상주의" 등
      
      // 비잔틴·이슬람 특별 처리: 인물 사진은 이슬람 제외
      if (selectedStyle.categoryKey === 'byzantineIslamic') {
        specialInstructions = `\n\n⚠️ CRITICAL: If this photo contains HUMAN FIGURES or PORTRAITS:
- You MUST use ONLY Byzantine style (religious icons, mosaics, gold backgrounds)
- DO NOT use Islamic style (which prohibits human depiction)

If NO human figures (landscape, objects, architecture):
- You may use either Byzantine OR Islamic style
- Islamic: geometric patterns, arabesque, calligraphy, no human figures`;
      }
      
      specialInstructions += `\n\nYou have COMPLETE FREEDOM to select ANY famous artist from the ${categoryName} period.
Examples from ${categoryName}: Choose the most suitable artist based on photo characteristics.
Consider lighting, composition, subject matter, mood, and colors.`;
      
    } else {
      // 거장/동양화: 이미 선택된 작가/스타일 확정
      categoryName = selectedStyle.name;
      specialInstructions = `\n\nThe user has selected "${categoryName}". Confirm this choice and generate an appropriate prompt for this specific artist/style.`;
    }
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 600,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: imageBase64.split(',')[1]
              }
            },
            {
              type: 'text',
              text: `Analyze this photo and select the BEST artist from ${categoryName} period/style to transform it.${specialInstructions}

Instructions:
1. Analyze: subject (人物有無 체크!), age, mood, composition, lighting, colors
2. Select the MOST SUITABLE artist for THIS specific photo
3. Generate a detailed prompt for FLUX Depth in that artist's style
4. IMPORTANT: Preserve the original subject - if it's a baby, keep it as a baby; if elderly, keep elderly

Return ONLY valid JSON (no markdown):
{
  "analysis": "brief photo description (mention if humans present)",
  "selected_artist": "Artist Full Name in English",
  "reason": "why this artist/style fits this photo",
  "prompt": "painting by [Artist], [artist's technique], [artist's characteristics], depicting the subject while preserving original features and age"
}

Keep it concise and accurate.`
            }
          ]
        }]
      })
    });
    
    clearTimeout(timeout);
    
    if (!response.ok) {
      throw new Error(`AI API error: ${response.status}`);
    }
    
    const data = await response.json();
    const text = data.content[0].text
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    
    const result = JSON.parse(text);
    
    // 검증
    if (!result.prompt || !result.selected_artist) {
      throw new Error('Invalid AI response format');
    }
    
    return {
      success: true,
      artist: result.selected_artist,
      reason: result.reason,
      prompt: result.prompt,
      analysis: result.analysis
    };
    
  } catch (error) {
    clearTimeout(timeout);
    console.error('AI selection failed:', error.message);
    return { success: false, error: error.message };
  }
}

// AI로 작가 스토리 생성 (교육 콘텐츠용)
async function generateArtistStory(artistName, artistPeriod, timeoutMs = 10000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `Create an educational story about the artist "${artistName}" (${artistPeriod}).

IMPORTANT: Follow this exact structure and style. Use \\n for line breaks.

Example format (from our database):
"모네는 1840년부터 1926년까지 살았던 프랑스 인상주의의 창시자입니다.\\n1872년 인상, 해돋이가 인상주의라는 명칭의 유래가 되었어요.\\n변화하는 빛과 색채의 순간을 포착하는 것을 목표로 했으며, 같은 대상을 다양한 시간과 날씨에 반복해서 그렸습니다.\\n짧고 빠른 붓터치로 색을 나란히 배치하여 눈에서 혼합되게 했고, 그림자도 검정색 대신 색채로 표현했어요.\\n지베르니의 정원에서 수련 연작을 그리며 거의 추상에 가까운 경지에 이르렀습니다."

Required structure (5-6 sentences with \\n line breaks):
1. First sentence: "[Artist]는 [start year]년부터 [end year]까지 살았던 [nationality]의 [movement] 화가입니다."
2. Key achievement or defining work with specific years
3. Artistic technique and characteristics
4. Personal story or struggle (humanizing element)
5. Legacy or influence
6. (Optional) How they died or final years

Writing style:
- Conversational Korean (mix "~했습니다" and "~했어요")
- Include specific years for major works
- Use \\n for line breaks between sentences
- Warm, educational, engaging tone
- Focus on human story + artistic achievement

Return ONLY valid JSON:
{
  "story": "full story text with \\n line breaks"
}`
        }]
      })
    });
    
    clearTimeout(timeout);
    
    if (!response.ok) {
      throw new Error(`AI story API error: ${response.status}`);
    }
    
    const data = await response.json();
    const text = data.content[0].text
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    
    const result = JSON.parse(text);
    
    if (!result.story) {
      throw new Error('Invalid story response format');
    }
    
    return {
      success: true,
      story: result.story
    };
    
  } catch (error) {
    clearTimeout(timeout);
    console.error('AI story generation failed:', error.message);
    return { success: false, error: error.message };
  }
}

// AI로 적용된 기법 설명 생성 (2차 교육 콘텐츠)
async function generateTechniqueExplanation(artistName, artistTechnique, imageAnalysis, timeoutMs = 8000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 600,
        messages: [{
          role: 'user',
          content: `Create a technique explanation for a photo transformed in ${artistName}'s style.

Photo description: ${imageAnalysis || 'portrait'}
Artist technique: ${artistTechnique}

IMPORTANT: This explains what was APPLIED to THIS SPECIFIC photo. Use \\n for line breaks.

Example formats:

For 반 고흐:
"이 사진에는 반 고흐의 대표적인 임파스토 기법이 적용되었습니다.\\n두꺼운 물감을 소용돌이치듯 바르는 방식으로 격렬한 감정과 에너지를 표현했어요.\\n노란색과 파란색의 강렬한 대비가 특징이며, 별이 빛나는 밤이나 해바라기에서 볼 수 있는 역동적인 붓터치가 느껴집니다.\\n이 기법으로 평범한 장면도 생명력 넘치는 예술 작품으로 변화했습니다."

For 클림트:
"이 작품에는 클림트의 황금시대 기법이 적용되었습니다.\\n금박과 기하학적 문양으로 장식하여 비잔틴 모자이크의 영향을 받은 화려함을 표현했어요.\\n'키스'에서 볼 수 있는 것처럼 인물을 황금빛으로 감싸며 신성함과 에로티시즘을 동시에 담아냈습니다.\\n장식적이면서도 현대적인 감각이 느껴지는 독특한 스타일입니다."

For 한국 민화:
"이 작품에는 조선시대 민화의 호작도 기법이 적용되었습니다.\\n오방색(빨강, 파랑, 노랑, 흰색, 검정)의 밝은 원색으로 해학적이고 소박한 매력을 표현했어요.\\n호랑이와 까치처럼 상징적 소재를 평면적이고 장식적으로 그리는 것이 특징입니다.\\n액운을 쫓고 복을 부르는 의미가 담긴 전통 기법이에요."

Required structure (3-4 sentences with \\n line breaks):
1. "이 [사진/작품]에는 [Artist]의 [technique]이/가 적용되었습니다."
2. Explain the specific technique used
3. Mention representative works or characteristics
4. How it transformed this specific photo

Writing style:
- Direct and clear about what was applied
- Conversational Korean (mix "~했습니다" and "~했어요")
- Use \\n for line breaks
- Focus on THIS photo's transformation
- Educational but engaging

Return ONLY valid JSON:
{
  "technique_explanation": "explanation text with \\n line breaks"
}`
        }]
      })
    });
    
    clearTimeout(timeout);
    
    if (!response.ok) {
      throw new Error(`AI technique API error: ${response.status}`);
    }
    
    const data = await response.json();
    const text = data.content[0].text
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();
    
    const result = JSON.parse(text);
    
    if (!result.technique_explanation) {
      throw new Error('Invalid technique response format');
    }
    
    return {
      success: true,
      explanation: result.technique_explanation
    };
    
  } catch (error) {
    clearTimeout(timeout);
    console.error('AI technique explanation failed:', error.message);
    return { success: false, error: error.message };
  }
}

// 메인 핸들러
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { image, selectedStyle } = req.body;

    // 디버깅 로그
    console.log('=== SDXL Transfer Debug ===');
    console.log('Has REPLICATE_API_KEY:', !!process.env.REPLICATE_API_KEY);
    console.log('Has ANTHROPIC_API_KEY:', !!process.env.ANTHROPIC_API_KEY);
    console.log('Has image:', !!image);
    console.log('Has selectedStyle:', !!selectedStyle);
    console.log('selectedStyle:', selectedStyle);

    if (!process.env.REPLICATE_API_KEY) {
      console.error('ERROR: REPLICATE_API_KEY not configured');
      return res.status(500).json({ error: 'Replicate API key not configured' });
    }

    if (!image || !selectedStyle) {
      console.error('ERROR: Missing image or selectedStyle');
      console.error('image exists:', !!image);
      console.error('selectedStyle:', JSON.stringify(selectedStyle, null, 2));
      return res.status(400).json({ error: 'Missing image or style' });
    }

    // selectedStyle 구조 검증
    if (!selectedStyle.name || !selectedStyle.category) {
      console.error('ERROR: Invalid selectedStyle structure');
      console.error('selectedStyle:', JSON.stringify(selectedStyle, null, 2));
      return res.status(400).json({ 
        error: 'Invalid style structure',
        details: 'Missing name or category'
      });
    }

    let finalPrompt;
    let selectedArtist;
    let selectionMethod;
    let selectionDetails = {};

    // AI 자동 선택 시도 (ANTHROPIC_API_KEY 있을 때만)
    if (process.env.ANTHROPIC_API_KEY) {
      console.log(`Trying AI artist selection for ${selectedStyle.name}...`);
      console.log('Category:', selectedStyle.category);
      console.log('Is Movement?:', selectedStyle.isMovementCategory);
      
      const aiResult = await selectArtistWithAI(
        image, 
        selectedStyle,  // 전체 객체 전달
        8000 // 8초 타임아웃
      );
      
      if (aiResult.success) {
        // AI 성공!
        finalPrompt = aiResult.prompt;
        selectedArtist = aiResult.artist;
        selectionMethod = 'ai_auto';
        selectionDetails = {
          analysis: aiResult.analysis,
          reason: aiResult.reason
        };
        console.log('✅ AI selected:', selectedArtist);
        
        // 미술사조인 경우 story 생성 (거장/동양화는 미리 작성된 story 사용)
        if (selectedStyle.category !== 'masters' && selectedStyle.category !== 'oriental') {
          console.log('📝 Generating artist story...');
          const storyResult = await generateArtistStory(
            selectedArtist,
            selectedStyle.artist?.period || 'historical period'
          );
          
          if (storyResult.success) {
            selectionDetails.artist_story = storyResult.story;
            console.log('✅ Story generated');
          } else {
            console.log('⚠️ Story generation failed, will use basic info');
          }
        }
        
        // 거장/동양화인 경우 적용된 기법 설명 생성 (2차 교육)
        if (selectedStyle.category === 'masters' || selectedStyle.category === 'oriental') {
          console.log('📝 Generating technique explanation...');
          const techniqueResult = await generateTechniqueExplanation(
            selectedArtist,
            selectedStyle.artist?.essence || selectedStyle.artist?.features || 'artistic technique',
            aiResult.analysis || 'portrait photograph'
          );
          
          if (techniqueResult.success) {
            selectionDetails.technique_explanation = techniqueResult.explanation;
            console.log('✅ Technique explanation generated');
          } else {
            console.log('⚠️ Technique generation failed');
          }
        }
      } else {
        // AI 실패 → Fallback
        console.log('⚠️ AI failed, using fallback');
        console.log('selectedStyle.category:', selectedStyle.category);
        const fallback = fallbackPrompts[selectedStyle.category];
        
        if (!fallback) {
          console.error('ERROR: No fallback found for category:', selectedStyle.category);
          console.error('Available categories:', Object.keys(fallbackPrompts));
          throw new Error(`No fallback prompt for category: ${selectedStyle.category}`);
        }
        
        finalPrompt = fallback.prompt;
        selectedArtist = fallback.name;
        selectionMethod = 'fallback';
        selectionDetails = {
          ai_error: aiResult.error
        };
      }
    } else {
      // ANTHROPIC_API_KEY 없음 → Fallback
      console.log('ℹ️ No AI key, using fallback');
      console.log('selectedStyle.category:', selectedStyle.category);
      const fallback = fallbackPrompts[selectedStyle.category];
      
      if (!fallback) {
        console.error('ERROR: No fallback found for category:', selectedStyle.category);
        console.error('Available categories:', Object.keys(fallbackPrompts));
        throw new Error(`No fallback prompt for category: ${selectedStyle.category}`);
      }
      
      finalPrompt = fallback.prompt;
      selectedArtist = fallback.name;
      selectionMethod = 'fallback_no_key';
    }

    console.log('Final prompt:', finalPrompt);
    
    // FLUX Depth 변환
    const response = await fetch(
      'https://api.replicate.com/v1/models/black-forest-labs/flux-depth-dev/predictions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Token ${process.env.REPLICATE_API_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'wait'
        },
        body: JSON.stringify({
          input: {
            control_image: image,
            prompt: finalPrompt,
            control_strength: 0.6,
            num_inference_steps: 28,
            guidance_scale: 3.5,
            output_format: 'jpg',
            output_quality: 90
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('FLUX Depth error:', response.status, errorText);
      return res.status(response.status).json({ 
        error: `FLUX API error: ${response.status}`,
        details: errorText
      });
    }

    const data = await response.json();
    console.log('✅ FLUX Depth completed');
    
    // 변환 완료 후 기법 설명 생성 (2차 교육 콘텐츠)
    let techniqueExplanation = null;
    if (process.env.ANTHROPIC_API_KEY && selectedArtist) {
      console.log('📝 Generating technique explanation...');
      const techniqueResult = await generateTechniqueExplanation(
        selectedArtist,
        selectionDetails.reason || 'artistic style',
        selectionDetails.analysis || 'transformed portrait'
      );
      
      if (techniqueResult.success) {
        techniqueExplanation = techniqueResult.explanation;
        console.log('✅ Technique explanation generated');
      } else {
        console.log('⚠️ Technique explanation failed');
      }
    }
    
    // 결과에 선택 정보 포함
    res.status(200).json({
      ...data,
      selected_artist: selectedArtist,
      selection_method: selectionMethod,
      selection_details: selectionDetails,
      technique_explanation: techniqueExplanation  // 2차 교육 콘텐츠
    });
    
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}

/*
작동 방식:

시나리오 1: AI 성공 (95%)
─────────────────────────
사진: 아기
선택: 바로크

AI 분석 중... (3초)
✅ AI 선택: 루벤스
이유: "아기 그림 전문"
프롬프트: "Baroque by Rubens, cherubic baby..."

FLUX 변환... (30초)
결과: 루벤스 스타일 아기 ✅

시나리오 2: AI 실패 (5%)
─────────────────────────
사진: 아기
선택: 바로크

AI 분석 중... (타임아웃 또는 에러)
⚠️ Fallback 사용
프롬프트: "Baroque style, dramatic lighting..."

FLUX 변환... (30초)
결과: 바로크 스타일 아기 ✅ (화가명 없지만 작동)

시나리오 3: API 키 없음
─────────────────────────
ℹ️ AI 키 없음
Fallback 사용

FLUX 변환... (30초)
결과: 기본 스타일 ✅
*/
