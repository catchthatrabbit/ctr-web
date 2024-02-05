import React from 'react';
import {Search} from '@site/src/components/Molecules/Search';
import { Dropdown } from '@site/src/components/Atoms/Dropdown';
import { Board } from '@site/src/components/Atoms/Board';
import styles from './styles.module.css';
import { Spacer } from '@site/src/components/Atoms/Spacer';
import {REGIONS} from "@site/src/constants/regions";
import { STANDARD_REGIONS_API_VALUES } from '@site/src/Api/types';
import { covertRegionValue2Label } from './utils';
import { IBan } from '@site/src/components/Molecules/IBan';

interface IHeader {
    defaultRegion?: STANDARD_REGIONS_API_VALUES
    onSearch?: (searchQuery:string) => void
    iban?:string
    boardItems?:Array<{
        desc: string
        value: string
        prefix: string
        suffix: string
    }>
    onChangeRegion?: (id:unknown) => void
    pageTitleComponent?: React.ReactNode
    layout?:{
        search:boolean,
        dropdown:boolean,
        boards:boolean
    }
}

const Header = ({onSearch, boardItems, onChangeRegion, defaultRegion, iban, pageTitleComponent,layout = {boards:true, dropdown:true, search:true}}:IHeader) => {
    
    return(
        <>
            <Spacer variant='xLarge' />
            {pageTitleComponent}
            <Spacer variant='xLarge' />
            {layout.search && (
                <div className='col col--12'>
                    <Search onSearch={onSearch} />
                </div>
            )}
            <Spacer variant='xLarge' />
            {layout.dropdown && (
                <div className='col col--12'>
                    <Dropdown defaultValue={covertRegionValue2Label(defaultRegion)} className={styles.boardDropdown}
                    items={
                            [
                                {label:REGIONS.EU.label, value:REGIONS.EU.value}, 
                                {label:REGIONS.EU_BACKUP.label, value:REGIONS.EU_BACKUP.value},
                                {label:REGIONS.AS.label, value:REGIONS.AS.value},
                                {label:REGIONS.AS_BACKUP.label, value:REGIONS.AS_BACKUP.value},
                                {label:REGIONS.US.label, value:REGIONS.US.value},
                                {label:REGIONS.US_BACKUP.label, value:REGIONS.US_BACKUP.value},
                            ]
                    } 
                    onChange={onChangeRegion} />
                </div>
            )}
            <Spacer variant='xLarge' />
            {iban && <IBan iBan={iban} />}
            <Spacer variant='large' />
            {layout.boards && (
                <div className={styles.boardRoot}>
                    {
                        boardItems?.map((boardItem, index) => 
                            <Board key={index} description={boardItem.desc} value={boardItem.value}
                            suffix={boardItem.suffix} prefix={boardItem.prefix} />
                        )
                    }
                </div>
            )}
            <Spacer variant='medium' />
        </>
    )
}

export default Header;