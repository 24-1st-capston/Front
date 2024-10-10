import { useEffect, useState } from "react"
import { customAxios } from "../../utils/axios"
import { useNavigate } from 'react-router-dom'
import useToken from "../../hooks/useToken"
import Header from "../header"
import styles from "../../css/signin.module.css"

const signin = () => {
   const [phoneNumber, setPhoneNumber] = useState("")
   const [password, setPassword] = useState("")

   const navigate = useNavigate()

   const { token, setToken } = useToken()

   useEffect(() => {
      if (!!token) {
         navigate("/")
         alert("이미 로그인이 되어있습니다")
      }
   }, [token, navigate])

   const signin = async (e: any) => {
      e.preventDefault()

      try {
         if (!phoneNumber || !password) {
            alert('모든 입력란을 작성해주세요')
            return
         }

         const response = await customAxios.post('/api/user/signin', {
            phoneNumber,
            password
         })

         setToken(response.data.token);
         navigate("/")
         alert("로그인이 완료되었습니다")

      } catch (error: any) {
         if (error.response && error.response.data) {
            alert(error.response.data)
         }
      }
   }

   return (
      <div>
         <Header />
         <div className={styles.main}>
            <div className={styles.box_container}>
               <h1>로그인</h1>
               <div className={styles.box}>
                  <form onSubmit={signin}>
                     <div className={styles.number}>
                        <input
                           type="text"
                           value={phoneNumber}
                           onChange={(e) => setPhoneNumber(e.target.value)}
                           placeholder="전화번호"
                        />
                     </div>
                     <div className={styles.password}>
                        <input
                           type="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           placeholder="비밀번호"
                        />
                     </div>
                     <div className={styles.login_button}>
                        <button type="submit">로그인</button>
                     </div>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default signin