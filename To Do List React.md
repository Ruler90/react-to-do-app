To Do:




###################################################

1. Przepisanie kodu To Do App w React:

- stworzyć class dla poszczególnych elementów, np. zadań, buttonów, dni itp.
- każda z tych klas miałaby obsługę swoich eventów + tak jak teraz np. closest lub parent element (może parent component o konkretnej klasie?) i może wtedy nie byłoby konieczne odpalanie tych wszystkich eventListenerów, jeśli rzeczywiście eventy byłyby przypisane wewnątrz klasy

= = = = = = = = = = =

2. Dodawanie nowych elementów:
- każdy element jest oddzielnym komponentem: listy(dni) i zadania
	- apka renderuje listy/dni
	- w listach renderowane są zadania
	- buttony jako oddzielne komponenty? I każdy zmienia state zadania (prio i inProgr) albo je usuwa z arraya
	- zadania są renderowane na podstawie state z apki - conditional z klasami CSS?
	- Może najpierw rozrysować i połączyć, co się z czego bierze?
- tylko główny ekran pozostaje zdefiniowany w pliku HTML
- menu z buttonami jest oddzielną klasą
- buttony dodawania dni i zadań mają zdefiniowaną fn zawierającą klasy z dniem / zadaniem

= = = = = = = = = = =

3. Zostawić tylko ogólną listę dla danego dnia, bez podziału na najważniejsze i zadania.

Listy i zadania oparte byłby na obiektach i arrayach i mogłyby mieć strukturę:

state = {
    lists: [
      {listId: 1, listName: '02.12.2019 (pon)', tasks: [
        { taskId: 1, taksContent: 'jakieś zadanie', isPrio: true, isInProgress: false },
        { taskId: 2, taksContent: 'kolejne zadanie', isPrio: false, isInProgress: false },
        { taskId: 3, taksContent: 'jeszcze jedno zadanie', isPrio: false, isInProgress: false }
      ]}
    ]
  }

Żeby wyciągnąć z tego dane trzeba będzie użyć destrukturyzacji (może podwójnej, żeby rozbić listy i jeszcze zadania w środku).
Co nieco info:
https://medium.com/@lcriswell/destructuring-props-in-react-b1c295005ce0
oraz "Nested destructuring"

- - - -

4. Działa zapisywanie i wczytywanie z LS. 

Musiałem dodać skrypt w index.html nad skryptem z Reactem, żeby sprawdzał za każdym razem, czy lista zadań istnieje w LS, a jeśli nie, to żeby tworzył nową pustą listy. W innym przypadku apka się wywala, bo nie widzi żadnego pliku, z którego zaczytuje state.
Może są jakieś eventy odpalające funkcję/prop przed renderem?

State todos jest ustawione na obiekt przechowywany w LS, który trzyma string ze wszystkimi danymi. Jednocześnie dodawanie nowego zadania uaktualnia string. To samo jest przy usuwaniu zadania.
W mojej apce trzeba by było dodać update przy każdej akcji - przesunięciu zadania, dodaniu/usunięciu/przesunięciu listy

export default class App extends Component{
  state = {
    todos: JSON.parse(localStorage.myTasksLists)
  }

addTodo = (todo) => {
    todo.id = new Date().getTime();
    let newTodoList = [...this.state.todos, todo];
    this.setState({
      todos: newTodoList
    });
    localStorage.setItem('myTasksLists', (JSON.stringify(newTodoList)));
  }

- - - -

5. Gdybym miał zmieniać sposób zapisu i wczytywania listy, to:
- każdy dzień i każde zadanie musiałoby mieć np. id/position lub jakąś podobną informację, która byłaby przypisywana na podstawie miejsca, w którym się znajduje (np. czy jest to pierwszy czy piąty dzień na liście / czy jest to drugie czy 10 zadanie w danym dniu) - żeby po wczytaniu mieć wszystko dokładnie tak jak to zostawiliśmy. Przy tworzeniu elementu i drag'n'drop mogłaby być np. pętla na parencie sprawdzająca ile jest elementów i przypisująca odpowiedni id - przy tworzeniu ostatni, a przy przenoszeniu sprawdzenie, którym elementem jest 'this' (jednocześnie musiałyby zostać przeliczone id wszystkich pozostałych elementów w parencie). Nazewnictwo mogłoby być x-x, np. 1-1 - pierwszy dzień na liście i pierwsze zadanie na nim