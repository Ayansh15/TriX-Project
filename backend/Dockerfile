FROM python:3.12-slim
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends tesseract-ocr libtesseract-dev && rm -rf /var/lib/apt/lists/*
COPY backend/pyproject.toml ./pyproject.toml
RUN pip install --no-cache-dir .
COPY backend/app ./app
RUN mkdir -p /app/uploads
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
