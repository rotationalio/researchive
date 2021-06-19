FROM python:3.9

WORKDIR /app
COPY requirements.txt .

RUN pip install -r requirements.txt

COPY img2aspect.py .

VOLUME [ "/data" ]

ENTRYPOINT [ "/app/img2aspect.py" ]