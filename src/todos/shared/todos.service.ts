import { Injectable } from '@nestjs/common';
import { Todo } from './todo';

@Injectable()
export class TodosService {
  todos: Todo[] = [
    {
      id: 1,
      description: 'item 1',
      completed: true,
      dueDate: '2020-01-01',
      createdAt: '2020-02-02',
      updatedAt: '2020-03-03',
    },
    {
      id: 2,
      description: 'item 2',
      completed: false,
      dueDate: '2020-01-01',
      createdAt: '2020-02-02',
      updatedAt: '2020-03-03',
    },
    {
      id: 3,
      description: 'item 3',
      completed: false,
      dueDate: '2020-01-01',
      createdAt: '2021-02-02',
      updatedAt: '2020-03-03',
    },
    {
      id: 4,
      description: 'item 4',
      completed: true,
      dueDate: '2020-01-01',
      createdAt: '2020-02-02',
      updatedAt: '2020-03-03',
    },
  ];

  getAll() {
    return this.todos;
  }

  getById(id: number) {
    const todo = this.todos.find((value) => value.id == id);
    return todo;
  }

  createTodo(todo: Todo) {
    let lastId = 0;
    if (this.todos.length > 0) {
      lastId = this.todos[this.todos.length - 1].id;
    }
    todo.id = lastId + 1;
    this.todos.push(todo);
    return todo;
  }

  updateTodo(todo: Todo) {
    const todoInArray = this.getById(todo.id);
    if (todoInArray) {
      todoInArray.description = todo.description;
      todoInArray.completed = todo.completed;
    }
    return todoInArray;
  }

  deleteTodo(id: number) {
    const index = this.todos.findIndex((value) => value.id == id);
    if (index > -1) {
      this.todos.splice(index, 1);
      return { message: `Todo ${id} deleted` };
    }
    return { message: `Todo not found` };
  }
}
