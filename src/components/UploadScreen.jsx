import React, { useRef, useState } from 'react';

function UploadScreen({ onUpload }) {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      // 바로 다음 단계로 전달
      onUpload(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="upload-screen">
      <div className="upload-container">
        {/* 헤더 */}
        <div className="upload-header">
          <div className="brand-logo">
            <span className="logo-icon">🎨</span>
            <span className="logo-text">PicoArt</span>
          </div>
          <p className="brand-tagline">AI가 당신의 사진을 거장의 그림으로</p>
          <p className="brand-subtitle">3초 만에 작품 완성 / 고품질 AI 변환</p>
        </div>

        {/* 업로드 영역 */}
        <div
          className={`upload-box ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <div className="upload-content">
            <div className="camera-icon">📷</div>
            <h3 className="upload-title">사진을 여기에 드래그하거나 클릭하세요</h3>
            <p className="upload-hint">JPG, PNG 파일 지원 / 최대 10MB</p>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            style={{ display: 'none' }}
          />
        </div>

        {/* 하단 버튼 */}
        <button className="upload-button" onClick={handleClick}>
          ➜ 사진 선택하기
        </button>

        {/* 화풍 선택 미리보기 */}
        <div className="style-preview">
          <h3 className="preview-title">🎨 화풍 선택</h3>
          <p className="preview-subtitle">사진을 올리면 3개 카테고리 중 원하는 스타일을 선택할 수 있어요</p>
          
          <div className="category-preview">
            <div className="category-card">
              <div className="category-icon">🎨</div>
              <div className="category-name">미술사조</div>
              <div className="category-desc">서양 미술의 흐름</div>
            </div>
            
            <div className="category-card">
              <div className="category-icon">⭐</div>
              <div className="category-name">거장 컬렉션</div>
              <div className="category-desc">시대를 대표하는 거장들</div>
            </div>
            
            <div className="category-card">
              <div className="category-icon">🎎</div>
              <div className="category-name">동양화</div>
              <div className="category-desc">한·중·일 전통 미술</div>
            </div>
          </div>
        </div>

        {/* 미술사조 미리보기 */}
        <div className="movements-preview">
          <p className="movements-title">미술사조에는 10개의 다양한 스타일이 기다리고 있어요. 사진을 올려주세요 ⬆️</p>
          
          <div className="movements-grid">
            <div className="movement-mini-card">
              <div className="mini-icon">🏛️</div>
              <div className="mini-name">고대 미술</div>
              <div className="mini-badge">🤖 AI 선택</div>
            </div>
            
            <div className="movement-mini-card">
              <div className="mini-icon">✨</div>
              <div className="mini-name">비잔틴·이슬람</div>
              <div className="mini-badge">🤖 AI 선택</div>
            </div>
            
            <div className="movement-mini-card">
              <div className="mini-icon">🎭</div>
              <div className="mini-name">르네상스</div>
              <div className="mini-badge">🤖 AI 선택</div>
            </div>
            
            <div className="movement-mini-card">
              <div className="mini-icon">🌟</div>
              <div className="mini-name">바로크</div>
              <div className="mini-badge">🤖 AI 선택</div>
            </div>
            
            <div className="movement-mini-card">
              <div className="mini-icon">💐</div>
              <div className="mini-name">로코코</div>
              <div className="mini-badge">🤖 AI 선택</div>
            </div>
            
            <div className="movement-mini-card">
              <div className="mini-icon">🌊</div>
              <div className="mini-name">낭만주의</div>
              <div className="mini-badge">🤖 AI 선택</div>
            </div>
            
            <div className="movement-mini-card">
              <div className="mini-icon">🌅</div>
              <div className="mini-name">인상주의</div>
              <div className="mini-badge">🤖 AI 선택</div>
            </div>
            
            <div className="movement-mini-card">
              <div className="mini-icon">🎨</div>
              <div className="mini-name">후기인상주의</div>
              <div className="mini-badge">🤖 AI 선택</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .upload-screen {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 3rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .upload-container {
          max-width: 900px;
          width: 100%;
          margin: 0 auto;
        }

        /* 헤더 */
        .upload-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .logo-icon {
          font-size: 3rem;
        }

        .logo-text {
          font-size: 3rem;
          font-weight: 900;
          color: white;
          letter-spacing: -0.02em;
        }

        .brand-tagline {
          color: white;
          font-size: 1.4rem;
          font-weight: 600;
          margin: 0.75rem 0 0.5rem 0;
        }

        .brand-subtitle {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.1rem;
          font-weight: 500;
          margin: 0;
        }

        /* 업로드 박스 */
        .upload-box {
          background: white;
          border: 4px dashed #cbd5e0;
          border-radius: 24px;
          padding: 4rem 2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 2rem;
        }

        .upload-box:hover {
          border-color: #667eea;
          background: #f7fafc;
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
        }

        .upload-box.drag-active {
          border-color: #667eea;
          background: linear-gradient(135deg, #f0f4ff 0%, #e8ecff 100%);
          transform: scale(1.02);
        }

        .upload-content {
          text-align: center;
        }

        .camera-icon {
          font-size: 5rem;
          margin-bottom: 1.5rem;
          opacity: 0.8;
        }

        .upload-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #2d3748;
          margin: 0 0 0.75rem 0;
        }

        .upload-hint {
          font-size: 1.1rem;
          color: #718096;
          margin: 0;
        }

        /* 업로드 버튼 */
        .upload-button {
          width: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 1.5rem;
          border-radius: 16px;
          font-size: 1.4rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 3rem;
          box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
        }

        .upload-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4);
        }

        /* 화풍 선택 미리보기 */
        .style-preview {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px);
          border-radius: 24px;
          padding: 2.5rem;
          margin-bottom: 2rem;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .preview-title {
          color: white;
          font-size: 2rem;
          font-weight: 800;
          margin: 0 0 0.75rem 0;
          text-align: center;
        }

        .preview-subtitle {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.1rem;
          text-align: center;
          margin: 0 0 2rem 0;
        }

        .category-preview {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .category-card {
          background: white;
          border-radius: 16px;
          padding: 1.75rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .category-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
        }

        .category-icon {
          font-size: 3rem;
          margin-bottom: 0.75rem;
        }

        .category-name {
          font-size: 1.2rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 0.5rem;
        }

        .category-desc {
          font-size: 0.95rem;
          color: #718096;
        }

        /* 미술사조 미리보기 */
        .movements-preview {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(12px);
          border-radius: 24px;
          padding: 2.5rem;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .movements-title {
          color: white;
          font-size: 1.25rem;
          font-weight: 600;
          text-align: center;
          margin: 0 0 2rem 0;
        }

        .movements-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }

        .movement-mini-card {
          background: white;
          border-radius: 12px;
          padding: 1.25rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .movement-mini-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .mini-icon {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .mini-name {
          font-size: 1rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 0.5rem;
        }

        .mini-badge {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.3rem 0.6rem;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        /* 반응형 */
        @media (max-width: 768px) {
          .upload-screen {
            padding: 2rem 1rem;
          }

          .logo-text {
            font-size: 2.5rem;
          }

          .brand-tagline {
            font-size: 1.2rem;
          }

          .upload-box {
            padding: 3rem 1.5rem;
          }

          .camera-icon {
            font-size: 4rem;
          }

          .upload-title {
            font-size: 1.3rem;
          }

          .category-preview {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .movements-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default UploadScreen;
