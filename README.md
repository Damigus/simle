# simle
simply lovely </br>
flask --debug run


# Windows
`python -m venv .venv` - utworzenie wirtualnego środowiska

`.\.venv\Scripts\activate` - uruchomienie wirtualnego środowiska

## Po aktywacji wirtualnego środowiska

`pip install -r requirements.txt` - instalacja pakietów

`pip install nazwa-pakietu` - instalacja nowego pakietu

`pip freeze > requirements.txt` - aktualizacja zależności w pliku requirements.txt

`pip list` - wyświetlenie listy pobranych pakietów

`deactivate` - wyjście z wirtualnego środowiska

### Uruchomienie programu
`python main.py` lub `puthon3 main.py`

# DOCKER

`docker build --tag simle-docker .` - utworzenie dockera

`docker run --name simle-docker -d -p 5000:5000 simle-docker` - uruchomienie

`docker ps` - wyświetla działające

`docker stop <container-id/name>` - mówi samo za siebie

`docker rm -f simle-docker` - usuwanie po nazwie kontenera