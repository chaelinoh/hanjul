import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
      const { target: { name, value } ,} = event;
      if (name === "email") {
          setEmail(value);
      } else if (name === "password") {
          setPassword(value);
      }
  };

  const onSubmit = async (event) => {
      event.preventDefault();  //이벤트가 생기면 페이지가 새로고침 되는데 그것을 방지해주는 코드
      try {
          let data
          const auth = getAuth();
          if (newAccount) {
              data = await createUserWithEmailAndPassword(
                  auth, email, password
              );
          } else {
              data = await signInWithEmailAndPassword(auth, email, password);
          }

      } catch (error) {
          setError(error.message);
      }
  };
  const toggleAccount = () => setNewAccount(prev => !prev);

  return (
    <>
        <form onSubmit={onSubmit} className="container">

            <input name="email" type="text" placeholder='Email' required value={email} onChange={onChange} className="authInput" />
            <input name="password" type="password" placeholder='Password' required value={password} onChange={onChange} className="authInput" />
            <input type="submit" value={newAccount ? "Create Account" : "Log In"} className="authInput authSubmit" />
            {error && <span className="authError">{error}</span>}
        </form>
        <span onClick={toggleAccount} className="authSwitch">
            {newAccount ? "Sign In" : "Create Account"}
        </span>

    </>
);
};

export default AuthForm;