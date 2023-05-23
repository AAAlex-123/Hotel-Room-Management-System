// import Head from "next/head";
// import { useRouter } from "next/router";
// import { useState } from "react";


// export const Login = () => {
//   const navigate = useRouter()

//   const imageStyle = {
//     textAlign: 'center' as const,
//     marginBottom: '20px',
//     width: '200px',
//     height: 'auto',

//   };

//   const [login, setUsername] = useState<string>("");
//   const [password, setPassword] = useState<string>("");

//   const handleSubmit = async () => {
//     try {
//       const response = await fetch(`http://host.docker.internal:8081/api/auth`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ login, password }),
//       })

//       console.log("HAHAHAHAHA");
//       navigate.push("/main");
//     } catch (err: any) {
//       console.log("HEHEHEHEHEHEH")
//       navigate.push("/main");
//     }

//   }


//   return (
//     <>
//       <Head>
//         <title> Login | User </title>
//         <link rel="icon" href="../../public/favicon.ico" />
//         <link href='https://fonts.googleapis.com/css?family=Aleo' rel='stylesheet' />
//         <style>{`
//         * {
//             font-family: 'Aleo';font-size: 1rem;
//         }
//       `}</style>
//       </Head>
//       <div className="Login">
//         <div className="Box">
//           <img src="./Assets/logo.png" alt="Logo" style={imageStyle}></img>

//           <Form className="form-field" onSubmit={handleSubmit} action="#">

//             <Form.Group controlId="username" >
//               <Form.Control className="form-field-wrapper" autoFocus type="string" value={login} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
//             </Form.Group>


//             <Form.Group controlId="password" >
//               <Form.Control className="form-field-wrapper" type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//             </Form.Group>

//             <Button className="blueButton" type="submit"  >

//               Login

//             </Button>

//           </Form>
//         </div>
//       </div>


//     </>




//   );
// }

// export default Login;