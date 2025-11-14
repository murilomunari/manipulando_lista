import { useState } from 'react'


function App() {
  const [editTask, setEditTask] = useState ({
    enabled: false,
    task: ''
  })
  const [input, setInput] = useState ("")
  const [tasks, setTasks] = useState ([
    'Estudar React',
    'Fazer compras',
    'Ler um livro'
  ])


  function handleResgister() {
    if(!input) {
      alert("Por favor, digite uma tarefa")
      return;
    }

    if(editTask.enabled) {
      handleSaveEdit();
      return;
    }
      

    setTasks(tarefas => [...tarefas, input])
    setInput("") // para limpar o input após adicionar a tarefa
  }

  function handleSaveEdit() {
    const findIndex = tasks.findIndex ( task => task === editTask.task)
    const allTasks = [...tasks];

    allTasks[findIndex] = input;
    setTasks(allTasks);

    setEditTask({
      enabled: false,
      task: ''
    })
    setInput("");
  }

  function handleDelete(item: string) {
    const removeTask = tasks.filter ( task => task !== item) // !== e para diferente
    setTasks(removeTask)
  }

  function handleEdit(item: string) {
    setInput(item)
    setEditTask({
      enabled: true,
      task: item
    })
  }

  return (
    <div>
      <h1>Listas de tarefas</h1>

      <input 
        placeholder="Digite o nome da tarefa" 
        value={input}
        onChange={ (e)  => setInput(e.target.value)}
        />
        <button onClick={handleResgister}>{editTask.enabled ? "Atualizar tarefa" : "Adicionar tarefa"}</button>
        
      <hr />

      {tasks.map( (item, index) => (
        <section key={item}>
          <span>{item}</span>
          <button onClick={ () => handleEdit(item)}>Editar</button>
          <button onClick={ ()  => handleDelete(item)}>Excluir</button>
        </section>
      ))}
    </div>
  )
}

export default App
