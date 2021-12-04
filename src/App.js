import { useState } from 'react'
import { evaluate } from 'mathjs'
import './App.css';

function App() {
  const nums = ["clear", "back", "%", "/", 9, 8, 7, "*", 6, 5, 4, "-", 3, 2, 1, "+", ".", 0, "="]
  const [sums, setSums] = useState([0])
  const [error, setError] = useState({ isError: false, message: "" })

  const addNum = (num) => {
    try {
      setError({ isError: false, message: "" })
      
      if (num == "clear"){
        setSums([0])
      }
      else if (num == "back"){
        let alterSums = [...sums]
        if (alterSums.length > 1){
          alterSums.pop()
          setSums(alterSums)
        }
        else{
          setSums([0])
        }
      }
      else if (num == "="){
        let joinSum = sums.join("")
        let newSum = evaluate(joinSum)
        setSums(newSum)
      }
      else{
        let storedSums = [...sums, num]
        if(storedSums[0] === 0){
          storedSums.shift()
        }
        setSums(storedSums)
      }
    } catch (err) {
      setError({ isError: true, message: err })
      setSums([0])
    }  
  }


  return(
    <div className="all">
      {/* <h1>My Calculator App</h1> */}
      <div id="container" >
        <h2>{sums}</h2>
        <div className="buttons">
          {nums.map((num, index) => (
                <button key={index} onClick={() => addNum(num)}>{num}</button>
            ))}
        </div>
      </div>
    </div>
  )
}
  
  

export default App;
