Działa zapisywanie i wczytywanie z LS. 

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