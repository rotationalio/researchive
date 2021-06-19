FROM python:3.9-buster

WORKDIR /usr/src/todos

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install requirements.txt - unfortunately, this means that if the dependencies
# change, the container will need to be reloaded.
COPY requirements.txt .
RUN pip install -r requirements.txt

ENV DATABASE_URL="postgresql://postgres:supersecret@host:5433/todos"

EXPOSE 8000
CMD ["uvicorn", "todos:app", "--host", "0.0.0.0", "--reload"]