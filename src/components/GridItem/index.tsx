import { GridItemType } from '../../types/GridItemType';
import * as C from './styles'
import logo from '../../imgs/logo.png'
import { items } from '../../data/items';

type Props = {
    item: GridItemType,
    onClick: () => void
}

export const GridItem = ({item, onClick}:Props) => {
    return (
        <C.Container 
            showBackground={item.permanentShown  || item.shown}
            onClick={onClick} >
            {item.permanentShown === false && item.shown === false &&
                <C.Icon showBackground={item.permanentShown  || item.shown} src={logo} alt="" opacity={0.5} />
            }
            {(item.permanentShown  || item.shown) && item.item !== null &&
                <C.Icon showBackground={item.permanentShown  || item.shown} src={items[item.item].icon} alt='' />
            }
        </C.Container>
    );
}