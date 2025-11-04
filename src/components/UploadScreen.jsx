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

    // FileReader로 base64 변환
    const reader = new FileReader();
    reader.onloadend = () => {
      // base64 문자열을 부모에게 전달
      onUpload(reader.result);
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
            <h3 className="upload-title">사진 업로드</h3>
            <p className="upload-hint">클릭하거나 드래그하세요</p>
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
          max-width: 500px;
          width: 100%;
        }

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
        }

        .brand-tagline {
          color: white;
          font-size: 1.2rem;
          font-weight: 600;
          margin: 0;
        }

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
        }

        .upload-box.drag-active {
          border-color: #667eea;
          background: #f0f4ff;
          transform: scale(1.02);
        }

        .upload-content {
          text-align: center;
        }

        .camera-icon {
          font-size: 5rem;
          margin-bottom: 1.5rem;
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

        .upload-button {
          width: 100%;
          background: white;
          color: #667eea;
          border: none;
          padding: 1.5rem;
          border-radius: 16px;
          font-size: 1.4rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .upload-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(255, 255, 255, 0.3);
        }

        @media (max-width: 768px) {
          .upload-screen {
            padding: 2rem 1rem;
          }

          .logo-text {
            font-size: 2.5rem;
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
        }
      `}</style>
    </div>
  );
}

export default UploadScreen;
