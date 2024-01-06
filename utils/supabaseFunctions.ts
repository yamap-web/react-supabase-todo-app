import { supabase } from './supabase';

export const fetchTodoList = async () => {
  const todoItems = await supabase.from('todo_items').select('*');
  return todoItems.data;
};

export const addTodoItem = async (title: string) => {
  await supabase.from('todo_items').insert({ title: title });
};

export const deleteTodoItem = async (id: number) => {
  await supabase.from('todo_items').delete().eq('id', id);
};

export const checkTodoItem = async (id: number, status: boolean) => {
  await supabase.from('todo_items').update({ status: !status }).eq('id', id);
};