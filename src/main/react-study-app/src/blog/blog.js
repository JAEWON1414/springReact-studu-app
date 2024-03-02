import React, { useState } from 'react';
import './blog.css'; // CSS 파일 임포트
import initialBlogContents from "./blogContents"; // 초기 데이터 임포트

function Header() {
    return (
        <header className="blog-header">
            <div className="left-content">
                <img src="" alt="Description of the image" />
                <p>가나다라</p>
            </div>
            <div className="menu">
                <div className="menu-item">게시글 관리</div>
                <div className="menu-item">댓글 관리</div>
                <div className="menu-item">검색</div>
            </div>
        </header>
    );
}


function Main({ categories, contents, onRemoveCategory }) {
    const [activeArticle, setActiveArticle] = useState(null);

    const handleClick = (article) => {
        setActiveArticle(article);
    };

    return (
        <main className="blog-main">
            {categories.map((category, index) => (
                <div className="category" key={index}>
                    <h2>{category}</h2>
                    <button onClick={() => onRemoveCategory(category)}>삭제</button>
                    <div className="image-gallery">
                        {contents.filter(content => content.category === category).map((content, contentIndex) => (
                            <div key={contentIndex} onClick={() => handleClick(content)} style={{ cursor: 'pointer', marginRight: '10px' }}>
                                <img src={content.image} alt={`이미지 ${contentIndex}`} />
                                <p>{content.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            {activeArticle && (
                <div className="article-modal">
                    <h2>{activeArticle.title}</h2>
                    <p>{activeArticle.content}</p>
                    <button onClick={() => setActiveArticle(null)}>닫기</button>
                </div>
            )}
        </main>
    );
}

function Sidebar({ categories, onAddCategory, onRemoveCategory }) {
    const [categoryName, setCategoryName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddCategory(categoryName);
        setCategoryName(''); // 입력 필드 초기화
    };

    return (
        <aside className="blog-sidebar">
            <h2>사이드바</h2>
            <ul>
                {categories.map(category => (
                    <li key={category}>
                        {category}
                        <button onClick={() => onRemoveCategory(category)}>삭제</button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="카테고리 추가"
                />
                <button type="submit">추가</button>
            </form>
        </aside>
    );
}

function Footer() {
    return (
        <footer className="blog-footer">
            <p>블로그 푸터</p>
        </footer>
    );
}

function Blog() {
    const [categories, setCategories] = useState(['이산수학']); // 초기 카테고리 설정
    const [contents, setContents] = useState(initialBlogContents); // blogContents.js에서 가져온 초기 데이터

    const addCategory = (category) => {
        if (!categories.includes(category)) {
            setCategories([...categories, category]);
        }
    };

    const removeCategory = (categoryToRemove) => {
        setCategories(categories.filter(category => category !== categoryToRemove));
        setContents(contents.filter(content => content.category !== categoryToRemove)); // 해당 카테고리의 게시물도 삭제
    };

    return (
        <div>
            <Header />
            <div className="content-container">
                <Main categories={categories} contents={contents} onRemoveCategory={removeCategory} />
                <Sidebar categories={categories} onAddCategory={addCategory} onRemoveCategory={removeCategory} />
            </div>
            {/*<Footer />*/}
        </div>
    );
}

export default Blog;
