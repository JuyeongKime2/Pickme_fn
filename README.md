# PickMe (Spring Boot + FastAPI + React)

기존 `pickme-flask`(Flask 단일 서버)를 3개 서버 구조로 옮기기 위한 프로젝트 뼈대입니다.

```
React (5173)  ──/api──▶  Spring Boot (8080)  ──▶  FastAPI (8000)
 화면                     로그인·고민기록·커뮤니티·DB     AI상담·결정도우미(LLM/ML/DL)
```

- React 는 Spring Boot 만 호출합니다. FastAPI 는 Spring Boot 만 호출합니다.
- DB(PostgreSQL)는 Spring Boot 만 접근합니다.

## 버전

| 영역 | 선택 | 이유 |
|---|---|---|
| Java | 21 (LTS) | Spring Boot 4.1 지원 범위(17~26) 안에서 도구 호환이 가장 안정적 |
| Spring Boot | 4.1.2 | 현재 무료 지원 중인 최신 안정 라인 (4.0 은 2026-12 지원 종료) |
| Gradle | 8.14.3 (wrapper 포함) | Spring Boot 4.1 요구사항(8.14 이상) 충족, 별도 설치 불필요 |
| Python | 3.13 | ML/DL 라이브러리 호환이 가장 넓음 |
| FastAPI | 0.162.x | 최신 안정 |
| Node.js | 24 LTS (22.22 이상이면 동작) | React Router 8 요구사항 충족 |
| React | 19.3 | 최신 안정 |
| Vite | 8.3 + @vitejs/plugin-react 6 | 최신 안정 |
| TypeScript | 6.0 | Vite React 템플릿 기본값 |

## 폴더

```
backend/     Spring Boot  (com.pickme)
ai-server/   FastAPI      (app/)
frontend/    React + Vite (src/)
.vscode/     팀 공용 VS Code 설정 (추천 확장, 실행 구성)
```

## 처음 한 번 설치

사전 설치: JDK 21, Python 3.13, Node.js 24

```bash
# 1) Spring Boot
cd backend
./gradlew build          # Windows: gradlew.bat build

# 2) FastAPI
cd ../ai-server
python -m venv .venv
# Windows: .venv\Scripts\activate   /  macOS·Linux: source .venv/bin/activate
pip install -r requirements-dev.txt
cp .env.example .env     # GEMINI_API_KEY 입력

# 3) React
cd ../frontend
npm install
```

## 실행

VS Code: 실행 및 디버그(Ctrl+Shift+D) → **전체 실행 (Spring + FastAPI + React)**

터미널로 따로 실행할 때:

```bash
cd backend   && ./gradlew bootRun
cd ai-server && uvicorn app.main:app --reload --port 8000
cd frontend  && npm run dev
```

http://localhost:5173 에서 세 서버 상태가 모두 `ok` 로 보이면 연결 완료입니다.
FastAPI 문서: http://localhost:8000/docs

## DB

- 기본(`local` 프로필): H2 파일 DB. 설치 없이 실행됩니다.
- PostgreSQL: `SPRING_PROFILES_ACTIVE=prod` 와 `backend/.env.example` 의 값을 환경변수로 지정.
  `prod` 는 `ddl-auto: validate` 라서 테이블을 자동으로 바꾸지 않습니다.

## Flask 코드 옮길 때 주의

- 기존 테이블명 `user` 는 PostgreSQL/H2 예약어입니다. JPA 엔티티에서 `@Table(name = "\"user\"")` 로 지정하거나 `users` 로 변경하세요.
- 기존 비밀번호는 Werkzeug 해시라서 Spring 의 BCrypt 와 형식이 다릅니다. 기존 회원 데이터를 유지하려면 별도 처리가 필요합니다.
- `services/chat_service.py`, `services/decision_service.py` 의 Gemini 호출부 → `ai-server/app/services/`
- 그 외 routes/services → `backend/src/main/java/com/pickme/<기능>/`
- templates/static → `frontend/src/pages/`
