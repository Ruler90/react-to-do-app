# To Do:

- żeby była pewność, że wszystko dobrze działa najpierw dodam komponenty, żeby zobaczyć, że listy i zadania generują się na podstawie statycznego state, a dopiero potem dołączę funkcje, które będą wpływały na state;

- dodanie funkcji dodawania dni do App.js i przekazanie jej jako prop do MainControls i tam dodanie onClick odpowiedniemu buttonowi

- Nadanie edytowalności spanom - muszą dodatkowo zmieniać dane w arrayu z zadaniami przy kończeniu edycji. Czy trzeba będzie dodać dwie różne funkcje? Jedną dla list i jedną dla zadań?
Będzie też inaczej niż w poprzedniej apce - tam nowy element od razu dostawał klasę spanEdit, która wyświetlała input i chowała span, żeby można było wprowadzić od razu nazwę zadania. Tutaj nie można tak zrobić, bo przy renderowaniu wszędzie mogłyby pojawić się inputy.

- Czy spanEdit.css importować i w ToDoLists.js i w Tasks.js czy dać do App.js?

- Conditional render - dla prio i InProgress

- Czy uda się przygotować wersję state, w której array będzie zależny od drag'n'drop? Zmiana pozycji itemu w arrayu, może nadanie isDragged="true" konkretnemu obiektowi podczas d'n'd

- D'n'D in React:
https://dev.to/roggc/how-to-make-drag-and-drop-in-react-4dje


###############################

# Changelog

++++++++++++++++++++++++

## v0.3.0 - 07.12.2019

1. Usunięto ternary operator z ToDoLists - jeśli state z listami zadań w App.js jest pusty, to po prostu nic się nie wyświetli. Nie ma potrzeby pokazywania np. dodatkowego napisu, że lista jest pusta.

2. Przeniesiono wszystkie style związane z Tasks.js z poprzedniej nie-Reactowej To Do App.

3. Utworzono komponent Tasks.js, który odpowiada za całą budowę TaskItem i eksportowano go do komponentu ToDoLists. Tam zostały mu przekazane tasks dla każdej listy ze state, który jest w App.js. Komponent Tasks.js zwraca html dla każdego zadania i zostaje on dodany do htmla każdej listy zadań. To wszystko jest renderowane przez App.js. 

++++++++++++++++++++++++

## v0.2.0 - 06.12.2019

1. Przeniesiono <div className="mainContainer"> z index.html do App.js oraz dodano tam tagi <main></main>.

2. Stworzenie komponentu ToDoLists, który zawiera kontener z listą zadań, belkę z nazwą, button dodawania nowego zadania do listy i button usunięcia całej listy. Zgodnie z wcześniejszym opisem - zmieniła się budowa kontenera. Jednocześnie zmieniły się też nazwy klas, które były wykorzystywane przy poprzedniej, nie-Reactowej To Do App:
    - day__Container -> ToDoList__container
    - mainTaskTypes__Container -> ToDoList__tasksContainer
    - day__dateBar -> ToDoList__nameBar

3. Przeniesiono potrzebne style wraz z Media Queries z poprzedniej apki do odpowiednich komponentów w obecnej.

4. Dodano pierwszą wersję state zawierającą przykładowe listy z ich id, nazwami oraz zadaniami.

5. Ustawienie komponentu ToDoLists, aby generował listy zadań na podstawie danych ze state z App.js.

++++++++++++++++++++++++

## v0.1.0 - 05.12.2019

1. Start pracy - rozrysowanie i planowanie zmian względem wersji bez Reacta
 - znika podział na kategorie zadań na liście - wcześniej były Najważniejsze oraz Zadania
 - znikają jednocześnie belki dla obu typów zadań
 - button dodawania nowego zadania zostanie przeniesiony do belki z datą/nazwą listy:
    - albo obok buttona kasującego listę
    - albo po lewej stronie daty/nazwy listy
    - trzeba będzie zmienić mechanikę jego działania, bo do tej pory łapał klasę taskType__Container i tam dodawał nowe zadanie

2. Stworzenie pierwszego komponentu - MainControls, przekopiowanie styli do niego, przerobienie ich na scss i importowanie wyjściowego pliku .css w komponencie.

3. Dodanie <div id="mainContainer"></div> do index.html.

4. Dodanie styli dla body i mainContainer w App.css.