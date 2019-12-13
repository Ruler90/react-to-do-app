
# Struktura state (kopia zapasowa)

state = {
    lists: [
      {listId: 1, listName: '2019-12-02 (pon)', listClasses: ['ToDoList__nameBar'], isListDragged: false, isListDraggedOver: false, tasks: [
        { taskId: 132352, taskContent: 'jakieś zadanie', taskClasses: ['taskItem'], isTaskDragged: false, isTaskDraggedOver: false },
        { taskId: 256573, taskContent: 'kolejne zadanie', taskClasses: ['taskItem'], isTaskDragged: false, isTaskDraggedOver: false },
        { taskId: 323278, taskContent: 'jeszcze jedno zadanie', taskClasses: ['taskItem'], isTaskDragged: false, isTaskDraggedOver: false }
      ]},
      {listId: 2, listName: '2019-12-03 (wt)', listClasses: ['ToDoList__nameBar'], isListDragged: false, isListDraggedOver: false, tasks: [
        { taskId: 178992, taskContent: 'inne zadanie', taskClasses: ['taskItem'], isTaskDragged: false, isTaskDraggedOver: false },
        { taskId: 257321, taskContent: 'następne zadanie', taskClasses: ['taskItem'], isTaskDragged: false, isTaskDraggedOver: false },
        { taskId: 309345, taskContent: 'inne trzecie zadanie', taskClasses: ['taskItem'], isTaskDragged: false, isTaskDraggedOver: false }
      ]}
    ]
  }

###############################

# To Do:

- Dodać zapisywanie do LS po każdej zakończonej zmianie: przy drop, po dodaniu listy, po edycji nazwy listy, po usunięciu listy, po dodaniu zadania, po edycji treści zadania, po ustawieniu statusu zadania (prio i IP), po usunięciu zadania, przy drop zadania oraz listy

- Może na czas edycji nazwy listy lub treści zadania usuwać z elementu draggable="true" i przywracać po zakończeniu edycji? Dzięki temu powinna być możliwość zaznaczania tekstu.

- Można pomyśleć nad nadawaniem listom klasy z opacity przy dragOver i usuwaniu jej przy dragEnd, dragLeave i drop. Dodatkowe ograniczenie - sprawdzenie, że jakakolwiek lista na isListDragged=true. Tylko czy warto jeszcze z tym kombinować? Listy przenosi się łatwo, a to dodatkowe generowanie dużej ilości eventów.

- Może niech dla dużych ekranów mainControls ma position: sticky/fixed przy lewej krawędzi okna (o ile nie będzie to wyglądało dziwnie).

- Pamiętać o Firefoxie (szczególnie DnD - dataTransfer?) - działa bez tego

- DRY - wrzucić w oddzielne fn powtarzające się fragmenty kodu, np. czyszczenie true i czyszczenie klasy z opacity 0.6 przy dragEnd i drop

- Sprawdzać kod, czy parametry true/false zmieniają się prawidłowo - można sprawdzać też w pliku zapisu po pewnej ilości wykonanych akcji, czy wszędzie jest false (nie powinno być nigdzie true przy zapisywaniu). Jednocześnie wszystko jest tak oparte na tych parametrach, że gdyby coś było źle, to byłoby widać, że nie wszystko działa prawidłowo (np. przenoszenie zadań).

- Rozbudowa - dodanie jeszcze jednego buttona dodawania zadań - niech pierwszy dodaje zadanie na górze, a drugi na dole listy (oznaczenia to + ze strzałką w górę i + ze strzałką w dół - może być konieczna zmiana stylowania, chyba, że znajdę po jednym symbolu - jakiś plus ze strzałkami?). Jeden push do arraya, a drugi unshift?

- D'n'D in React:
https://dev.to/roggc/how-to-make-drag-and-drop-in-react-4dje

- Żeby nie gryzło się z dragScrollem - może będzie konieczne dodanie kolejnego parametru w state lub w fn dragScroll dać if sprawdzające, czy żaden task ani lista nie ma dragged ustawionego na true.


