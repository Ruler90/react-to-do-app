
# Struktura state (kopia zapasowa)

state = {
    lists: [
      {listId: 1, listName: '2019-12-02 (pon)', listClasses: ['ToDoList__nameBar'], tasks: [
        { taskId: 1, taskContent: 'jakieś zadanie', taskClasses: ['taskItem'], isDragged: false },
        { taskId: 2, taskContent: 'kolejne zadanie', taskClasses: ['taskItem'], isDragged: false },
        { taskId: 3, taskContent: 'jeszcze jedno zadanie', taskClasses: ['taskItem'], isDragged: false }
      ]},
      {listId: 2, listName: '2019-12-03 (wt)', listClasses: ['ToDoList__nameBar'], tasks: [
        { taskId: 1, taskContent: 'inne zadanie', taskClasses: ['taskItem'], isDragged: false },
        { taskId: 2, taskContent: 'następne zadanie', taskClasses: ['taskItem'], isDragged: false },
        { taskId: 3, taskContent: 'inne trzecie zadanie', taskClasses: ['taskItem'], isDragged: false }
      ]}
    ]
  }

###############################

# To Do:

- żeby była pewność, że wszystko dobrze działa najpierw dodam komponenty, żeby zobaczyć, że listy i zadania generują się na podstawie statycznego state, a dopiero potem dołączę funkcje, które będą wpływały na state;

- fn isPrio i isInProgress będą oparte na klasach. Dodawanie i usuwanie klas można przygotować na bazie fn z edycją treści zadań

- Pamiętać, żeby dodać zapisywanie do do LS po każdej zakończonej zmianie

- Czy uda się przygotować wersję state, w której array będzie zależny od drag'n'drop? Zmiana pozycji itemu w arrayu, może nadanie isDragged="true" konkretnemu obiektowi podczas d'n'd. Dodałem w state isDragged = true/false - może się to przełączać przy odpowiednich elementach, jeśli to w czymś pomoże. Może być też konieczne działanie na klasach, jak przy spanEdit.

- D'n'D in React:
https://dev.to/roggc/how-to-make-drag-and-drop-in-react-4dje


###############################

# Changelog

++++++++++++++++++++++++

## v0.5.0 - 08.12.2019

1. Funkcja spanEdit - jeśli ma być funkcją reactową, to nie da się jej po prostu przekopiować z poprzedniego projektu i wstawić dla onClick i onBlur przy spanach.
  - Podzielono ją na kilka fn (listNameShowInput oraz listNameEdit [tutaj jest też dodatkowy event onKeyPress dla 'enter'])
  - Dodano listClasses do state i stąd pobierane będą klasy dla danej listy.
  - ToDoList__nameBar jest zwykłą klasą nadawaną każdej liście.
  - W razie edycji nazwy będzie dodawana dodatkowa klasa spanEdit, która chowa span i pokazuje input. Po zakończeniu edycji będzie usuwana.

2. Podobnie zostało to przygotowane dla edycji tasks.
  - Konieczne było połączenie modułu ToDoLists.js oraz Tasks.js w jeden moduł ToDoListsFull.js. Nie znaleziono sposobu, żeby przekazywać odpowiednie wartości do modułu App.js z modułu Tasks.js, który był importowany do ToDoLists.js.
  - Tutaj też został dodany obiekt w state (taskClasses) i usunieto isPrio oraz isInProgress ze state.
  - Po połączeniu modułów konieczne było poprawienie fn dla eventów onBlur oraz onKeyPress, ponieważ enter dwukrotnie odpalał array.pop kasując obie klasy i zostawiając elementy bez stylowania. Ostatecznie powstało if statement sprawdzające, czy znajdzie klasę spanEdit w danym elemencie i jeśli tak, to określa jej index w arrayu z klasami, a potem kasuje ją za pomocą array.splice.
  - Zwracać uwagę, żeby wszystkie fn zmieniające state korzystały setState() - edycja treści zadań wymagała poprawy, ponieważ był stworzony nowy array dla state, ale wszystkie operacje były przeprowadzane na pierwotnym obiekcie.

++++++++++++++++++++++++

## v0.4.0 - 07.12.2019

1. Dodano warunkowe renderowanie w Tasks.js uwzględniające czy task isPrio oraz isInProgress - w zależności od statusów od razu nadawana jest odpowiednia klasa elementowi (zmieniająca jego kolor). Jest tu sporo powtarzania kodu, ale nie widzę na razie możliwości, żeby to skrócić, ponieważ jednocześnie będą nadawane odpowiednie funkcje buttonom, żeby działały na właściwy element.

2. Utworzono funkcję dodawania nowej listy w App.js i podpięto ją do odpowiedniego buttona w MainControls.js.

3. Utworzono funkcję usuwania dowolnej listy i podpięto ją do odpowiedniego buttona w MainControls.js.

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