
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

# Pomysły na przyszłość / uwagi:

- Nadawanie listom klasy z opacity przy dragOver i usuwaniu jej przy dragEnd, dragLeave i drop. Dodatkowe ograniczenie - sprawdzenie, że jakakolwiek lista na isListDragged=true. Tylko czy warto z tym kombinować? Przy przenoszeniu list trudno o pomyłkę, a zabawa z klasami to dodatkowe generowanie dużej ilości eventów.

- Na średnich ekranach listy układają się w dwie kolumny. Wygląda to średnio, jeśli jedna lista ma np. 2 zadania, a druga 10 -> jest wtedy sporo pustej przestrzeni. Dla średnich ekranów można dodać określoną max-height dla list i dodać im overflow, żeby pojawiał się scroll w razie potrzeby, tak jak pojawia się na dużych ekranach. Zmienić wtedy też stylowanie scrolla, bo teraz jest tylko w MQ dla dużych ekranów. Na razie nie zmieniam tego, bo nigdy nie korzystałem z listy na średnim ekranie.

- Domyślnie nazwy list są krótkie (daty i dni), ale można wpisać dowolną liczbę znaków. Buttony mają position: absolute i jeśli zostanie wpisana długa nazwa, to może schować się pod buttonami. Można nadać taką width spanowi, żeby była widoczna cała nazwa. Ewentualnie można użyć innego pozycjonowania - span pośrodku, buttony dodawania po lewej, a button usuwania po prawej.

###############################

# Refactor

- rozdzielenie ogólnego state od state dla d'n'd? Może jak w starej wersji nie obiekt z true/false tylko data-attributes dodawane na czas przenoszenia? Przy tymczasowych data attributes trzeba by było zmienić szukanie z id listy czy taska na szukanie, który element ma dany atrybut. Przy eventach może być konieczność użycia e.target.closest i wskazać klasę elementu, który ma dostać data-attribute lub ma on zostać usunięty. Tylko dodanie data-attribute chyba zmienia DOM, więc wiązałoby się to prawdopodobnie z dodatkowymi re-renderami.
Albo może usunąć całkowicie isElDragged i isElDraggedOver ze state i dodawać je tylko przy konkretnych eventach?

- takie rozbicie Tasks i Lists na komponenty, żeby w React Dev Tools były widoczne listy na wzór zadań.

- zmiana auto-save z pojedynczych funkcji -> useEffect zależne od zmian w myTaskLists + usunięcie localStorage.setItem. Pamiętać, że niektóre eventy d'n'd mają ustawione setMyTasks, więc wtedy mogą sie zapisywać do LS także true nadane w isElDragged i isElDraggedOver.

- textarea zamiast inputa?

- przetestować:
  - czy na pewno działają wszystkie fn
  - czy poprawnie zmienia się state
  - czy odpowiednie zmiany zapisują się do LS
  - czy otrzymuje się poprawny plik zapisu
  - czy można wczytać ten plik bez problemu

# Chrome Extension

- zbundlowanie kodu z odpowiednim configiem Webpacka i Babela i wrzucenie do Chrome Store

###############################

# Changelog

++++++++++++++++++++++++

### v1.1.1 - 29.02.2020

1. Zmiana struktury i plików projektu:
- utworzenie w katalogu components folderów na poszczególne komponenty: lists, main-controls, other-features (dragScroll), tasks
- umieszczenie w tych katalogach plików js i jsx oraz folderu scss ze stylami wymaganymi przez dany komponent
- zmiana nazwy _placeholder-classes.scss na _scrollbar-styles.scss 
- poprawienie ścieżek importów po zmianie struktury
- połączenie plików spanEdit z głównymi plikami stylów dla list i tasks - osobne nazwy dla obu elementów

2. Wrzucenie komponentu MainControls w tagi nav w pliku App.jsx

3. Zmiana klasy głównego containera z mainContainer na lists__container.

4. Zmiana w taskach inputa na textarea do wprowadzania/edycji treści zadania.

++++++++++++++++++++++++

### v1.1.0 - 24.02.2020, 26.02.2020, 27.02.2020, 28.02.2020, 29.02.2020

Refactor kodu:

1. W komponencie ToDoLists.jsx przeniesiono generowanie tasków bezpośrednio do diva ToDoList__tasks zamiast generowania całej grupy elementów nad listą i przekazywania całej grupy później do tego diva.

2. Ponowne dodanie fn odpowiedzialnych za drag'n'drop list i tasków:
- listDragStartHandler
- listDragEndHandler - ta fn zmienia wszystkie isDragged i isDraggedOver z true na false
- listDragOverHandler
- listDragLeaveHandler
- listDropHandler
- taskDragStartHandler
- taskDragEndHandler - identyczna jak listDragEndHandler
- taskDragOverHandler
- taskDragLeaveHandler
- taskDropHandler

