import { useState } from 'react'
import { useRef } from 'react'
import './app.css'

function App() {
  const inputref = useRef(null);
  const [data,setdata] =useState("")
  const [val, setval] = useState([])
   const [nedit,setnedit] =useState(false)
  function handleadd(){
    if(data.trim()==""){
       setdata("")
    alert("Please Enter Task")
    return
  }
  if(val.some(t=>t.text===data)){
    setdata("")
    alert(`${data} already exists please enter different task`)
    return
  }
  const inptext = data;
  const list ={
    iscomplete:false,
    text:inptext,
    isedit:false
  }
  setval([...val,list])
  setdata("")
  }
  function remove(index){
   remove = val.filter((_,i)=>{
    return i!==index}
   )
   setval(remove);
  }
  function toggle(index){
    const toggle = val.map((task,i)=>{
      return index === i ? {...task,iscomplete:!task.iscomplete}:task; 
    })
     setval(toggle);
  }
  function handledit(index){
    setnedit(true);
    const inp = val[index].text
    const ed = val.map((curr,i)=>{
      return index === i? {...curr,isedit:!curr.isedit}:curr
    })
    setval(ed)
    setdata(inp)
    inputref.current.focus()
  }
  function handleupdate(index){
    setnedit(false);
    if(data.trim()==""){
       setdata("")
    alert("Please Enter Task")
    return
  }
  if(val.some(t=>t.text===data)){
    setdata("")
    alert(`${data} already exists please enter different task`)
    return
  }
  const edit = val.map((curr,i)=>{
    return index==i ? {...curr,text:data,isedit:!curr.isedit}:curr
  })
  setval(edit)
  setdata('') 
  }
 return (
    <>
    <h2 className='todo-title'>TO DO LIST</h2>
     <div className='todo-container'>
      <div className='todo-input-section'>
         <input className ="todo-input" ref={inputref} type="text" value={data} 
          placeholder='Enter The Task' onKeyUp={(event)=>{if(event.key =='Enter'&&!nedit){handleadd()}}} onChange={(event)=>{setdata(event.target.value)}}/>
       <button className='todo-button' onClick={()=>{handleadd()}}>Add</button>
      </div>
       <ol className='todo-list'>{
       val.map((curr,index) =>{
        return <li key={index}>
          <div  className='todo-item'>
            <span className={curr.iscomplete?'complete':''}>
          {curr.text}</span>
          <div><button className={curr.iscomplete?'todo-actions-button1':'todo-actions-button2'} 
          onClick={()=>{toggle(index)}}>{curr.iscomplete ? 'Undo':'Complete'}</button> 
          <button className='todo-actions-button'onClick={curr.isedit?()=>{handleupdate(index)}:()=>{handledit(index)}}>{curr.isedit?'Update':'Edit'}</button>
          <button onClick={()=>{remove(index)}} className='todo-actions-button'>Remove</button>
          </div>
            </div>
            </li>
       })
       }
       </ol>
     </div>
    </>
  )
}

export default App
