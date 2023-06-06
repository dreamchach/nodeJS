import { useSelector } from "react-redux"
import dayjs from 'dayjs'

const History = () => {
  const userData = useSelector(state=>state.user?.userData)

  return (
    <div>
      <div>
        <h2>History</h2>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>payment id</th>
              <th>price</th>
              <th>qua</th>
              <th>date of purchase</th>
            </tr>
          </thead>
          <tbody>
            {userData?.history.map(item=>(
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.qua}</td>
                <td>{dayjs(item.dateOfPurchase).format('YYYY-MM-DD HH:mm:ss')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default History