# Table Of Things

Table of things - маленькая библиотека для работы с Drag & Drop. 

## Особенности

- Не используются нативные Drag & Drop события
- Поддержка touch-событий
- 0 зависимостей
- Хорошие показатели в плане производительности

## Установка

```
npm i tableofthings
```

## Использование

```html
<div id="table">
  <div id="thing-1"></div>
  <div id="thing-2"></div>
  <div id="thing-3"></div>
</div>
```

```js
import ToT from 'tableofthings';

let a = new ToT.Table({
  el: document.getElementById("table"),
  thingsAutoDetect: true
})
```

После этого все дочерние (на 1 уровень) узлы `#table` будут хвататься мышкой (или пальцем) и перетаскиваться.

Все, что касается стилей, Вы можете настроить сами.
Например, курсор-рука, которая сжимается в кулак при клике:

```css
#thing-1 {
  cursor: grab;
}
#thing-1:active {
  cursor: grabbing;
}
```

Однако, некоторый CSS библиотека настраивает сама. Например, контейнер автоматически станет `position: relative`, а дочерние узлы `position: absolute`.

## Более подробно

**Table**

Экземпляр `Table` создается с помощью соответствующего конструктора.

```js
new ToT.Table({
  el: document.getElementById("table")
})
```
Опции конструктора:

| Опция | Описание |
|----------|-------------|
| `el` | Указывает DOM элемент для привязки |
| `thingsAutoDetect` | Автоматически создает экземпляры `Thing` из потомков `el` |

Методы экземпляра:

| Метод | Описание |
|----------|-------------|
| `mount(el)` | Привязывает экземпляр к `el` |
| `destroy()` | Отвязывает экземпляр от `el` (ниже подробно) |
| `on(type,callback)` | Добавляет слушателя для события `type`, когда происходит событие `type`, вызывается колбэк `callback` |
| `addThing(thing)` | Добавляет `Thing` экземпляр к `Table` экземпляру |

Допускается создавать `Table` вот так:
```js
let table = new ToT.Table()
```

Однако, чтобы работать с ним в дальнейшем необходимо вызвать `table.mount(el)` для привязки экземпляра `Table` к DOM. Также, можно вызвать `table.destroy()` для отвязки экземпляра `Table`. Под отвязкой подразумевается удаление слушателей событий, сброс установленных ранее стилевых настроек и так далее. Обычно, такое нужно использовать, когда Вы заканчиваете работу с `Table`.

Что касается событий - их пока всего два типа. `dragstart` срабатывает, когда пользователь начинает двигать объект, `dragend` - когда заканчивает.

**Thing**

Экземпляр `Thing` создается также с помощью соответствующего конструктора.

```js
let thing = new ToT.Thing({
  el: document.getElementById("thing")
})
```

Но, как Вы могли видеть, можно передать `thingsAutoDetect: true` при создании экземпляра `Table`. Тогда все экземпляры `Thing` будут созданы автоматически из потомков элемента, к которому привязан ранее созданный экземпляр `Table`.

Кстати, чтобы сообщить экземпляру `Table` о созданном экземпляре `Thing` нужно использовать:
```js
table.addThing(thing)
```

Опции конструктора:

| Опция | Описание |
|----------|-------------|
| `el` | Указывает DOM элемент для привязки |
| `initialX` | Начальное значение `x` |
| `initialY` | Начальное значение `y` |

Методы экземпляра (почти такие же как и у `Table`):

| Метод | Описание |
|----------|-------------|
| `mount(el)` | Привязывает экземпляр к `el` |
| `destroy()` | Отвязывает экземпляр от `el` |
| `on(type,callback)` | Добавляет слушателя для события `type`, когда происходит событие `type`, вызывается колбэк `callback` |

Работает все так же, как и с `Table`. Главное отличие - разный пэйлоад в событиях. В случае с `Thing` помимо `tableRef`, в событии будет также `thingRef`.

## Демо

```
git clone https://github.com/yungvldai/tableofthings ToT-repo && cd ToT-repo
npm install && npm run start-demo
```