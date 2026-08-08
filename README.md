# UX/UI Portfolio Starter Kit V1

UX/UI 포트폴리오 수업을 위한 가벼운 React 기반 Starter Kit입니다. React는 화면을 컴포넌트로 나누어 작업하기 위한 도구로 사용하고, 최종 결과물은 `dist` 폴더의 정적 파일로 배포합니다.

## 시작하기

1. [Node.js](https://nodejs.org/) LTS를 설치합니다.
2. 이 폴더에서 터미널을 엽니다.
3. 패키지를 설치합니다.

```bash
npm install
npm run dev
```

브라우저에서 안내된 로컬 주소를 엽니다.

## 어디를 수정하나요?

- `src/pages`: Home, About, 프로젝트처럼 하나의 화면을 수정합니다.
- `src/components`: 여러 페이지에서 반복 사용하는 UI를 수정합니다.
- `src/styles`: 색상, 글꼴, 간격, 레이아웃을 수정합니다.
- `public/images`: 직접 사용할 이미지를 넣습니다.

React에서 Page는 하나의 화면, Component는 여러 곳에서 다시 사용할 수 있는 UI 조각, Props는 Component에 전달하는 내용입니다.

## 페이지 수정

- Home: `src/pages/Home.jsx`에서 소개 문구와 Selected Works를 수정합니다.
- About: `src/pages/About.jsx`에서 프로필, 경험, 기술, 연락처를 수정합니다.
- Project: `src/pages/projects/Project01.jsx` 같은 파일에서 프로젝트 내용을 수정합니다. 세 페이지는 서로 다른 레이아웃 예시입니다.
- 이미지: `public/images`에 파일을 넣고 컴포넌트의 `image` 경로를 `/images/파일명.jpg`로 바꿉니다. 샘플은 학습을 위해 외부 이미지 URL을 사용합니다.
- CSS: `src/styles/variables.css`에서 색상과 기본 간격을 먼저 바꾸고, `global.css`, `layout.css`, `components.css`에서 세부 스타일을 수정합니다.

## 새 Component / Project 추가

새 UI 패턴은 `src/components`에 직관적인 이름의 `.jsx` 파일로 만듭니다. 반복되는 내용을 Props로 받아 재사용합니다. 새 프로젝트는 `src/pages/projects/Project04.jsx`를 만들고, `src/App.jsx`의 `Routes` 안에 다음처럼 Route를 추가합니다.

```jsx
<Route path="/works/project-04" element={<Project04 />} />
```

필요하면 `ProjectGrid.jsx`의 프로젝트 목록에도 카드를 추가합니다. 라우팅은 정적 호스팅에 적합한 `HashRouter`를 사용하므로 주소는 `#/about`, `#/works/project-01`처럼 표시됩니다.

## 빌드와 배포

```bash
npm run build
npm run preview
```

`npm run build` 후 생성되는 `dist` 폴더 전체를 일반적인 정적 웹호스팅에 업로드합니다. 운영 서버에 Node.js, npm, 백엔드, 별도 rewrite 설정은 필요하지 않습니다.

## 기술 범위

Vite, React, JavaScript, React Router의 HashRouter, Vanilla CSS만 사용합니다. TypeScript, Tailwind, Next.js, 백엔드, 데이터베이스, 전역 상태 관리, 애니메이션 라이브러리는 포함하지 않았습니다.
