// PicoArt v24 - StyleSelection (첫 화면: 미술사조 기본 선택)
import React, { useState, useMemo } from 'react';
import { artStyles, styleCategories } from '../data/artStyles';

const StyleSelection = ({ photo, onSelect }) => {
  const [mainCategory, setMainCategory] = useState('movements'); // 기본: 미술사조

  // 대 카테고리 정의
  const mainCategories = {
    movements: {
      name: '미술사조',
      icon: '🎨',
      description: '서양 미술의 흐름',
      subcategories: ['ancient', 'byzantineIslamic', 'renaissance', 'baroque', 'rococo', 'romanticism', 'impressionism', 'postImpressionism', 'fauvism', 'expressionism']
    },
    masters: {
      name: '거장 컬렉션',
      icon: '⭐',
      description: '시대를 대표하는 거장들',
      subcategories: ['masters']
    },
    oriental: {
      name: '동양화',
      icon: '🎎',
      description: '한·중·일 전통 미술',
      subcategories: ['oriental']
    }
  };

  // 카테고리별로 스타일 그룹화
  const groupedStyles = useMemo(() => {
    const groups = {};
    
    Object.entries(styleCategories).forEach(([key, category]) => {
      groups[key] = {
        category,
        styles: artStyles.filter(style => style.category === key)
      };
    });

    return groups;
  }, []);

  const currentSubcategories = mainCategories[mainCategory].subcategories;

  const handleMainCategoryChange = (newMainCategory) => {
    setMainCategory(newMainCategory);
  };

  // 미술사조 카드 클릭 핸들러
  const handleMovementCardClick = (categoryKey) => {
    const categoryStyles = groupedStyles[categoryKey]?.styles || [];
    if (categoryStyles.length > 0) {
      const categoryInfo = styleCategories[categoryKey];
      onSelect({
        ...categoryStyles[0],
        isMovementCategory: true,
        categoryName: categoryInfo.name,
        categoryKey: categoryKey
      });
    }
  };

  return (
    <div className="style-selection">
      {/* 업로드한 사진 미리보기 */}
      {photo && (
        <div className="photo-preview">
          <img src={photo} alt="Uploaded" />
          <div className="photo-label">업로드 사진</div>
        </div>
      )}

      <div className="selection-container">
        {/* 헤더 */}
        <div className="selection-header">
          <h1>🎨 화풍 선택</h1>
          <p className="header-subtitle">
            사진에 적용할 미술 스타일을 선택하세요
          </p>
        </div>

        {/* 대 카테고리 탭 */}
        <div className="main-category-nav">
          <div className="main-category-tabs">
            {Object.entries(mainCategories).map(([key, category]) => (
              <button
                key={key}
                className={`main-category-tab ${mainCategory === key ? 'active' : ''}`}
                onClick={() => handleMainCategoryChange(key)}
              >
                <span className="tab-icon">{category.icon}</span>
                <span className="tab-name">{category.name}</span>
                <span className="tab-desc">{category.description}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 스타일 카드 그리드 */}
        <div className="styles-section">
          {/* 미술사조: 10개 카드 */}
          {mainCategory === 'movements' && (
            <>
              <div className="section-header">
                <h2>미술사조</h2>
                <p className="section-desc">
                  10개의 미술사조 중 선택하시면 AI가 시대별 대표 화가를 자동으로 선택합니다
                </p>
              </div>

              <div className="styles-grid">
                {currentSubcategories.map(categoryKey => (
                  <button
                    key={categoryKey}
                    className="style-card movement-card"
                    onClick={() => handleMovementCardClick(categoryKey)}
                  >
                    <div className="card-icon">{styleCategories[categoryKey].icon || '🎨'}</div>
                    
                    <div className="card-content">
                      <div className="card-header">
                        <h3>{styleCategories[categoryKey].name}</h3>
                        <p className="card-era">{styleCategories[categoryKey].era}</p>
                      </div>

                      <div className="card-badge-container">
                        <div className="model-badge">🤖 AI 자동 선택</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* 거장 컬렉션 */}
          {mainCategory === 'masters' && groupedStyles['masters'] && (
            <>
              <div className="section-header">
                <h2>{groupedStyles['masters'].category.name}</h2>
                <p className="section-desc">
                  {groupedStyles['masters'].category.era}
                </p>
              </div>

              <div className="styles-grid">
                {groupedStyles['masters'].styles.map(style => (
                  <button
                    key={style.id}
                    className="style-card"
                    onClick={() => onSelect(style)}
                  >
                    <div className="card-icon">{style.icon}</div>
                    
                    <div className="card-content">
                      <div className="card-header">
                        <h3>{style.name}</h3>
                        <p className="card-english">{style.nameEn}</p>
                      </div>

                      {style.artist && (
                        <div className="artist-info">
                          <span className="artist-era">
                            {style.artist.era}
                          </span>
                          {style.artist.essence && (
                            <p className="artist-essence">
                              {style.artist.essence}
                            </p>
                          )}
                        </div>
                      )}

                      <p className="card-description">{style.description}</p>

                      {style.model && (
                        <div className="card-badge-container">
                          <div className="model-badge">
                            {style.model === 'FLUX' ? '⚡ FLUX' : '🚀 SDXL'}
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* 동양화 */}
          {mainCategory === 'oriental' && groupedStyles['oriental'] && (
            <>
              <div className="section-header">
                <h2>{groupedStyles['oriental'].category.name}</h2>
                <p className="section-desc">
                  {groupedStyles['oriental'].category.era}
                </p>
              </div>

              <div className="styles-grid">
                {groupedStyles['oriental'].styles.map(style => (
                  <button
                    key={style.id}
                    className="style-card"
                    onClick={() => onSelect(style)}
                  >
                    <div className="card-icon">{style.icon}</div>
                    
                    <div className="card-content">
                      <div className="card-header">
                        <h3>{style.name}</h3>
                        <p className="card-english">{style.nameEn}</p>
                      </div>

                      {style.artist && (
                        <div className="artist-info">
                          <span className="artist-era">
                            {style.artist.era}
                          </span>
                          {style.artist.essence && (
                            <p className="artist-essence">
                              {style.artist.essence}
                            </p>
                          )}
                        </div>
                      )}

                      <p className="card-description">{style.description}</p>

                      {style.model && (
                        <div className="card-badge-container">
                          <div className="model-badge">
                            {style.model === 'FLUX' ? '⚡ FLUX' : '🚀 SDXL'}
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .style-selection {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem 1rem;
          position: relative;
        }

        /* 사진 미리보기 */
        .photo-preview {
          position: fixed;
          top: 24px;
          right: 24px;
          width: 160px;
          z-index: 1000;
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
          border: 3px solid white;
        }

        .photo-preview img {
          width: 100%;
          height: 160px;
          object-fit: cover;
          display: block;
        }

        .photo-label {
          padding: 10px;
          text-align: center;
          font-size: 0.9rem;
          font-weight: 700;
          color: #667eea;
          background: white;
        }

        .selection-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        /* 헤더 */
        .selection-header {
          text-align: center;
          color: white;
          margin-bottom: 3rem;
        }

        .selection-header h1 {
          font-size: 3rem;
          margin: 0 0 0.75rem 0;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .header-subtitle {
          font-size: 1.25rem;
          opacity: 0.95;
          margin: 0;
          font-weight: 500;
        }

        /* 대 카테고리 탭 */
        .main-category-nav {
          margin-bottom: 3rem;
        }

        .main-category-tabs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .main-category-tab {
          background: rgba(255, 255, 255, 0.12);
          border: 3px solid rgba(255, 255, 255, 0.25);
          color: white;
          padding: 1.75rem 1.25rem;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          backdrop-filter: blur(12px);
        }

        .main-category-tab:hover {
          background: rgba(255, 255, 255, 0.22);
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }

        .main-category-tab.active {
          background: rgba(255, 255, 255, 0.95);
          border-color: white;
          color: #667eea;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
          transform: translateY(-2px);
        }

        .main-category-tab .tab-icon {
          font-size: 3rem;
          margin-bottom: 0.25rem;
        }

        .main-category-tab .tab-name {
          font-size: 1.4rem;
          font-weight: 800;
          letter-spacing: -0.01em;
        }

        .main-category-tab .tab-desc {
          font-size: 0.95rem;
          opacity: 0.85;
          font-weight: 500;
        }

        .main-category-tab.active .tab-desc {
          opacity: 0.7;
        }

        /* 스타일 섹션 */
        .styles-section {
          background: rgba(255, 255, 255, 0.12);
          border-radius: 24px;
          padding: 3rem 2.5rem;
          backdrop-filter: blur(12px);
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .section-header {
          text-align: center;
          color: white;
          margin-bottom: 3rem;
        }

        .section-header h2 {
          font-size: 2.5rem;
          margin: 0 0 1rem 0;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .section-desc {
          font-size: 1.1rem;
          opacity: 0.9;
          margin: 0;
          font-weight: 500;
          line-height: 1.6;
        }

        /* 카드 그리드 */
        .styles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.75rem;
        }

        .style-card {
          background: white;
          border: none;
          border-radius: 20px;
          padding: 2rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .style-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
        }

        .card-icon {
          font-size: 3.5rem;
          text-align: center;
          margin-bottom: 0.5rem;
        }

        .card-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          flex: 1;
        }

        .card-header h3 {
          margin: 0;
          font-size: 1.6rem;
          color: #2d3748;
          font-weight: 800;
          letter-spacing: -0.01em;
        }

        .card-era,
        .card-english {
          margin: 0.5rem 0 0 0;
          font-size: 0.95rem;
          color: #718096;
          font-weight: 600;
        }

        .artist-info {
          background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
          padding: 1rem;
          border-radius: 12px;
          border-left: 4px solid #667eea;
        }

        .artist-era {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.35rem 0.85rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          letter-spacing: 0.01em;
        }

        .artist-essence {
          margin: 0.75rem 0 0 0;
          font-size: 0.95rem;
          color: #4a5568;
          line-height: 1.6;
          font-weight: 500;
        }

        .card-description {
          margin: 0;
          color: #4a5568;
          line-height: 1.7;
          font-size: 0.95rem;
          font-weight: 500;
        }

        .card-badge-container {
          margin-top: auto;
        }

        .model-badge {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
        }

        /* 미술사조 카드 특별 스타일 */
        .movement-card {
          min-height: 240px;
        }

        .movement-card .card-content {
          justify-content: space-between;
        }

        /* 반응형 */
        @media (max-width: 1200px) {
          .styles-grid {
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .style-selection {
            padding: 1rem 0.75rem;
          }

          .photo-preview {
            width: 120px;
            top: 16px;
            right: 16px;
          }

          .photo-preview img {
            height: 120px;
          }

          .selection-header h1 {
            font-size: 2.25rem;
          }

          .header-subtitle {
            font-size: 1.1rem;
          }

          .main-category-tabs {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .styles-section {
            padding: 2rem 1.5rem;
          }

          .section-header h2 {
            font-size: 2rem;
          }

          .styles-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .card-icon {
            font-size: 3rem;
          }

          .card-header h3 {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </div>
  );
};

export default StyleSelection;