Jeśli gdzieś były pętle, to zmieniono na array.map, array.finIndex etc.
W poprzedniej wersji d'n'd dla tasków i list było połączone. Teraz będzie oddzielne dla obu elementów.

W fn listDropHandler dodano także if statement odpowiedzialny za dodanie taska na końcu listy, jeśli zostanie przeciągnięty na listę, a nie na konkretny task na niej.

W fn taskDragLeaveHandler dodano setTimeout do czyszczenia klasy .draggedOverItem, ponieważ wydaje się to być jedynym działającym poprawnie rozwiązaniem. Przy wielu innych testowanych rozwiązaniach ten event albo czyścił od razu klasę, przez co nie było widać efektu nadawanego przez taskDragOverHandler albo przy szybkim hoverze kilka elementów naraz zmieniało kolor.

3. W ToDoLists.jsx oraz Tasks.jsx dodano myTaskLists oraz setMyTaskLists do handlerów d'n'd, żeby można było przenieść wszystkie handlery do oddzielnych plików.

++++++++++++++++++++++++

### v1.0.9 - 23.02.2020

Refactor kodu:

1. Zmiana pętli na szukanie bezpośrednio w arrayu po id elementu dla fn:
- deleteTask
- taskContentShowInput
- taskContentEdit

2. Zmiana szukania po całym elemencie na szukanie po id elementu dla fn:
- addTaskFirst
- addTaskLast
- listNameShowInput
- listNameEdit

3. Podzielenie ListsAndTasks.jsx na oddzielne komponenty ToDoLists.jsx oraz Tasks.jsx i import do nich odpowiednich plików ze stylami.

++++++++++++++++++++++++

### v1.0.8 - 20.02.2020, 21.02.2020

0. Poprzednia wersja była z 02.01.2020, a nie 2019, jak błędnie podano.

Refactor kodu:

1. Przygotowanie nowych komponentów .jsx z logiką ze poprzednich komponentów .js.

2. Zmiana eol z CRLF na LF.

3. Zmiana komponentów klasowych na funkcyjne.

4. Dodanie contextu do obsługi state.

5. Plik App.jsx teraz zawiera praktycznie samą strukturę apki, a pozostałe elementy i funkcje są w plikach MainControls.jsx oraz ListsAndTasks.jsx. Później te pliki też będą dzielone na mniejsze komponenty z przypisanymi im stylami.

5. Poprawiono kod dla prioTask i taskInProgress - zamiast pętli for of jest połączona metoda find oraz some, w których jest wykorzystawne id taska otrzymywane przez fn jako argument. Najpierw jest szukana lista zawierająca task o konkretnym id, potem jest wyszukiwany w niej ten konkretny task, a następnie są modyfikowane jego klasy.

6. Zmiana pytania przy usuwaniu listy z "Remove entire day?" na "Remove this list?".

7. Ustawiono w Webpacku index.jsx jako entry point i webpack dev server działa obecnie już na nowych plikach. Przy tym commicie apka wydaje się działać dokładnie tak jak poprzednia wersja, ale jest pozbawiona kodu odpowiedzialnego za drag and drop - będzie dodany ponownie później.

++++++++++++++++++++++++

### v1.0.7 - 02.01.2020

1. Zmiana styli:
- Widok z poziomym scrollem mają teraz też ekrany 10 cali.
- Przez większość czasu apka jest używana na ekranie 13 i 15 cali z rozdzielczością 1920x1080 oraz zoomem 90%. Dlatego zmniejszono większość elementów o około 10%, żeby mieć taki widok z domyślnym wyświetlaniem 100%.

2. Zmiana języka na angielski (dni tygodnia, pytanie o usunięcie całego dnia).

3. Zmiana nazwy buttona z 'Load from file' na 'Load file'.

++++++++++++++++++++++++

### v1.0.6 - 20.12.2019

Dodano overflow-x: hidden dla taskItem - jeśli będzie bardzo długie słowo w nazwie zadania (lub link itp), to nie będzie pojawiał się poziomy scroll.

++++++++++++++++++++++++

### v1.0.5 - 19.12.2019

1. Użyto spread operatora z props w ToDoListsFull.js zamiast wypisywania wszystkich props pojedynczo. Dodano też 'props.' do wszystkich fn w tym pliku.

2. Opisano apkę w pliku readme.

++++++++++++++++++++++++

### v1.0.4 - 17.12.2019

1. Poprawiono stylowanie dla mobile - między pustymi listami nie ma już pustej przestrzeni.

2. Dla dużych ekranów dodano position: sticky dla MainControls - teraz przy poziomym scrollu będzie zawsze widać ten element.

