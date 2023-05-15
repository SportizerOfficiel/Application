
import { useWebSocket } from "@/Context/WebSocketContext";
import useAuth from "@/Utils/Hooks/useAuth";
import React from "react"
import useForm from "@/Utils/Hooks/useForm";
import RemotePin from "@/DesignSystem/Organisms/RemotePin/RemotePin";
import NavbarSimple from "@/DesignSystem/Organisms/NavBar/NavBar";
import Match from "@/Components/Views/Match";

const Remote = (props) => {
  const { user, logout } = useAuth();
  const [inputKey, setInputKey] = React.useState("");
  const { RemoteConnected } = useWebSocket();
  const [Interface, setInterface] = React.useState("Match")
  
  const links = [
    { link: '/Match', label: 'Match',action:()=>{setInterface("Match")} },
    { link: '/Stats', label: 'Stats',action:()=>{setInterface("Stats")}  },
    { link: '/Help', label: 'Help',action:()=>{setInterface("Help")}   },
    { link: '/Disconnect', label: 'Déconnexion',action:()=>{setInterface("Disconnect")}  },
  ];
    return (
      <div>
        {!RemoteConnected && <RemotePin></RemotePin>}
        {RemoteConnected &&   <>
        <NavbarSimple links={links}></NavbarSimple>
        <div style={{ display: Interface === "Match" ? "block" : "none" }}>
          <Match></Match>
        </div>
      
        </>}
      </div>
    );


};

export default Remote;





// const Login = () => {
//     const [error, setError] = React.useState("");
//     const router = useRouter()
//     const loginUser = async (data) => {
//       setError("");
//       try {
//         const response = await axios.post("/api/User", data, { params: { login: true } });
//         const { token } = response.data;
//         localStorage.setItem('jwt', token);
//         axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//         resetForm();
//         router.replace('/Remote');
//       } catch (error) {
//         console.log(error)
       
//       }
//     };
  
  
//     return (
  
//     );
//   };

  
//   export default Login


 