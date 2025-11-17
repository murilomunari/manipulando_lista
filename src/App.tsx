import { useState, useEffect, useRef, useMemo, useCallback } from 'react'


function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const firstRender = useRef(true);
  const [editTask, setEditTask] = useState ({
    enabled: false,
    task: ''
  })
  const [input, setInput] = useState ("")
  const [tasks, setTasks] = useState<string[]>([])

  useEffect ( () => { // useEffect para monitorar mudanças no estado
    const tarefaSalvas = localStorage.getItem("tarefas")
    
    if(tarefaSalvas) {
      setTasks(JSON.parse(tarefaSalvas)) // JSON.parse para converter de volta para array
    }
  }, [])

  useEffect ( () => {

    if(firstRender.current) {
      firstRender.current = false;
      return;
    }

    localStorage.setItem("tarefas", JSON.stringify(tasks)) // JSON.stringify para converter array em string
  }, [tasks])


  const handleResgister = useCallback ( () => { // useCallback para memorizar a função
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
  }, [input, tasks])

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
  
    inputRef.current?.focus();

    setInput(item)
    setEditTask({
      enabled: true,
      task: item
    })
  }

  const totalTarefas = useMemo ( () => { // useMemo para memorizar o valor calculado
    return tasks.length
  }, [tasks])

  return (
    <div>
      <h1>Listas de tarefas</h1>

      <input 
        placeholder="Digite o nome da tarefa" 
        value={input}
        onChange={ (e)  => setInput(e.target.value)}
        ref={inputRef}
        />
        <button onClick={handleResgister}>{editTask.enabled ? "Atualizar tarefa" : "Adicionar tarefa"}</button>
        
      <hr />

      <strong>Você tem {totalTarefas} tarefas</strong>

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