3. Żeby drag and drop działał też w mobilnych przeglądarkach, dla list i tasków dodano do dragStartHandlerów kolejno: 
event.dataTransfer.setData('text', listId);
event.dataTransfer.setData('text', taskId);

4. Dla zaoszczędzenia kilku linii kodu utworzono klasę NewTask w pliku ToDoListsFull.js oraz importowano ją w pliku App.js. Klasa jest wykorzystywana przy tworzeniu nowych zadań z domyślnymi wartościami. Wcześniej była to część fn AddTask, ale po dodaniu drugiego buttona, było to pisanie dwa razy tego samego fragmentu kodu. Utworzenie klasy było konieczne, ponieważ po wrzuceniu samego NewTask do App.js data była pobierana w momencie renderowania apki i potem wyrzucało błędy, że są tworzone zadania o takich samych keys (keys są pobierane z taskId, które jest właśnie datą w milisekundach).

++++++++++++++++++++++++

### v1.0.3 - 17.12.2019

Dodanie drugiego buttona odpowiadającego za dodawanie zadań do listy:
- Teraz jest jeden dodający zadanie na początku listy (addTaskFirst) oraz drugi - dodający zadanie na końcu (addTaskLast).
- Dla obu buttonów zostały dodane nowe klasy css z pozycjonowaniem.
- Buttony jako value mają ustawione znaki: &#x02A72; oraz &#x2A71; - każdy z nich jest traktowany jako 1 znak, dzięki czemu nie były wymagane żadne dodatkowe zmiany wyglądu buttonów. Jednocześnie są to najbardziej pasujące znaki, jakie znalazłem, które mogłyby wizualizować dodawanie zadania na górze i na dole.

++++++++++++++++++++++++

### v1.0.2 - 14.12.2019

1. Dodanie możliwości zaznaczania tekstu myszką w zadaniach i nazwach list:
- Przy rozpoczęciu edycji tekstu zadania usuwane jest draggable=true z zadania oraz listy, w której się ono znajduje.
- Po zakończeniu edycji przywracany jest ten atrybut w obu miejscach.
- Przy rozpoczęciu edycji nazwy listy usuwane jest draggable=true z konkretnej listy.
- Po zakończeniu edycji przywracany jest ten atrybut w konkretnej liście.
- Dodatkowo w fn dragScroll dodano if statement ograniczający odpalanie mousedown event do kliknięcia na main oraz .mainContainer. Teraz nie da się używać dragScrolla na listach i zadaniach i jednocześnie nie jest przesuwany ekran przy zaznaczaniu tekstu.

2. Poprawa styli dla ToDoList__container:
- dodano overflow: hidden, bo przy mniejszej wysokości ekranu zadania wychodziły poza border-bottom containera.

++++++++++++++++++++++++

### v1.0.1 - 14.12.2019

1. Poprawa stylowania:
- Przeniesiono overflow i style scrollbara z ToDoList__container do ToDoList__tasks. Dzięki temu scrollują się tylko zadania, a belka z nazwą listy zostaje na swoim miejscu.
- Dodano 2px paddingu po prawej, żeby przy hover na zadaniu nie nachodziło ono na scrollbar.
- Dodano 2px paddingu na dole, ponieważ jeśli była mniejsza ilość zadań na liście, to przy hover na ostatnim zadaniu pojawiał się scrollbar.
- Dodano plik _placeholder-classes.scss, w którym jest stylowanie dla scrollbara. Użyto @extend %scrollbarStyles w trzech miejscach - dla zadań, dla main oraz dodano jeszcze dla body, żeby ostylowany scrollbar pojawiał się też na średnich i mniejszych ekranach.

2. Dodano screeny dla dużych, średnich i małych ekranów.

++++++++++++++++++++++++

### v1.0.0 - 13.12.2019

Fn saveToLS - zapisywanie i pobieranie state z Local Storage:
- W index.js dodany skrypt przez renderem Reacta, który sprawdza, czy w LS istnieje element myReactTasks. Jeśli nie, to tworzy pusty element. Gdyby nie było żadnego, to apka w ogóle się nie wyrenderuje (nawet MainControls).
- Funkcje apki, które zmieniają state w istotny sposób dostały
localStorage.setItem('myReactTasks', (JSON.stringify(newListsArray)));
Zapis do LS następuje po dodaniu listy, po edycji nazwy listy, po usunięciu listy, po dodaniu zadania, po edycji treści zadania, po ustawieniu statusu zadania (prio i IP), po usunięciu zadania, przy drop zadania oraz listy.
- Nie dodawano tego przy drag eventach, ponieważ dla usera najistotniejszy jest drop, który zmieni pozycję listy lub zadania, a nie sam fakt, że element jest w trakcie przenoszenia. 
- Tak jak poprzednio nie dodano saveToLS dla akcji wczytania listy z pliku - na wszelki wypadek, gdyby plik był błędny. Po wczytaniu pliku trzeba wykonać jakąś akcję, która wiąże się z zapisem do LS.

