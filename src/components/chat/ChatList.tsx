import { useEffect, useState } from 'react';
import { fetcherWithToken } from '../../utils/axios';
import useToken from '../../hooks/useToken';
import { Chat } from '../../interface/Chat';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../css/chatList.module.css';
import profile from '../../assets/profile.png';
import Header from '../header';

const ChatList = () => {
   const [chatRooms, setChatRooms] = useState<Chat[]>([]);

   const { token } = useToken();

   const navigate = useNavigate();

   useEffect(() => {
      if (!token) {
         navigate("/signin")
         alert("먼저 로그인을 해주세요")
      }
   }, [token, navigate])

   useEffect(() => {
      const fetchChatRooms = async () => {
         try {
            const response = await fetcherWithToken(token, '/chat/myRooms');
            setChatRooms(response.data);
         } catch (error) {
            console.error('채팅방 목록을 가져오는데 실패했습니다.', error);
         }
      };

      if (token) {
         fetchChatRooms();
      }
   }, [token]);

   return (
      <div>
         <Header />
         <div className={styles.main}>
            <div className={styles.chat_title}>나의 채팅방 목록</div>
            {chatRooms.length > 0 ? (
               <div className={styles.chat_container}>
                  {chatRooms.map((room) => (
                     <Link to={`/chat/${room.roomId}`} state={{ userName: room.userName }}>
                        <div className={styles.chat_box}>
                           <img src={profile} alt="profile" />
                           <h4>{room.userName}</h4>
                           <p>{room.jobTitle}</p>
                        </div>
                     </Link>
                  ))}
               </div>
            ) : (
               <h3>채팅방이 없습니다.</h3>
            )}
         </div>
      </div>
   );
};

export default ChatList;
