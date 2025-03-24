waveware Homepage
설치 방법
---bash----
1. 설치
npm ci or install

2. 로컬 개발 서버 실행
npm run dev
-----------


세팅 개발 환경
Node: 22.14.0
npm: 10.9.2
next: 14.1.0
Tailwind CSS 3.4.17


디자인
 해상도 1920×1080 기준으로 Figma 작업

개발
 컨테이너 max-width 1440px 설정
 Tailwind의 sm, md, lg, xl 브레이크포인트 사용 가능
  [Tailwind 브레이크포인트 정리
	이름		뜻	    	적용시점
	sm:		small		640px 이상일 때
	md:		medium		768px 이상일 때
	lg:		large		1024px 이상일 때
	xl:		더 large		1280px 이상일 때
	2xl:	더더 large	1536px 이상일 때]	
	
	Tailwind 기본 세팅

	[`max-width: 1440px` 컨테이너 기준
	Figma 기준 `line-height: 1.4`, `letter-spacing: -0.025em`
	기본 폰트: Pretendard 
	기본 스타일은 `src/styles/globals.css`에 적용되어 있음]
		
	
 Pretendard 전역 폰트 적용중

협업
 Git 브랜치 사용
 Figma 파일 하나로 통합
 
폴더 구조
 각자 폴더 생성후 각자 작성



