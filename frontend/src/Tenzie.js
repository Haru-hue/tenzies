import { useEffect, useState } from 'react';
import user from './var/atom'
import App from './App';
import { useAtom } from 'jotai';

function Tenzie () {
  const [ apiResponse, setAPIResponse ] = useState("")
  const [player] = useAtom(user);

  async function callAPI () {
    await fetch("http://localhost:5000/api")
    .then(res => res.text())
    .then(res => setAPIResponse(res))
  }      

  useEffect(() => {
    callAPI()
  }, [apiResponse])

  return (
    <>
      <p>{apiResponse}{player}</p>
          <App/>
    </> 
    )
}

export default Tenzie