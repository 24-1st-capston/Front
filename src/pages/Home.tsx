import Header from '../components/header';
import styles from '../css/home.module.css';
import { Link } from 'react-router-dom';

const home = () => {
   return (
      <div>
         <Header />
         <div className={styles.main}>
            <div className={styles.option_container}>
               <Link to="/job" className={styles.rectangle} id="opjob">구인공고</Link>
               <Link to="/equipment" className={styles.rectangle} id="opequipment">장비임대</Link>
               <Link to="/chat" className={styles.rectangle} id="opchat">채팅</Link>
               <Link to="/me" className={styles.rectangle} id="opmy">내정보</Link>
            </div>
         </div>
      </div>
   );
}

export default home;
