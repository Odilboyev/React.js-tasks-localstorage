import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({show:false, msg: '', type:''});
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name) {
      //alert display
      
        showAlert(true, 'danger', 'Pleace, Enter value')
      
    }else if(name && isEditing){
      // edit
      setList(
        list.map((item) => {
          if(item.id === editID){
            return {...item, title: name}
          }
          return item
        })
      )
      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true, 'success', 'Item was edited')
    } else{
      const newItem =  {id: new Date().getTime().toString(), title: name};
      setList([...list, newItem])
      setName('');
      showAlert(true, "success", "Todo added")
    }
  }
  

  const showAlert = (show = false, type='', msg='') => {
    setAlert({show, type, msg})
  }

  const clearList = () => {
    showAlert(true, 'danger', 'Todo deleted')
    setList([])
  }

  const removeItem = (id) => {
    showAlert(true, 'danger', 'item deleted')
    setList(list.filter(item => item.id !== id))
  }

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)
  }
  return <section className="section-center">

    <form className="grocery-form" onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
      <h3>Grocery Bud</h3>
      <div className="form-control">
        <input 
        type="text" 
        className="grocery" 
        placeholder="ex. egg"  
        value={name}
        onChange={(e) => setName(e.target.value)}
        />

        <button type="submit" className="submit-btn">
          {isEditing ? "edit": 'Add'}
        </button>
      </div>
    </form>
    {list.length >0 &&(
      <div className="grocery-container">
      <List items = {list} removeItem={removeItem} editItem={editItem}/>
      <button onClick={clearList} className="clear-btn">Clear</button>
    </div>
    )}
    

  </section>
}

export default App
