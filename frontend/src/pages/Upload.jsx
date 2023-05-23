import { continents } from "../utils/functions"

const Upload = () => {
  return (
    <div>
      <div>
        <h1>예상 상품 업로드</h1>
      </div>

      <form>
        <div>
          <label htmlFor="title">이름</label>
          <input name="title" id="title"/>
        </div>

        <div>
          <label htmlFor="description">설명</label>
          <input name="description" id="description"/>
        </div>

        <div>
          <label htmlFor="price">가격</label>
          <input name="price" id="price"/>
        </div>

        <div>
          <label htmlFor="continents">지역</label>
          <select name="continents" id="continents">
            {continents.map((item)=>(
              <option key={item.key} value={item.key}>{item.value}</option>
            ))}
          </select>
        </div>

        <div>
          <button type="submit">
            생성하기
          </button>
        </div>
        
      </form>
    </div>
  )
}

export default Upload