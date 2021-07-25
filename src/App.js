import { useState, useEffect } from "react";
import "./App.css";

function App() {
  let gridSize = 6;
  let totalBombs = 10;
  let totalBombCounter = 0;

  const dynamic2DArray = (gridSize) => {
    let arr = [];
    for (let i = 0; i < gridSize; i++) {
      arr.push([]);
      for (let j = 0; j < gridSize; j++) {
        arr[i].push({ bombStatus: false, clickStatus: "unknown" });
      }
    }
    return arr;
  };

  const [bombsArray, setBombsArray] = useState(dynamic2DArray(gridSize));
  const [isGameover, setIsGameover] = useState(false);

  const deployBombs = () => {
    while (totalBombCounter < totalBombs) {
      let randomNum1 = Math.trunc(Math.random() * gridSize);
      let randomNum2 = Math.trunc(Math.random() * gridSize);

      if (bombsArray[randomNum1][randomNum2].bombStatus === true) {
        console.log({ totalBombCounter });
        continue;
      } else {
        bombsArray[randomNum1][randomNum2].bombStatus = true;
        totalBombCounter++;
        console.log(totalBombCounter);
      }
    }
    console.log("Bombs Array Copy:", bombsArray);
  };

  useEffect(() => {
    deployBombs();
  }, []);

  const handleClick = (e, index, jndex) => {
    // console.log("indexes:", index, jndex);
    // console.log("type", e.type);
    // console.log("target", e.target);

    let bomb = detectNearestBomb(e, index, jndex);

    // detectNearestBomb(e, index, jndex);

    if (bombsArray[index][jndex].clickStatus === "clicked") {
      return;
    } else {
      if (e.button === 2) {
        let copyArr = [...bombsArray];
        copyArr[index][jndex].clickStatus = "flag";
        setBombsArray(copyArr);
        return;
      }

      if (bombsArray[index][jndex].bombStatus) {
        console.log(bombsArray[index][jndex].bombStatus);

        setIsGameover(true);
      } else {
        // console.log(e.button);
        let copyArr = [...bombsArray];
        if (e.button === 0) {
          copyArr[index][jndex].clickStatus = "clicked";
        }

        if (bomb > 0) {
          console.log("Nearest Bomb:", bomb);
          e.target.innerText = bomb;
        }

        setBombsArray(copyArr);
      }
    }
  };

  const detectNearestBomb = (e, index, jndex) => {
    let nearestBombCount = 0;
    // console.log(e);
    // console.log("---", bombsArray[index][jndex]);

    /*** UP ***/
    if (index - 1 >= 0 && bombsArray[index - 1][jndex].bombStatus === true) {
      // console.log(nearestBombCount++);
      nearestBombCount++;
    }

    /*** DOWN ***/

    if (
      index + 1 < gridSize &&
      bombsArray[index + 1][jndex].bombStatus === true
    ) {
      // console.log(nearestBombCount++);
      nearestBombCount++;
    }

    /*** LEFT ***/

    if (jndex - 1 >= 0 && bombsArray[index][jndex - 1].bombStatus === true) {
      // console.log(nearestBombCount++);
      nearestBombCount++;
    }

    /*** RIGHT ***/

    if (
      jndex + 1 < gridSize &&
      bombsArray[index][jndex + 1].bombStatus === true
    ) {
      // console.log(nearestBombCount++);
      nearestBombCount++;
    }

    /*** UP-LEFT ***/

    if (
      index - 1 >= 0 &&
      jndex - 1 >= 0 &&
      bombsArray[index - 1][jndex - 1].bombStatus === true
    ) {
      // console.log(nearestBombCount++);
      nearestBombCount++;
    }

    /*** UP-RIGHT ***/

    if (
      index - 1 >= 0 &&
      jndex + 1 < gridSize &&
      bombsArray[index - 1][jndex + 1].bombStatus === true
    ) {
      // console.log(nearestBombCount++);
      nearestBombCount++;
    }

    /*** DOWN-LEFT ***/

    if (
      index + 1 < gridSize &&
      jndex - 1 >= 0 &&
      bombsArray[index + 1][jndex - 1].bombStatus === true
    ) {
      // console.log(nearestBombCount++);
      nearestBombCount++;
    }

    /*** DOWN-RIGHT ***/

    if (
      index + 1 < gridSize &&
      jndex + 1 < gridSize &&
      bombsArray[index + 1][jndex + 1].bombStatus === true
    ) {
      // console.log(nearestBombCount++);
      nearestBombCount++;
    }

    return nearestBombCount;
  };

  const gridElements = (gameoverStatus) =>
    bombsArray.map((item, index) => (
      <div key={index} className="row">
        {item.map((jtem, jndex) => {
          return (
            <div
              key={jndex}
              className={
                gameoverStatus
                  ? jtem.bombStatus
                    ? "bomb"
                    : "safe"
                  : jtem.clickStatus
              }
              onContextMenu={(e) => {
                e.preventDefault();
              }}
              onMouseDown={(e) => {
                handleClick(e, index, jndex);
              }}
            >
              {/* {`status: ${jtem.bombStatus}`} */}
            </div>
          );
        })}
      </div>
    ));

  return (
    <div className="container">
      <div className="game-area">
        <div className="game-grid">
          {isGameover ? gridElements(true) : gridElements(false)}
        </div>
      </div>
    </div>
  );
}

export default App;
