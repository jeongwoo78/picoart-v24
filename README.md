# 🎨 PicoArt v24 - AI 명화 스타일 변환

**버전**: 24.0.0  
**날짜**: 2025년 11월 4일

AI가 사진을 분석하여 최적의 화가/스타일을 자동으로 선택하고 명화 스타일로 변환하는 웹 애플리케이션

---

## ✨ v24 주요 변경사항

### 1. 미술사조 AI 자유 선택
- **Before**: 각 사조별 5명 화가 DB → 첫 번째 화가만 사용
- **After**: AI가 해당 시대 **모든 화가** 중 사진에 가장 적합한 화가 자유 선택
- **효과**: 더 정확한 매칭, 코드 60% 감소

### 2. 비잔틴·이슬람 인물 보호
- 인물 사진 → **비잔틴 스타일만** 사용 (모자이크, 이콘화)
- 풍경/사물 → 비잔틴 또는 이슬람 자유 선택
- 문화적 존중 구현

### 3. 교육 시스템 완성
- **1차 교육**: 선택 시 카테고리 설명 (19개 미리 작성)
- **2차 교육**: 결과 화면에서 AI가 실시간 생성
  - 미술사조: 선택된 화가 스토리
  - 거장/동양화: 적용된 기법 설명

---

## 🚀 빠른 시작

### 1. 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env.example`을 복사하여 `.env` 파일 생성:
```bash
cp .env.example .env
```

`.env` 파일에 API 키 입력:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
REPLICATE_API_KEY=r8_your-key-here
```

### 3. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 `http://localhost:3000` 접속

### 4. 프로덕션 빌드
```bash
npm run build
```

### 5. Vercel 배포
```bash
vercel --prod
```

---

## 📂 프로젝트 구조

```
picoart-v24/
├── index.html              # HTML 템플릿
├── package.json            # 의존성 및 스크립트
├── vite.config.js          # Vite 설정
├── vercel.json             # Vercel 배포 설정
├── .env.example            # 환경 변수 예시
├── .gitignore              # Git 무시 파일
│
├── src/
│   ├── main.jsx            # 앱 엔트리 포인트
│   ├── App.jsx             # 메인 앱 컴포넌트
│   │
│   ├── components/
│   │   ├── UploadScreen.jsx       # 사진 업로드
│   │   ├── StyleSelection.jsx     # 화풍 선택 ⭐ v24 수정
│   │   ├── ProcessingScreen.jsx   # 변환 중 화면
│   │   ├── ResultScreen.jsx       # 결과 표시
│   │   └── BeforeAfter.jsx        # 전후 비교
│   │
│   ├── data/
│   │   ├── artStyles.js           # 화풍 DB ⭐⭐⭐ v24 대폭 수정
│   │   └── educationContent.js    # 교육 콘텐츠
│   │
│   ├── utils/
│   │   ├── styleTransferAPI.js    # API 호출 유틸
│   │   └── modelConfig.js         # 모델 설정
│   │
│   └── styles/
│       └── App.css                # 스타일시트
│
└── api/
    ├── sdxl-transfer.js           # SDXL 변환 API ⭐⭐⭐ v24 대폭 수정
    ├── flux-transfer.js           # FLUX 변환 API
    └── replicate.js               # Replicate 헬퍼
```

---

## 🎯 주요 기능

### 1. 3단계 화풍 선택
- **미술사조** (10개): 고대 ~ 표현주의
- **거장 컬렉션** (6명): 반 고흐, 클림트, 피카소, 마티스, 뭉크, 모네
- **동양화** (12개): 한국·중국·일본 전통 미술

### 2. AI 화가 자동 선택
- **미술사조**: AI가 사진 분석 후 해당 시대 최적 화가 선택
- **거장**: 화가 작품별 스타일 매칭
- **동양화**: 세부 스타일 (민화/수묵화/단청 등) 자동 선택

### 3. 교육 콘텐츠
- **1차 교육**: 화풍 선택 시 시대/스타일 설명
- **2차 교육**: 변환 결과와 함께 화가/기법 상세 설명

### 4. 고품질 변환
- **FLUX Depth**: 메인 변환 모델 ($0.014/회)
- **SDXL**: AI 화가 선택 및 fallback ($0.003/회)

---

## 🔧 기술 스택

### Frontend
- **React 18.2** - UI 프레임워크
- **Vite 5.0** - 빌드 도구
- **Vanilla CSS** - 스타일링

### Backend (Serverless)
- **Vercel Functions** - API 엔드포인트
- **Claude 3.5 Sonnet** - AI 화가 선택 및 교육 콘텐츠 생성
- **Replicate API** - 이미지 변환 (FLUX Depth, SDXL)

### AI Models
- **Claude 3.5 Sonnet** (Anthropic)
  - 화가 선택
  - 스토리 생성
  - 기법 설명 생성
- **FLUX Depth** (Replicate)
  - 메인 이미지 변환