++++++++++++++++++++++++

### v.0.9.5 - 13.12.2019

Dodano fn dragScroll - bez dodatkowych modyfikacji została po prostu przeniesiona z nie-reactowej apki i importowana w index.js. Dodatkowo w App.js importowano obiekt click oraz podłączono go w dragStart dla tasków i list, żeby po zakończeniu drag'n'drop nie było możliwe poziome scrollowanie bez trzymania przycisku myszy.

++++++++++++++++++++++++

### v0.9.0 - 10.12.2019, 11.12.2019, 12.12.2019

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

### v0.8.0 - 09.12.2019

1. Poprawiono fn addList, która nie zawierała dodanego ostatnio elementu odpowiadającego za klasy przypisane do listy. Bez tego apka wywalała się przy dodawaniu nowego zadania.

2. Na bazie przygotowanych wcześniej fn dodano dwie nowe: prioTask oraz taskInProgress - sprawdzają one, czy task, przy którym został kliknięty button ma w state taskClasses: prioTask / taskInProgress i jeśli nie ma, to dodają, a jeśli ma, to usuwają.

3. Dodano fn addTask, która dodaje nowe zadanie na konkretnej liście i od razu ustawia focus na inpucie, żeby można było wpisać treść zadania.

4. Dodano fn deleteTask, która - jak nazwa wskazuje - usuwa konkretne zadanie.

5. Dodano fn saveToFile, która zapisuje state apki do pliku JSON.

6. Dodano fn loadFromFile, która pobiera dane z pliku JSON i przekazuje je do state.lists. Stamtąd apka pobiera dane i renderuje listę zadań.

++++++++++++++++++++++++

### v0.5.0 - 08.12.2019

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

### v0.4.0 - 07.12.2019

1. Dodano warunkowe renderowanie w Tasks.js uwzględniające czy task isPrio oraz isInProgress - w zależności od statusów od razu nadawana jest odpowiednia klasa elementowi (zmieniająca jego kolor). Jest tu sporo powtarzania kodu, ale nie widzę na razie możliwości, żeby to skrócić, ponieważ jednocześnie będą nadawane odpowiednie funkcje buttonom, żeby działały na właściwy element.

2. Utworzono funkcję dodawania nowej listy w App.js i podpięto ją do odpowiedniego buttona w MainControls.js.

3. Utworzono funkcję usuwania dowolnej listy i podpięto ją do odpowiedniego buttona w MainControls.js.

++++++++++++++++++++++++

### v0.3.0 - 07.12.2019

1. Usunięto ternary operator z ToDoLists - jeśli state z listami zadań w App.js jest pusty, to po prostu nic się nie wyświetli. Nie ma potrzeby pokazywania np. dodatkowego napisu, że lista jest pusta.

2. Przeniesiono wszystkie style związane z Tasks.js z poprzedniej nie-Reactowej To Do App.

3. Utworzono komponent Tasks.js, który odpowiada za całą budowę TaskItem i eksportowano go do komponentu ToDoLists. Tam zostały mu przekazane tasks dla każdej listy ze state, który jest w App.js. Komponent Tasks.js zwraca html dla każdego zadania i zostaje on dodany do htmla każdej listy zadań. To wszystko jest renderowane przez App.js. 

++++++++++++++++++++++++

### v0.2.0 - 06.12.2019

1. Przeniesiono <div className="mainContainer"> z index.html do App.js oraz dodano tam tagi <main></main>.

2. Stworzenie komponentu ToDoLists, który zawiera kontener z listą zadań, belkę z nazwą, button dodawania nowego zadania do listy i button usunięcia całej listy. Zgodnie z wcześniejszym opisem - zmieniła się budowa kontenera. Jednocześnie zmieniły się też nazwy klas, które były wykorzystywane przy poprzedniej, nie-Reactowej To Do App:
    - day__Container -> ToDoList__container
    - mainTaskTypes__Container -> ToDoList__tasksContainer
    - day__dateBar -> ToDoList__nameBar

3. Przeniesiono potrzebne style wraz z Media Queries z poprzedniej apki do odpowiednich komponentów w obecnej.

4. Dodano pierwszą wersję state zawierającą przykładowe listy z ich id, nazwami oraz zadaniami.

5. Ustawienie komponentu ToDoLists, aby generował listy zadań na podstawie danych ze state z App.js.

++++++++++++++++++++++++

### v0.1.0 - 05.12.2019

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