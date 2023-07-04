import { useContext } from 'react'
import Card from './Card'
import { WebSocketContext } from '../context/webSocketContext'

function ListCards(){
  const { cardData } = useContext(WebSocketContext)

  return (
    <>
    {
      (cardData.length > 0) && (
        cardData.map((item, index) => (
          <Card key={index} data={item} />
        ))
      )
    }
    </>
  )
}

export default ListCards