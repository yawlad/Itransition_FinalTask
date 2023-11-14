FROM python:3.10

RUN pip install pipenv
RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /backend

RUN pip install --upgrade pip
COPY ./ ./
RUN pip install -r requirements.txt
RUN chmod +x /backend/entrypoint.sh
RUN sed -i 's/\r$//' "/backend/entrypoint.sh"

ENTRYPOINT ["sh", "/backend/entrypoint.sh"]