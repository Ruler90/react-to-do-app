# To Do:

- Jako pierwsze sprawdzenie dodawania list - dodałem div mainContainer jak w poprzedniej apce, ale teraz ma ID, a nie klasę, więc pamiętać o tym. Kolejne kroki:
    - zwrócić uwagę, czy mainContainer jest w dobrym miejscu i czy na pewno będzie wykorzystany
    - komponent z budową nowego dnia
    - dodanie funkcji dodawania dni do App.js i przekazanie jej jako prop do MainControls i tam dodanie onClick odpowiedniemu buttonowi
    - dodanie pierwszej wersji state, gdzie do arraya będą dodawane nowe listy i na tej podstawie będą renderowane nowe dni

- Conditional render - dla prio i InProgress

- Czy uda się przygotować wersję state, w której array będzie zależny od drag'n'drop? Zmiana pozycji itemu w arrayu


###############################

# Changelog

v.0.1.0 - 05.12.2019

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