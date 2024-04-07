import { TextFormatOutputType } from '@site/src/utils/textFormat';
import { Board } from '@site/src/components/Atoms/Board';
import { PoolStatisticsTitle } from '@site/src/components/Molecules/PictureTitles';
import { Spacer } from '@site/src/components/Atoms/Spacer';
import styles from "./styles.module.css";
import clsx from 'clsx';
import { InfoBoxLoadingSkeleton } from '@site/src/components/Atoms/InfoBoxLoadingSkeleton';
import { LoadingPlaceholder } from '@site/src/components/Atoms/LoadingPlaceholder';

interface IStatsChart{
  radialBarChart: React.ReactNode
  infoItems: Array<{title: string, value: TextFormatOutputType}>
  isLoading?:boolean
}

const StatsChart = ({radialBarChart, infoItems, isLoading}:IStatsChart) => {

  return (
    <div className={styles.statsChart}>
      <PoolStatisticsTitle />
      <Spacer variant='lg' />
      <div className='grid grid-col-gap grid-col--12'>
        <div className='grid-span-col--9'>
          {isLoading? <div className={styles.loadingSkeleton}><LoadingPlaceholder/></div> : radialBarChart}
        </div>
          {isLoading ? <InfoBoxLoadingSkeleton className='grid-span-col--3' direction='row' itemNum={5} loadingPlaceholder={<LoadingPlaceholder/>} /> : 
            <div className={clsx(["grid-span-col--3 grid grid-row-gap grid-row--5"])}>
                {infoItems?.map((info, index) => (
                  <Board key={index} description={info?.title} value={info?.value.text}
                      suffix={info?.value.suffix} prefix={info?.value.prefix} /> 
                  ))
                }
            </div>
          }
      </div>
    </div>
  )
}

export default StatsChart
