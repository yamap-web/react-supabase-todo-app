import React, { useState, useEffect } from 'react';
import { Container, Nav, Tab } from 'react-bootstrap';
import TodoItem from './TodoItem';
import InputTodo from './InputTodo';

// supabaseFunctionsの呼び出し
import {
  fetchTodoList,
  addTodoItem,
  deleteTodoItem,
  checkTodoItem,
} from '../../utils/supabaseFunctions';

// JSONサーバーの記述を削除
// const API_URL = 'http://localhost:3000/todo/';

interface Todo {
  id: number;
  title: string;
  status: boolean;
}

const TodoApp = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodo();
  }, []);

  // const fetchTodo = () => {
  //   fetch(API_URL)
  //     .then((responseData) => {
  //       return responseData.json();
  //     })
  //     .then((result) => {
  //       setTodoList(result);
  //     });
  // };

  // SupabaseによるfetchTodo関数を定義
  const fetchTodo = async () => {
    const todoList = (await fetchTodoList()) as Todo[];
    setTodoList(todoList);
  };

  // const addTodo = (inputTitle: string) => {
  //   const addData = {
  //     title: inputTitle,
  //     status: false,
  //   };
  //   fetch(API_URL, {
  //     body: JSON.stringify(addData),
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }).then(fetchTodo);
  // };

  // SupabaseによるaddTodo関数を定義
  const addTodo = async (inputTitle: string) => {
    if (!inputTitle) return;

    await addTodoItem(inputTitle);
    fetchTodo();
  };

  // const deleteTodo = (id: number) => {
  //   const targetUrl = API_URL + id;
  //   fetch(targetUrl, {
  //     method: 'DELETE',
  //   }).then(fetchTodo);
  // };

  // SupabaseによるdeleteTodo関数を定義
  const deleteTodo = async (id: number) => {
    await deleteTodoItem(id);
    fetchTodo();
  };

  // const checkTodo = (id: number, title: string, status: boolean) => {
  //   const targetUrl = API_URL + id;
  //   const editData = {
  //     id: id,
  //     title: title,
  //     status: !status,
  //   };
  //   fetch(targetUrl, {
  //     body: JSON.stringify(editData),
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }).then(fetchTodo);
  // };

  // SupabaseによるcheckTodo関数を定義
  const checkTodo = async (id: number, status: boolean) => {
    await checkTodoItem(id, status);
    fetchTodo();
  };

  return (
    <Container className='mt-3 mb-3 col-md-6'>
      <Tab.Container defaultActiveKey='first'>
        <Nav justify variant='tabs'>
          <Nav.Item>
            <Nav.Link eventKey='first' className='fs-4 fw-bold'>
              <i className='bi bi-card-list'></i>&nbsp;&nbsp;to Do
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey='second' className='fs-4 fw-bold'>
              <i className='bi bi-check2-square'></i>&nbsp;&nbsp;Done
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey='first'>
            <InputTodo addTodo={addTodo} />
            <div className='todo-list mt-3'>
              {todoList.map((todoItem: Todo) => {
                if (!todoItem.status) {
                  return (
                    <TodoItem
                      key={todoItem.id}
                      id={todoItem.id}
                      title={todoItem.title}
                      status={todoItem.status}
                      deleteTodo={deleteTodo}
                      checkTodo={checkTodo}
                    />
                  );
                } else {
                  return;
                }
              })}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey='second'>
            <div className='complete-list mt-3'>
              {todoList.map((todoItem: Todo) => {
                if (todoItem.status) {
                  return (
                    <TodoItem
                      key={todoItem.id}
                      id={todoItem.id}
                      title={todoItem.title}
                      status={todoItem.status}
                      deleteTodo={deleteTodo}
                      checkTodo={checkTodo}
                    />
                  );
                } else {
                  return;
                }
              })}
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default TodoApp;
