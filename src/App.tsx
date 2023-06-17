import { useState } from 'react'
import './App.css'
import classNames from 'classnames';

interface ITodo {
  title:string,
  completed:boolean
}
const Todos = () => {
  const [items, setItems] =  useState<ITodo[]>([]);
  const [tempToDo, setTempDo] = useState("");
  function handleAddTask(){
    setItems([...items ?? [], {title:tempToDo, completed:false}]);
    setTempDo("");
  }
  function handleRemoveTask(itemIdx:number){
    setItems([ ...items ? [...items.slice(0,itemIdx),...items.slice(itemIdx+1)] : []])
  }
  function handleToggleTaskCompletion(task:ITodo, itemIdx:number){
    if(itemIdx === 0){
      setItems([{...task, completed:!task.completed}, ...items ? items.slice(1,items.length) : []]);
    }
    else if(items.length-1 !== itemIdx){
      setItems([...items ? items.slice(0,itemIdx): [], {...task, completed:!task.completed}, ...items ? items.slice(itemIdx+1,items.length): []])
    }
    else {
      setItems([ ...items ? items.slice(0,items.length-1) : [], {...task, completed:!task.completed}])
    }
  }
  return (
    <ul role="list" className="divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-900/5 rounded-xl">
      {items?.map((item,itemIdx)=>{
        return (
          <li  className="relative flex items-center justify-between gap-x-3 px-4 py-5 sm:px-6">
            <div className="round flex-initial">
              <input type="checkbox" onChange={()=>{}} checked={item.completed} />
              <div  onClick={()=>handleToggleTaskCompletion(item, itemIdx)} ></div>
            </div>
            <div className={classNames('-mt-0.5 ml-2 text-left font-bold flex-auto dark:text-white text-gray-800',{' line-through':item.completed})}>  
              {item.title}
            </div>
            <div onClick={()=>handleRemoveTask(itemIdx)} className='flex-initial cursor-pointer dark:text-white text-gray-800'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>

            </div>
          </li>
        )
      })}

          <li  className="relative flex items-center justify-between gap-x-3 px-4 py-5 sm:px-6">
          <div className="round">
            <input type="checkbox" disabled id="checkbox" />
            <label></label>
          </div>
            <input placeholder='Add your task...' value={tempToDo} onKeyDown={(e)=>{if(e.key === "Enter" && tempToDo.length > 0){handleAddTask()}}} onChange={(e)=>setTempDo(e?.target?.value)} type="text" className='-mt-0.5 ml-2 font-bold text-gray-900 dark:text-white placeholder:text-gray-300 bg-transparent w-full border-transparent focus:outline-none focus:outline-transparent focus:ring-0 focus:border-transparent' />
          </li>
    </ul>
  )
}

function App() {
  return (
  <div className="my-auto mx-auto"><Todos /></div>
  )
}

export default App
