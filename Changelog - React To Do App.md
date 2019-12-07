# To Do:

- Jako pierwsze sprawdzenie dodawania list - dodałem div mainContainer jak w poprzedniej apce, ale teraz ma ID, a nie klasę, więc pamiętać o tym. Kolejne kroki:
    - najpierw dodajemy komponenty, żeby zobaczyć, że listy i zadania generują się na podstawie statycznego state, a dopiero potem dołączę funkcje, które będą wpływały na state, bo będzie pewność, że to dobrze działa;
    - dodanie komponentu z taskami i importowanie go do App i ToDoListst;
    - nested destructuring - jak dostać się do danych na temat tasks?
        - Można by było zrobić pętlę po list.tasks.length (lub for of) i jednocześnie użyć array.map jak przy generowaniu całych list -> 

        lists.map(list => {
            for (let item of list.tasks) {
                tutaj będzie renderowanie, a działa np. z console.log(item.taskContent) itp;
            }

    - dodanie funkcji dodawania dni do App.js i przekazanie jej jako prop do MainControls i tam dodanie onClick odpowiedniemu buttonowi
    - dodanie pierwszej wersji state, gdzie do arraya będą dodawane nowe listy i na tej podstawie będą renderowane nowe dni

- Nadanie edytowalności spanom - muszą dodatkowo zmieniać dane w arrayu z zadaniami przy kończeniu edycji

- Conditional render - dla prio i InProgress

- Czy uda się przygotować wersję state, w której array będzie zależny od drag'n'drop? Zmiana pozycji itemu w arrayu, może nadanie isDragged="true" konkretnemu obiektowi podczas d'n'd

- D'n'D in React:
https://dev.to/roggc/how-to-make-drag-and-drop-in-react-4dje


###############################

# Changelog

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