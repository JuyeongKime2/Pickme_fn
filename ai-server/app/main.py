"""PickMe AI 서버 (LLM / 머신러닝 / 딥러닝 전용).

React 는 이 서버를 직접 호출하지 않습니다. Spring Boot 만 호출합니다.
  React(5173) -> Spring Boot(8080) -> FastAPI(8000)

기존 Flask 의 services/chat_service.py, decision_service.py (Gemini 호출부)를
app/services/ 로 옮기고, app/routers/ 에 엔드포인트를 추가하세요.
"""

from fastapi import FastAPI

from app.routers import health

app = FastAPI(title="PickMe AI Server", version="0.1.0")

app.include_router(health.router)
