// PicoArt v24 - StyleSelection (FIXED: 미술사조 선택 가능 + 사진 미리보기 + 통일 UI)
import React, { useState, useMemo } from 'react';
import { artStyles, styleCategories } from '../data/artStyles';

const StyleSelection = ({ photo, onSelect }) => {
  const [mainCategory, setMainCategory] = useState('movements');
  const [subCategory, setSubCategory] = useState('renaissance');
  const [showMovementDetail, setShowMovementDetail] = useState(false);

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

  const getCategoryCount = (categoryKey) => {
    return groupedStyles[categoryKey]?.styles.length || 0;
  };

  const handleMainCategoryChange = (newMainCategory) => {
    setMainCategory(newMainCategory);
    setSubCategory(mainCategories[newMainCategory].subcategories[0]);
    setShowMovementDetail(false);
  };

  // 소 카테고리 클릭: 선택만 하고 상세 화면 표시
  const handleSubCategoryClick = (categoryKey) => {
    setSubCategory(categoryKey);
    setShowMovementDetail(true);
  };

  // 확정 버튼 클릭: 실제 선택 처리
  const handleConfirmSelection = () => {
    if (mainCategory === 'movements') {
      const categoryStyles = groupedStyles[subCategory]?.styles || [];
      if (categoryStyles.length > 0) {
        const categoryInfo = styleCategories[subCategory];
        onSelect({
          ...categoryStyles[0],
          isMovementCategory: true,
          categoryName: categoryInfo.name,
          categoryKey: subCategory
        });
      }
    }
  };

  return (
    <div className="style-selection">
      {/* 업로드한 사진 미리보기 */}
      {photo && (
        <div className="photo-preview">
          <img src={photo} alt="Uploaded" />
          <div className="photo-label">변환할 사진</div>
        </div>
      )}

      <div className="selection-container">
        <div className="selection-header">
          <h1>🎨 화풍 선택</h1>
          <p className="header-subtitle">
            총 {artStyles.length}개의 화가와 스타일
          </p>
        </div>

        {/* 1단계: 대 카테고리 선택 */}
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

        {/* 2단계: 소 카테고리 선택 (탭) */}
        <div className="sub-category-nav">
          <div className="sub-category-tabs">
            {currentSubcategories.map(key => (
              <button
                key={key}
                className={`sub-category-tab ${subCategory === key ? 'active' : ''}`}
                onClick={() => handleSubCategoryClick(key)}
              >
                <span className="tab-name">{styleCategories[key].name}</span>
                <span className="tab-era">{styleCategories[key].era}</span>
                <span className="tab-count">{getCategoryCount(key)}개</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3단계: 상세 정보 및 선택 */}
        {/* 미술사조: 확정 버튼 표시 */}
        {mainCategory === 'movements' && showMovementDetail && (
          <div className="styles-section">
            <div className="section-header">
              <h2>{styleCategories[subCategory].name}</h2>
              <p className="section-era">{styleCategories[subCategory].era}</p>
            </div>
            
            <div className="movement-confirm">
              <p className="movement-desc">
                이 시대의 대표 화가들 중에서 AI가 사진에 가장 적합한 화가를 선택합니다.
              </p>
              <button className="confirm-button" onClick={handleConfirmSelection}>
                이 스타일로 변환하기
              </button>
            </div>
          </div>
        )}

        {/* 거장/동양화: 개별 카드 표시 */}
        {mainCategory !== 'movements' && (
          <div className="styles-section">
            {groupedStyles[subCategory] && (
              <>
                <div className="section-header">
                  <h2>{groupedStyles[subCategory].category.name}</h2>
                  <p className="section-era">
                    {groupedStyles[subCategory].category.era}
                  </p>
                </div>

                <div className="styles-grid">
                  {groupedStyles[subCategory].styles.map(style => (
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
                          <div className="model-badge">
                            {style.model === 'FLUX' ? '⚡ FLUX' : '🚀 SDXL'}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <style>{`
        .style-selection {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem;
          position: relative;
        }

        /* 사진 미리보기 */
        .photo-preview {
          position: fixed;
          top: 20px;
          right: 20px;
          width: 150px;
          z-index: 1000;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .photo-preview img {
          width: 100%;
          height: 150px;
          object-fit: cover;
          display: block;
        }

        .photo-label {
          padding: 8px;
          text-align: center;
          font-size: 0.85rem;
          font-weight: 600;
          color: #667eea;
          background: white;
        }

        .selection-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .selection-header {
          text-align: center;
          color: white;
          margin-bottom: 2rem;
        }

        .selection-header h1 {
          font-size: 2.5rem;
          margin: 0 0 0.5rem 0;
        }

        .header-subtitle {
          font-size: 1.1rem;
          opacity: 0.95;
          margin: 0;
        }

        /* 1단계: 대 카테고리 */
        .main-category-nav {
          margin-bottom: 1.5rem;
        }

        .main-category-tabs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        .main-category-tab {
          background: rgba(255, 255, 255, 0.15);
          border: 3px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 1.5rem 1rem;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          backdrop-filter: blur(10px);
        }

        .main-category-tab:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }

        .main-category-tab.active {
          background: rgba(255, 255, 255, 0.35);
          border-color: rgba(255, 255, 255, 0.8);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        .main-category-tab .tab-icon {
          font-size: 2.5rem;
        }

        .main-category-tab .tab-name {
          font-size: 1.3rem;
          font-weight: 700;
        }

        .main-category-tab .tab-desc {
          font-size: 0.9rem;
          opacity: 0.9;
        }

        /* 2단계: 소 카테고리 */
        .sub-category-nav {
          margin-bottom: 2rem;
        }

        .sub-category-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          justify-content: center;
        }

        .sub-category-tab {
          background: rgba(255, 255, 255, 0.15);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
          backdrop-filter: blur(10px);
        }

        .sub-category-tab:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }

        .sub-category-tab.active {
          background: rgba(255, 255, 255, 0.35);
          border-color: rgba(255, 255, 255, 0.8);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .sub-category-tab .tab-name {
          font-size: 1.1rem;
          font-weight: 600;
        }

        .sub-category-tab .tab-era {
          font-size: 0.85rem;
          opacity: 0.85;
        }

        .sub-category-tab .tab-count {
          font-size: 0.8rem;
          opacity: 0.75;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.2rem 0.6rem;
          border-radius: 10px;
          margin-top: 0.25rem;
        }

        /* 3단계: 스타일 그리드 */
        .styles-section {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          padding: 2rem;
          backdrop-filter: blur(10px);
        }

        .section-header {
          text-align: center;
          color: white;
          margin-bottom: 1.5rem;
        }

        .section-header h2 {
          font-size: 2rem;
          margin: 0 0 0.5rem 0;
        }

        .section-era {
          font-size: 1.1rem;
          opacity: 0.9;
          margin: 0;
        }

        /* 미술사조 확정 버튼 */
        .movement-confirm {
          text-align: center;
          padding: 2rem;
        }

        .movement-desc {
          color: white;
          font-size: 1.1rem;
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .confirm-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 1.2rem 3rem;
          border-radius: 12px;
          font-size: 1.2rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .confirm-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
        }

        .styles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .style-card {
          background: white;
          border: none;
          border-radius: 16px;
          padding: 1.5rem;
          cursor: pointer;
          transition: all 0.3s;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .style-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
        }

        .card-icon {
          font-size: 3rem;
          text-align: center;
        }

        .card-content {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .card-header h3 {
          margin: 0;
          font-size: 1.5rem;
          color: #2d3748;
        }

        .card-english {
          margin: 0.25rem 0 0 0;
          font-size: 0.9rem;
          color: #718096;
        }

        .artist-info {
          background: #f7fafc;
          padding: 0.75rem;
          border-radius: 8px;
        }

        .artist-era {
          display: inline-block;
          background: #667eea;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .artist-essence {
          margin: 0.5rem 0 0 0;
          font-size: 0.9rem;
          color: #4a5568;
          line-height: 1.5;
        }

        .card-description {
          margin: 0;
          color: #4a5568;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .model-badge {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          align-self: flex-start;
        }

        /* 반응형 */
        @media (max-width: 768px) {
          .style-selection {
            padding: 1rem;
          }

          .photo-preview {
            width: 100px;
            top: 10px;
            right: 10px;
          }

          .photo-preview img {
            height: 100px;
          }

          .selection-header h1 {
            font-size: 2rem;
          }

          .main-category-tabs {
            grid-template-columns: 1fr;
          }

          .sub-category-tabs {
            flex-direction: column;
          }

          .styles-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default StyleSelection;
