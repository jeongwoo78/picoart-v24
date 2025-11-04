// PicoArt v24 - StyleSelection (아이폰 스타일 - 심플 & 컴팩트)
import React, { useState, useMemo } from 'react';
import { artStyles, styleCategories } from '../data/artStyles';

const StyleSelection = ({ photo, onSelect }) => {
  const [mainCategory, setMainCategory] = useState('movements');

  const mainCategories = {
    movements: {
      name: '미술사조',
      icon: '🎨',
      subcategories: ['ancient', 'byzantineIslamic', 'renaissance', 'baroque', 'rococo', 'romanticism', 'impressionism', 'postImpressionism', 'fauvism', 'expressionism']
    },
    masters: {
      name: '거장 컬렉션',
      icon: '⭐',
      subcategories: ['masters']
    },
    oriental: {
      name: '동양화',
      icon: '🎎',
      subcategories: ['oriental']
    }
  };

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
      <div className="selection-container">
        {/* 업로드 사진 - 중앙 상단 */}
        {photo && (
          <div className="photo-display">
            <img src={photo} alt="Uploaded" />
          </div>
        )}

        {/* 대 카테고리 탭 */}
        <div className="category-tabs">
          {Object.entries(mainCategories).map(([key, category]) => (
            <button
              key={key}
              className={`category-tab ${mainCategory === key ? 'active' : ''}`}
              onClick={() => handleMainCategoryChange(key)}
            >
              <span className="tab-icon">{category.icon}</span>
              <span className="tab-name">{category.name}</span>
            </button>
          ))}
        </div>

        {/* 스타일 카드 */}
        <div className="styles-container">
          {mainCategory === 'movements' && (
            <div className="styles-grid">
              {currentSubcategories.map(categoryKey => (
                <button
                  key={categoryKey}
                  className="style-card"
                  onClick={() => handleMovementCardClick(categoryKey)}
                >
                  <div className="card-icon">{styleCategories[categoryKey].icon || '🎨'}</div>
                  <div className="card-name">{styleCategories[categoryKey].name}</div>
                  <div className="card-era">{styleCategories[categoryKey].era}</div>
                </button>
              ))}
            </div>
          )}

          {mainCategory === 'masters' && groupedStyles['masters'] && (
            <div className="styles-grid">
              {groupedStyles['masters'].styles.map(style => (
                <button
                  key={style.id}
                  className="style-card"
                  onClick={() => onSelect(style)}
                >
                  <div className="card-icon">{style.icon}</div>
                  <div className="card-name">{style.name}</div>
                  <div className="card-era">{style.artist?.era || style.nameEn}</div>
                </button>
              ))}
            </div>
          )}

          {mainCategory === 'oriental' && groupedStyles['oriental'] && (
            <div className="styles-grid">
              {groupedStyles['oriental'].styles.map(style => (
                <button
                  key={style.id}
                  className="style-card"
                  onClick={() => onSelect(style)}
                >
                  <div className="card-icon">{style.icon}</div>
                  <div className="card-name">{style.name}</div>
                  <div className="card-era">{style.nameEn}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .style-selection {
          min-height: 100vh;
          background: #f5f5f7;
          padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
        }

        .selection-container {
          max-width: 500px;
          margin: 0 auto;
          padding: 16px;
        }

        /* 업로드 사진 */
        .photo-display {
          width: 100%;
          margin-bottom: 16px;
          border-radius: 12px;
          overflow: hidden;
          background: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .photo-display img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
        }

        /* 카테고리 탭 */
        .category-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 16px;
          background: white;
          padding: 6px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .category-tab {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 12px 8px;
          border: none;
          border-radius: 8px;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .category-tab:active {
          transform: scale(0.96);
        }

        .category-tab.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .tab-icon {
          font-size: 24px;
          line-height: 1;
        }

        .tab-name {
          font-size: 11px;
          font-weight: 600;
          color: #1d1d1f;
          letter-spacing: -0.01em;
        }

        .category-tab.active .tab-name {
          color: white;
        }

        /* 스타일 그리드 */
        .styles-container {
          background: white;
          border-radius: 12px;
          padding: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .styles-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .style-card {
          background: #f5f5f7;
          border: none;
          border-radius: 10px;
          padding: 16px 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .style-card:active {
          transform: scale(0.96);
          background: #e8e8ed;
        }

        .card-icon {
          font-size: 36px;
          line-height: 1;
        }

        .card-name {
          font-size: 13px;
          font-weight: 600;
          color: #1d1d1f;
          letter-spacing: -0.01em;
        }

        .card-era {
          font-size: 10px;
          color: #86868b;
          font-weight: 500;
        }

        /* 다크모드 대응 */
        @media (prefers-color-scheme: dark) {
          .style-selection {
            background: #000000;
          }

          .photo-display,
          .category-tabs,
          .styles-container {
            background: #1c1c1e;
            box-shadow: none;
          }

          .category-tab {
            color: #f5f5f7;
          }

          .tab-name,
          .card-name {
            color: #f5f5f7;
          }

          .style-card {
            background: #2c2c2e;
          }

          .style-card:active {
            background: #3a3a3c;
          }

          .card-era {
            color: #98989d;
          }
        }

        /* 아이폰 노치 대응 */
        @supports (padding: max(0px)) {
          .selection-container {
            padding-top: max(16px, env(safe-area-inset-top));
            padding-bottom: max(16px, env(safe-area-inset-bottom));
          }
        }

        /* 작은 화면 최적화 */
        @media (max-width: 375px) {
          .card-icon {
            font-size: 32px;
          }

          .card-name {
            font-size: 12px;
          }

          .card-era {
            font-size: 9px;
          }
        }

        /* 큰 화면 */
        @media (min-width: 768px) {
          .styles-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  );
};

export default StyleSelection;