- **SDXL** (Replicate)
  - Fallback 변환

---

## 📊 데이터베이스

### artStyles.js (616줄)
- **styleCategories**: 13개 카테고리 정보
- **artStyles**: 19개 스타일 데이터
  - 고대 미술: 1개
  - 비잔틴·이슬람: 1개
  - 거장: 6개
  - 동양화: 12개 (3개 국가 + 9개 세부 스타일)

---

## 🎨 작동 원리

### 미술사조 선택 시
```
1. 사용자: "바로크" 선택
   ↓
2. 사진 업로드
   ↓
3. Claude AI 분석:
   - 어두운 배경 + 강한 조명 → "렘브란트" 선택
   - 육감적 인체 → "루벤스" 선택
   - 실내 정물 → "베르메르" 선택
   ↓
4. FLUX Depth로 변환
   ↓
5. 교육 콘텐츠 표시:
   - 1차: "바로크는 17세기..."
   - 2차: "렘브란트는 1606년..." (AI 생성)
```

### 거장 선택 시
```
1. 사용자: "반 고흐" 선택
   ↓
2. 사진 업로드
   ↓
3. Claude AI 분석:
   - 노란 꽃 → "해바라기" 스타일 적용
   - 밤 풍경 → "별이 빛나는 밤" 스타일 적용
   ↓
4. FLUX Depth로 변환
   ↓
5. 교육 콘텐츠 표시:
   - 1차: "반 고흐는 1853년..."
   - 2차: "이 사진에는 임파스토 기법이..." (AI 생성)
```

---

## 🔑 환경 변수

### 필수
```env
ANTHROPIC_API_KEY=sk-ant-...     # Claude AI API 키
REPLICATE_API_KEY=r8_...         # Replicate API 키
```

### API 키 발급
- **Anthropic**: https://console.anthropic.com/
- **Replicate**: https://replicate.com/account/api-tokens

---

## 💰 비용

### API 호출당 비용
- **Claude API**: ~$0.001/회 (화가 선택 + 교육 생성)
- **FLUX Depth**: $0.014/회 (메인 변환)
- **SDXL**: $0.003/회 (Fallback)

### 예상 비용
- 사진 1장 변환: **약 $0.015** (성공 시)
- 한 달 1,000장: **약 $15**

---

## 🧪 테스트

### 로컬 테스트
```bash
npm run dev
```

### 테스트 체크리스트
- [ ] 미술사조: 바로크 선택 → 다양한 화가 선택 확인
- [ ] 비잔틴·이슬람: 인물 사진 → 비잔틴만 사용 확인
- [ ] 거장: 반 고흐 선택 → 작품별 매칭 확인
- [ ] 동양화: 한국 선택 → 민화/수묵화/단청 중 선택 확인
- [ ] 교육 콘텐츠: 1차/2차 모두 표시 확인

---

## 📝 v23에서 v24로 마이그레이션

### 주요 변경사항
1. **artStyles.js**: 미술사조 화가 데이터 삭제됨
2. **sdxl-transfer.js**: AI 선택 로직 완전 재작성
3. **StyleSelection.jsx**: 카테고리 정보 전달 방식 변경

### 마이그레이션 불필요
v24는 완전히 새로운 프로젝트로 **그냥 배포하면 됩니다**.

---

## 🚨 문제 해결

### API 오류
```
Error: AI API error: 401
```
→ `.env` 파일의 `ANTHROPIC_API_KEY` 확인

```
Error: Replicate API key not configured
```
→ `.env` 파일의 `REPLICATE_API_KEY` 확인

### 빌드 오류
```
Module not found: Can't resolve '../data/artStyles.js'
```
→ `artStyles.js` 파일이 `src/data/` 폴더에 있는지 확인

### 이미지 변환 실패
- AI 타임아웃 (8초): Fallback 프롬프트로 자동 전환
- Replicate 오류: 에러 메시지 확인 후 재시도

---

## 📚 참고 자료

### 관련 문서
- [완성 보고서](./docs/20251104-PICOART-v24-FINAL-완성보고서.md)
- [파일 구조](./docs/20251104-PICOART-v24-파일구조.md)

### API 문서
- [Anthropic API](https://docs.anthropic.com/)
- [Replicate API](https://replicate.com/docs)
- [Vercel Functions](https://vercel.com/docs/functions)

---

## 📜 라이선스

**Patent Protected**
- 특허 10-2018-0016297
- 특허 10-2018-0122600

---

## 👤 개발자

**정우**  
PicoArt v24 FINAL  
2025년 11월 4일

---

## 🎉 v24 완성!

**핵심 개선**:
- ✅ 코드 60% 감소 (1,559줄 → 616줄)
- ✅ AI 자유 선택 (제약 제거)
- ✅ 문화적 존중 (이슬람 인물 제한)
- ✅ 완벽한 교육 시스템
- ✅ 비용/시간 동일, 품질 향상

**상태**: 프로덕션 배포 준비 완료 🚀