###############################

# Changelog

Pozostałe funkcje (po 0.0.5 do wersji za każdą):
- saveToLS
- dragScroll

++++++++++++++++++++++++

## v.0.9.5 - 13.12.2019

1. Dodano fn dragScroll - bez dodatkowych modyfikacji została po prostu przeniesiona z nie-reactowej apki i importowana w index.js. Dodatkowo w App.js importowano obiekt click oraz podłączono go w dragStart dla tasków i list, żeby po zakończeniu drag'n'drop nie było możliwe poziome scrollowanie bez trzymania przycisku myszy.

++++++++++++++++++++++++

## v0.9.0 - 10.12.2019, 11.12.2019, 12.12.2019

1. Fn dragAndDrop dla Tasks i Lists:
  - Taski posiadają w state: isTaskDragged oraz isTaskDraggedOver (oba domyślnie false).
  - Listy posiadając w state: isListDragged oraz isListDraggedOver (oba domyślnie false).
  - Przy konkretnych eventach odpowiednie elementy otrzymują true przy powyższych, czyli np. przenoszone zadanie ma isTaskDragged=true, zadanie, nad którym je trzymamy ma isTaskDraggedOver=true, a lista, na której jest to zadanie ma isListDraggedOver=true.
  - Przy onDrop zbierane są informacje o elementach (która lista, który index, jaki dokładnie element) i zapisywane do zmiennych. Potem po spełnieniu warunków z określonych if statements jest wykonywana metoda splice, która wycina przenoszony element z jednego miejsca i wstawia w drugim modyfikując wszystko w state. Jednocześnie wszystkie parametry isDragged i isDraggedOver są ustawiane na false.
  - Ostatecznie ustawiam jedną fn dropHandler, która jest połączeniem tej dla tasków i tej dla list. Dalej zbierane są informacje o stanach obiektów do zmiennych i potem na podstawie odpowiednich if statements wybierane jest odpowiednie działanie: przeniesienie taska na miejsce innego taska lub dodanie taska na końcu listy jeśli drop był na liście, a nie tasku. Jeśli będą się przenosiły po 2 zadania naraz, to if statements mają złe wykluczenia.
  - Można też zamieniać miejscami list - nie ma znaczenia, czy lista zostanie przeniesiona na inną listę czy na task na innej liście.
  - Jeśli task lub lista zostaną upuszczone poza obszarem jakiejkolwiek listy, to nic się nie wydarzy.

2. Zmieniłem wysokość listy ze 180px na 50px - jeśli nie ma tam zadań, to zostaje sam pasek z nazwą i buttonami dodawania/usuwania. Wygląda to lepiej niż puste pole. Dopasowałem też wysokość mainContainer i ToDoList__container do ekranu.

++++++++++++++++++++++++

## v0.8.0 - 09.12.2019

1. Poprawiono fn addList, która nie zawierała dodanego ostatnio elementu odpowiadającego za klasy przypisane do listy. Bez tego apka wywalała się przy dodawaniu nowego zadania.

2. Na bazie przygotowanych wcześniej fn dodano dwie nowe: prioTask oraz taskInProgress - sprawdzają one, czy task, przy którym został kliknięty button ma w state taskClasses: prioTask / taskInProgress i jeśli nie ma, to dodają, a jeśli ma, to usuwają.

3. Dodano fn addTask, która dodaje nowe zadanie na konkretnej liście i od razu ustawia focus na inpucie, żeby można było wpisać treść zadania.

4. Dodano fn deleteTask, która - jak nazwa wskazuje - usuwa konkretne zadanie.

5. Dodano fn saveToFile, która zapisuje state apki do pliku JSON.

6. Dodano fn loadFromFile, która pobiera dane z pliku JSON i przekazuje je do state.lists. Stamtąd apka pobiera dane i renderuje listę zadań.

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