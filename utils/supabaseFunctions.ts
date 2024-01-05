import { supabase } from './supabase';

export const fetchTodoList = async () => {
  const todoItems = await supabase.from('todo_items').select('*');
  return todoItems.data;
};

export const addTodo = async (title: string) => {
  await supabase.from('todo_items').insert({ title: title });
};

export const deleteTodo = async (id: number) => {
  await supabase.from('todo_items').delete().eq('id', id);
};
