1) Wstęp

Serwis PrzejedźSię jest serwisem umożliwiającym użytkownikom zakup biletów zarówno krótkoterminowych, jak i okresowych na komunikacje miejską. Serwis zawiera również szereg innych
funkcjonalności między innymi Panel Administratora z poziomu którego administrator może dostosowywać aktualną ofertę do tej przedstawionej przez MPK.

Twórcy:
-Dawid Dobrowolski
-Jakub Pawlicki
-Aleksandra Jaroszek
-Jakub Dziarkowski
-Agnieszka Felis

Projekt ten nie jest projektem komercyjnym, wszelkie użyte w nim zasoby dodatkowe są użyte wobec darmowej licencji.

2) Wymagane oprogramowanie | Instrukcja

Aby uruchomić serwis należy upewnić się, że na lokalnej maszynie posiadamy poniższe oprogramowanie, w przeciwnym wypadku należy je zainstalować z poniższych linków:
Node.js – https://nodejs.org/en/download/
MySQLServer - https://dev.mysql.com/downloads/installer/ 

Oprogramowanie jest to w pełni darmowe do zastosowań prywatnych, niekomercyjnych.

Aby uruchomić lokalnie serwis, należy w pierwszej kolejności:
Rozpakować w wybranym folderze paczkę zawierającą wszystkie pliki projektowe
Upewnić się, że na lokalnej maszynie posiadamy uruchomiony serwer MySQL
Stworzyć pustą bazę danych o dowolnej nazwie 
```
CREATE DATABASE ‘db_name’;
```
W wybranym folderze, w którym wpakowaliśmy projekt, odnaleźć plik “.env”, otworzyć w dowolnym edytorze tekstu, plik ten posiada zmienne środowiskowe, niezbędne do 
personalnego ustalenia zgodnie z danymi autoryzacji użytkownika serwera MySQL, wpisać tam poprawną nazwę utworzonej bazy danych oraz dane autoryzacji, zapisać zmiany i zamknąć plik.
Następnie kliknąć prawym przyciskiem myszy i wybrać “Otwórz w terminalu”, w terminalu wpisać poniższą komendę aby pobrać wszystkie niezbędne moduły
```
npm install
```
Po pobraniu wszystkich modułów, możemy uruchomić serwer poniższą komendą:
```
npm start
```

Serwer natywnie nasłuchuje na porcie 3000, w dowolnej przeglądarce wpisujemy poniższy adres URL:
http://localhost:3000/

3) Instrukcja testowania
Wraz z uruchomieniem projektu, baza danych jest pusta, podczas tworzenia bazy w MySQL można skorzystać z gotowych danych przygotowanych dla testowania.
Aby wgrać dane należy odpakować plik bd.zip i wgrać dane do bazy.

Domyślnie, wraz z uruchomieniem serwisu, dostępne jest konto administratora, aby wejść w Panel Administratora należy zalogować się poniższymi danymi:
Login:	admin
Hasło:	admin

Aby dodać nowego użytkownika, należy skorzystać z formularza rejestracji.

