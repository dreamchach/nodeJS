import {Link} from 'react-router-dom'

const Register = () => {
  return (
<section>
  <div>
    <h1>회원가입</h1>
    <form>
      <div>
        <label>
          Email
        </label>
        <input type="email" id="email"/>
      </div>
      <div>
        <label htmlFor="name">
          Name
        </label>
        <input type="text"  id="name"/>
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password"/>
      </div>
      <div>
        <button type='submit'>
          회원가입
        </button>
      </div>
      <p>
        아이디가 있다면?{' '}
        <Link to='/login'>로그인</Link>
      </p>
    </form>
  </div>
</section>
  )
}

export default Register