import Header from "../header";
import styles from "../../css/home.module.css";


const Me = () => {
   return (
      <div>
         <Header />
         <div className={styles.main}>
            <div className={styles.option_container}>
               <a href="/modifyMe" className={styles.rectangle} id="opjob">정보 변경</a>
               <a href="/equipmentMe" className={styles.rectangle} id="opequipment">장비임대 목록</a>
            </div>
         </div>
      </div>
   )
}

export default Me;