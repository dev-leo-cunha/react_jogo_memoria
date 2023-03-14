import { useEffect, useState } from "react"
import * as C from "./App.styles"
import logoImage from './imgs/logomarca.png'
import { Button } from "./components/Button"
import { InfoItem } from "./components/InfoItem"
import { GridItem } from "./components/GridItem"
import RestartIcon from './svgs/restart.svg'
import { GridItemType } from "./types/GridItemType"
import {items} from './data/items'
import { formatTimeElapsed } from "./helpers/formatTimeElapsed"


const App = () => {

  const [playing, setplaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);
  
  useEffect(()=>resetAndCreateGrid(),[]);

  useEffect(()=>{
    const timer = setInterval(()=>{
      if(playing) setTimeElapsed(timeElapsed + 1);
    },1000);
    return () => clearInterval(timer);
  },[playing, timeElapsed]);

  // verificando os items abertos sao iguais
  useEffect(()=>{
    if(shownCount === 2) {
      let opened = gridItems.filter(i => i.shown === true);
      if(opened.length === 2) {
        //verificação 1 - se eles sao iguais, torna-los permanentes.
        if(opened[0].item === opened[1].item) {
          let tmpGrid = [...gridItems]
          for(let i in tmpGrid) {
            if(tmpGrid[i].shown) {
              tmpGrid[i].permanentShown = true;
              tmpGrid[i].shown = false;
            }
          }
          setGridItems(tmpGrid)
          setShownCount(0)
        } else {
        //verificação 2 - se não forem iguais, desvira-los novamente.
          setTimeout(()=>{
            let tmpGrid = [...gridItems]
          for(let i in tmpGrid) {
            tmpGrid[i].shown = false;
          }
          setGridItems(tmpGrid)
          setShownCount(0)
          },800)
        }
        setMoveCount(moveCount => moveCount + 1)
      }
    }
  },[shownCount,gridItems])

  // verificando se o jogo acabou
  useEffect(()=>{
    if(moveCount > 0 && gridItems.every(i => i.permanentShown === true)) {
      setplaying(false)
    }
  },[moveCount, gridItems])


  const resetAndCreateGrid = () => {
    // passo 1- resetar o jogo.
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);
    // passo 2 - criar o grid
    // passo 2.1 criar um grid vazio
    let tmpGrid: GridItemType[] = [];
    for(let i = 0; i < (items.length * 2); i++) tmpGrid.push({
      item:null,shown:false,permanentShown:false
    });
    // passo 2.2 - preencher o grid
    for(let w = 0; w < 2; w++){
      for(let y = 0; y < items.length; y++) {
        let pos = -1;
        while(pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tmpGrid[pos].item = y;
      }
    }
    // 2.3 - jogar no state
    setGridItems(tmpGrid);
    // passo 3 começar o jogo
    setplaying(true);

  }

  const handleItemClick = (index:number) => {
    if(playing && index !== null && shownCount < 2) {
      let tmpGrid = [...gridItems];
        if(tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false) {
          tmpGrid[index].shown=true;
          setShownCount(shownCount + 1)
        }
      setGridItems(tmpGrid)
    }
  }

  return (
    <C.Container>
      <C.Info>

        <C.LogoLink href="">
          <img src={logoImage} width="200" alt="" />
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)}></InfoItem>
          <InfoItem label="Movimentos" value={moveCount.toString()} ></InfoItem>
        </C.InfoArea>

        <Button label="Reiniciar" icon={RestartIcon} onClick={resetAndCreateGrid} ></Button>

      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItems.map((i, index)=>(
            <GridItem 
              key={index} 
              item={i}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  )
}

export default App
