import React, { useState, useEffect } from 'react'

import api from './services/api'

import "./styles.css";

const App = () => {
  const [state, setState] = useState([])

  const listRepository = async () => {

    try {
      const { data } = await api.get('repositories')
      setState(data)

    } catch(e) {
      console.log(e.response)
    }
  }

  useEffect(() => {
    listRepository()
  }, [])

  const handleAddRepository = async () => {

    try {
      const { data } = await api.post('repositories', {
        title: `BootCamp-GoStack-Challenge-One-React`,
        url: 'https://github.com/matheuSantos-me',
        techs: ['React', 'Node']
      })

      setState([ ...state, data ])
      alert('Repositório adicionado com sucessso!')

    } catch(e) {
      console.log(e.response)
    }
  }

  const handleRemoveRepository = async (id) => {

    try {
      await api.delete(`repositories/${id}`)
      const newState = state.filter(item => item.id !== id)
      setState(newState)

      alert('Repositório deletado com sucessso!')

    } catch(e) {
      console.log(e.response)
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          state.map(item =>
            <li key={item.id}>
              {item.title}

              <button onClick={() => handleRemoveRepository(item.id)}>
                Remover
              </button>
            </li>
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
