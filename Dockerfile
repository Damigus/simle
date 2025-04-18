# syntax=docker/dockerfile:1

FROM python:3.12-slim-bookworm

WORKDIR /simle-docker

COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD [ "python", "-m" , "flask", "run", "--host=0.0.0.0"]
