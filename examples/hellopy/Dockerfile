FROM ubuntu:20.04

RUN apt-get -y update
RUN apt install -y python3

COPY ./hello.py /app/
CMD python3 /app/hello.py