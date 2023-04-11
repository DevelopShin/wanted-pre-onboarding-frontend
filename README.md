# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### 프로젝트의 실행 방법

- `npm install`
- `npm start`

# 데모영상
[![테스트영상]([http://img.youtube.com/vi/mCFHlX2jFnk/0.jpg](https://user-images.githubusercontent.com/73675549/231036386-6167a4c9-a404-42a6-9a2b-3c8ca229c4bf.PNG))](https://youtu.be/mCFHlX2jFnk)



### 깃 배포로 인한 기본구조변경 사항

- base uri 변경됨. `//localhost:port` => `//localhost:port/githubRepoName`
- setupProxy의 path가 기봇 설정과 다름
- setupProxy의 pathRewrite 도 수정

### 사용 라이브러리

- [Create React App](https://github.com/facebook/create-react-app). 기본 세팅 라이브러리
- react-router-dom
- axios
- http-proxy-middleware (api 요청시 cors 문제 해결 위함)
- 스타일링
  -- 디자인이 많이 필요한게 아니라서 스타일 라이브러리 없이 css만으로 스타일링.
